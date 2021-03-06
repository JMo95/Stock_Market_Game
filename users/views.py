from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from users.models import TrackedStock
from users.models import Investor
from users.models import FakeStock
from users.models import LimitOrders
from django.core import serializers
from django.http import JsonResponse

def register(request):
    if request.method == 'POST':
        newUser = User.objects.create_user(request.POST.get("user"),request.POST.get("email"), request.POST.get("password"))
        Investor.objects.create(user=newUser,money=10000)
    return HttpResponse("created user")

def changeName(request):
    if request.method == 'POST':
        User.objects.filter(username=request.POST.get("user")).update(username = request.POST.get("new"))
    return HttpResponse("Upadted users")

def delete(request):
    if request.method == 'POST':
        User.objects.filter(username = request.POST.get("user")).delete()
    return HttpResponse("deleted users")


def buyStock(request):
    if request.method == 'POST':
        Quantity = int(request.POST.get("Quantity"))
        Symbol = request.POST.get("stock")
        Cuser = request.POST.get("user")
        currentUser = User.objects.filter(username=Cuser)[0]
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=Symbol)
        if money[0]["money"] > (Quantity*getStockPrice(Symbol)):
            if TStock.count() > 0:
                TStock.update(Quantity=TStock.values()[0]["Quantity"]+Quantity)
            else:
                TrackedStock.objects.create(Symbol=Symbol,Account=currentUser,Quantity=Quantity)
            inv.update(money = money[0]["money"]-(Quantity*getStockPrice(Symbol)))
            return HttpResponse("added stock")
        else:
            return HttpResponse("not enough money")
    return HttpResponse("404")


        
        
def buyStockLimit(request):
    if request.method == 'POST':
        Quantity = int(request.POST.get("Quantity"))
        Symbol = request.POST.get("stock")
        Cuser = request.POST.get("user")
        Price = int(request.POST.get("price"))
        Stop = int(request.POST.get("Stop"))
        Type = request.POST.get("Type")
        currentUser = User.objects.filter(username=Cuser)[0]
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        if money[0]["money"] > (Quantity*Price):
            LimitOrders.objects.create(Symbol=Symbol,Price=Price,Account=currentUser,Type=Type,Stop=Stop,Quantity=Quantity)
            inv.update(money = money[0]["money"]-(Quantity*Price))
            return HttpResponse("Placed Limit order")
        else:
            return HttpResponse("not enough money")
    return HttpResponse("404")
                       
                       

def getOrders(request):
    if request.method == 'GET':
        stocks = list(LimitOrders.objects.filter(Account=User.objects.filter(username=request.GET.get("username"))[0]).values('Symbol','Quantity','Stop','Price','Type'))
        return JsonResponse(stocks, safe=False)

def getStocks(request):
    if request.method == 'GET':
        stocks = list(TrackedStock.objects.filter(Account=User.objects.filter(username=request.GET.get("username"))[0]).values('Symbol','Quantity'))
        return JsonResponse(stocks, safe=False)
    
def sellStock(request):
    if request.method == 'POST':
        Quantity = int(request.POST.get("Quantity"))
        Symbol = request.POST.get("stock")
        Cuser = request.POST.get("user")
        currentUser = User.objects.filter(username=Cuser)[0]
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=Symbol)
        if TStock.count() > 0:
            if TStock.values()[0]["Quantity"] > Quantity:
                TStock.update(Quantity=TStock.values()[0]["Quantity"]-Quantity)
                inv.update(money = money[0]["money"]+(Quantity*getStockPrice(Symbol)))
                return HttpResponse("sold stock")
            elif TStock.values()[0]["Quantity"] == Quantity:
                inv.update(money = money[0]["money"]+(Quantity*getStockPrice(Symbol)))
                TStock.delete()
                return HttpResponse("sold stock")
            else:
                return HttpResponse("you don't own enough stock")
        
        return HttpResponse("you don't that stock")
    
    
def sellStockLimit(request):
    if request.method == 'POST':
        Quantity = int(request.POST.get("Quantity"))
        Symbol = request.POST.get("stock")
        Cuser = request.POST.get("user")
        Price = int(request.POST.get("price"))
        Stop = int(request.POST.get("Stop"))
        Type = request.POST.get("Type")
        currentUser = User.objects.filter(username=Cuser)[0]
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=request.POST.get("stock"))
        if TStock.count() > 0 and TStock.values()[0]["Quantity"] > Quantity:
            LimitOrders.objects.create(Symbol=Symbol,Price=Price,Account=currentUser,Type=Type,Stop=Stop,Quantity=Quantity)
            return HttpResponse("Placed Limit order sell")
        else:
            return HttpResponse("not enough stock")
    return HttpResponse("404")
        
    
    
def getUser(request):
    if request.method == 'GET':
        Userinfo = list(Investor.objects.filter(user= User.objects.filter(username=request.GET.get("username"))[0]).values('user__username','user__email',"money") )
        #Userinfo = list(User.objects.filter(username=request.GET.get("username")).values('username' , 'email'))
        return JsonResponse(Userinfo, safe=False)
    
    
def getStockPrice(symbol):
    return 100;


def makeStock(request):
    if request.method == 'GET':
        #FakeStock.objects.create(Symbol='APL',Price=123.57)
        #FakeStock.objects.create(Symbol='GOOG',Price=503.23)
        #FakeStock.objects.create(Symbol='AMZ',Price=1579.99)
        #FakeStock.objects.create(Symbol='GME',Price=152.12)
        #FakeStock.objects.create(Symbol='AMC',Price=14.24)
        #FakeStock.objects.create(Symbol='T',Price=50.31)
        #FakeStock.objects.create(Symbol='COX',Price=88.88)
        #FakeStock.objects.create(Symbol='NEW',Price=7.23)
        #FakeStock.objects.create(Symbol='CHP',Price=1.57)
        stocks = list(FakeStock.objects.all().values('Symbol','Price'))
        return JsonResponse(stocks, safe=False)