from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from users.models import TrackedStock
from users.models import Investor
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
        inv = Investor.objects.filter(user= User.objects.filter(username=request.POST.get("user"))[0])
        currentUser = User.objects.filter(username=request.POST.get("user"))[0]
        money = list((inv.values('money')))
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=request.POST.get("stock"))
        if money[0]["money"] > (int(request.POST.get("Quantity"))*getStockPrice(request.POST.get("stock"))):
            if TStock.count() > 0:
                TStock.update(Quantity=TStock.values()[0]["Quantity"]+int(request.POST.get("Quantity")))
            else:
                TrackedStock.objects.create(Symbol=request.POST.get("stock"),Account=currentUser,Quantity=request.POST.get("Quantity"))
            inv.update(money = money[0]["money"]-(int(request.POST.get("Quantity"))*getStockPrice(request.POST.get("stock"))))
            return HttpResponse("added stock")
        else:
            return HttpResponse("not enough money")
    return HttpResponse("404")



def getStocks(request):
    if request.method == 'GET':
        stocks = list(TrackedStock.objects.filter(Account=User.objects.filter(username=request.GET.get("username"))[0]).values('Symbol','Quantity'))
        return JsonResponse(stocks, safe=False)
    
def sellStock(request):
    if request.method == 'POST':
        inv = Investor.objects.filter(user= User.objects.filter(username=request.POST.get("user"))[0])
        currentUser = User.objects.filter(username=request.POST.get("user"))[0]
        money = list((inv.values('money')))
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=request.POST.get("stock"))
        if TStock.count() > 0:
            if TStock.values()[0]["Quantity"] > int(request.POST.get("Quantity")):
                TStock.update(Quantity=TStock.values()[0]["Quantity"]-int(request.POST.get("Quantity")))
                inv.update(money = money[0]["money"]+(int(request.POST.get("Quantity"))*getStockPrice(request.POST.get("stock"))))
                return HttpResponse("sold stock")
            elif TStock.values()[0]["Quantity"] == int(request.POST.get("Quantity")):
                inv.update(money = money[0]["money"]+(int(request.POST.get("Quantity"))*getStockPrice(request.POST.get("stock"))))
                TStock.delete()
                return HttpResponse("sold stock")
            else:
                return HttpResponse("you don't own enough stock")
        
        return HttpResponse("you don't that stock")
        
    
    
def getUser(request):
    if request.method == 'GET':
        Userinfo = list(Investor.objects.filter(user= User.objects.filter(username=request.GET.get("username"))[0]).values('user__username','user__email',"money") )
        #Userinfo = list(User.objects.filter(username=request.GET.get("username")).values('username' , 'email'))
        return JsonResponse(Userinfo, safe=False)
    
    
def getStockPrice(symbol):
    return 100;
