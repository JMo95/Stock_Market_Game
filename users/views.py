from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from users.models import TrackedStock
from users.models import Investor
from users.models import FakeStock
from users.models import LimitOrders
from django.core import serializers
from django.http import JsonResponse
import random
import threading
import time
import schedule

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
        stocks = list(LimitOrders.objects.filter(Account=User.objects.filter(username=request.GET.get("username"))[0]).values('id','Symbol','Quantity','Stop','Price','Type'))
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
        if TStock.count() > 0 and TStock.values()[0]["Quantity"] >= Quantity:
            if TStock.values()[0]["Quantity"] == Quantity:
                TStock.delete()
            else:
                TStock.update(Quantity=TStock.values()[0]["Quantity"]-Quantity)
            LimitOrders.objects.create(Symbol=Symbol,Price=Price,Account=currentUser,Type=Type,Stop=Stop,Quantity=Quantity)
            return HttpResponse("Placed Limit order sell")
        else:
            return HttpResponse("not enough stock")
    return HttpResponse("404")
        
    
def cancelStockLimit(request):
    if request.method == 'POST':
        Cuser = request.POST.get("user")
        id = request.POST.get("id")
        currentUser = User.objects.filter(username=Cuser)[0]
        order = LimitOrders.objects.filter(Account=currentUser,id=id)
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=order.values()[0]["Symbol"])
        if order.count() > 0:
            if order.values()[0]["Type"][0] == 'B':
                inv.update(money = money[0]["money"]+(order.values()[0]["Quantity"]*order.values()[0]["Price"]))
                order.delete()
                return HttpResponse("cancel buy order")
            elif order.values()[0]["Type"][0] == 'S':
                if TStock.count() > 0:
                    TStock.update(Quantity=TStock.values()[0]["Quantity"]+order.values()[0]["Quantity"])
                else:
                    TrackedStock.objects.create(Symbol=order.values()[0]["Symbol"],Account=currentUser,Quantity=order.values()[0]["Quantity"])
                order.delete()
                return HttpResponse("cancel sell order")
        else:
            return HttpResponse("not a vaild order")
    return HttpResponse("404")
    
    
def getUser(request):
    if request.method == 'GET':
        Userinfo = list(Investor.objects.filter(user= User.objects.filter(username=request.GET.get("username"))[0]).values('user__username','user__email',"money") )
        #Userinfo = list(User.objects.filter(username=request.GET.get("username")).values('username' , 'email'))
        return JsonResponse(Userinfo, safe=False)
    
    
def getStockPrice(symbol):
    return 100;

def testlmit(request):
    limits = LimitOrders.objects.all().order_by('Symbol').values_list('Symbol','Price','Stop','Type','Quantity','Account','id')
   
    LastSymbol = ''
    CurrentPrice = 0;
    for x in range(limits.count()):
        inv = Investor.objects.filter(user=limits[x][5])
        if LastSymbol != limits[x][0]:
            LastSymbol = limits[x][0]
            CurrentPrice = FakeStock.objects.filter(Symbol=LastSymbol).values_list('Price')[0][0]
        if limits[x][3] == 'BL':
            if CurrentPrice <= limits[x][1]:
                AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                inv.update(money = inv.values("money")[0]["money"]+(limits[x][1]-CurrentPrice))
                LimitOrders.objects.filter(id=limits[x][6]).delete()
                print("BL")
        elif limits[x][3] == 'BSL':
            if CurrentPrice >= limits[x][2]:
                    if CurrentPrice <= limits[x][2]:
                        AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                        inv.update(money = inv.values("money")[0]["money"]+(limits[x][1]-CurrentPrice))
                    else:
                        LimitOrders.objects.create(Symbol=limits[x][0],Price=limits[x][1],Account=User.objects.filter(id= limits[x][5])[0],Type='BL',Stop=0,Quantity=limits[x][4])
                    LimitOrders.objects.filter(id=limits[x][6]).delete()
                        
            print("BSL")
        elif limits[x][3] == 'BSM':
            print("BSM")
        elif limits[x][3] == 'BTP':
            print("BTP")
        elif limits[x][3] == 'BTD':
            print("BTD")
        elif limits[x][3] == 'SL':
            print("SL")
        elif limits[x][3] == 'SSL':
            print("BSSLL")
        elif limits[x][3] == 'SSM':
            print("SSM")
        elif limits[x][3] == 'STP':
            print("STP")
        elif limits[x][3] == 'STD':
            print("STD")
    return HttpResponse("l")

def AddStock(Symbol,Price,Quantity,CUser):
    inv = Investor.objects.filter(user=CUser)
    TStock = TrackedStock.objects.filter(Account=CUser,Symbol=Symbol)
    if TStock.count() > 0:
        TStock.update(Quantity=TStock.values()[0]["Quantity"]+Quantity)
    else:
        TrackedStock.objects.create(Symbol=Symbol,Account=User.objects.filter(id=CUser)[0],Quantity=Quantity)
            
    


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
    
    
def run_continuously(interval=1):
    cease_continuous_run = threading.Event()

    class ScheduleThread(threading.Thread):
        @classmethod
        def run(cls):
            while not cease_continuous_run.is_set():
                schedule.run_pending()
                time.sleep(interval)

    continuous_thread = ScheduleThread()
    continuous_thread.start()
    return cease_continuous_run


def background_job():
    
    stocks = list(FakeStock.objects.all().values_list('Symbol','Price'))
    
    for x in range(9):
        newPrice =round( stocks[x][1] + stocks[x][1] * (float((random.randint(1,10)*random.randint(-1,1)))/100),2)
        print(stocks[x][0] + "  " + str(stocks[x][1]) + " New Price: " + str(newPrice))
        FakeStock.objects.filter(Symbol=stocks[x][0]).update(Price=newPrice)
    
def startsheduler(request):
    if request.method == 'GET':
        schedule.every(5).seconds.do(background_job)

        # Start the background thread
        stop_run_continuously = run_continuously()
    return HttpResponse("started shecduler")