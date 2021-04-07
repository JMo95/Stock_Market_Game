from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from users.models import TrackedStock
from users.models import Investor
from users.models import FakeStock
from users.models import LimitOrders
from users.models import FakeOptionChain
from users.models import Option
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from django.conf import settings
import pandas as pd
import datetime as dt
import time as t
import random
import threading
import time
import jwt
import schedule

def register(request):
    if request.method == 'POST':
        newUser = User.objects.create_user(request.POST.get("user"),request.POST.get("email"), request.POST.get("password"))
        Investor.objects.create(user=newUser,money=100000)
    return HttpResponse("created user")

def changeName(request):
    if request.method == 'POST':
        User.objects.filter(username=request.POST.get("user")).update(username = request.POST.get("new"))
    return HttpResponse("Upadted users")

def delete(request):
    if request.method == 'POST':
        User.objects.filter(username = request.POST.get("user")).delete()
    return HttpResponse("deleted users")

def login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    
    UserQuery = User.objects.filter(username=username)
    if UserQuery.count() == 1:
        passhash = UserQuery.values("password")[0]["password"]
        if check_password(password,passhash):
            exptime = dt.datetime.now() + dt.timedelta(minutes=30)
            data = {'username' : username, 'password': passhash , 'exptime': exptime.strftime("%a, %d %b %Y %H:%M:%S +0000")}
            token = {'token': jwt.encode(data,settings.SECRET_KEY)}
            return JsonResponse(token, safe=False)
        else:
            return HttpResponse("incorrect password")
    else:
        return HttpResponse("User Does not exist")
    
    
def authenticate(request):
    token  = request.headers.get('Authorization')
    
    
    try:
        data = jwt.decode(token, settings.SECRET_KEY,['HS256'])
    except:
        return HttpResponse("could not decode token")
   
    keys = list(data.keys())
    if len(data) == 3 and keys[0] == 'username' and keys[1] == 'password' and keys[2] == 'exptime':
        AuthUser = User.objects.filter(username=data["username"],password=data["password"])
    else:
         return HttpResponse("could not decode token")
    experation = dt.datetime.strptime(data["exptime"], ("%a, %d %b %Y %H:%M:%S +0000"))
    if experation < dt.datetime.now():
        return HttpResponse("Expired token")
    if AuthUser.count() != 1:
        return HttpResponse("invaild token")
    return JsonResponse(data, safe=False)


def authenticateUser(token):  
    if(token != None):
        token = token[7:]
    else:
        return None
    try:
        data = jwt.decode(token, settings.SECRET_KEY,['HS256'])
    except:
        return None
    keys = list(data.keys())
    if len(data) == 3 and keys[0] == 'username' and keys[1] == 'password' and keys[2] == 'exptime':
        AuthUser = User.objects.filter(username=data["username"],password=data["password"])
    else:
         return None
    experation = dt.datetime.strptime(data["exptime"], ("%a, %d %b %Y %H:%M:%S +0000"))
    if experation < dt.datetime.now():
        return None
    if AuthUser.count() != 1:
        return None
    return data["username"]

def buyStock(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        Quantity = int(request.POST.get("quantity"))
        Symbol = request.POST.get("stock")
        
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
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        Quantity = int(request.POST.get("quantity"))
        Symbol = request.POST.get("stock")
        Price = int(request.POST.get("price"))
        Stop = int(request.POST.get("stop"))
        Type = request.POST.get("type")
        currentUser = User.objects.filter(username=Cuser)[0]
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        if (Type == 'BTP' or Type == 'BTD') and money[0]["money"] > Quantity*getStockPrice(Symbol):
            LimitOrders.objects.create(Symbol=Symbol,Price=Price,Account=currentUser,Type=Type,Stop=1000000,Quantity=Quantity,OrginalPrice=getStockPrice(Symbol))
            inv.update(money = money[0]["money"]-(Quantity*getStockPrice(Symbol)))
            return HttpResponse("Placed Limit order")
        elif money[0]["money"] > (Quantity*Price) and  (Type != 'BTP' and Type != 'BTD'):
            LimitOrders.objects.create(Symbol=Symbol,Price=Price,Account=currentUser,Type=Type,Stop=Stop,Quantity=Quantity,OrginalPrice=getStockPrice(Symbol))
            inv.update(money = money[0]["money"]-(Quantity*Price))
            return HttpResponse("Placed Limit order")
        else:
            return HttpResponse("not enough money")
    return HttpResponse("404")
                       
                       

def getOrders(request):
    if request.method == 'GET':
        Cuser = authenticateUser(request.headers.get('Authorization'))
        if Cuser == None:
            return HttpResponse("not authenticated")
        stocks = list(LimitOrders.objects.filter(Account=User.objects.filter(username=Cuser)[0]).values('id','Symbol','Quantity','Stop','Price','Type'))
        return JsonResponse(stocks, safe=False)

def getStocks(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'GET':
        stocks = list(TrackedStock.objects.filter(Account=User.objects.filter(username=Cuser)[0]).values('Symbol','Quantity'))
        return JsonResponse(stocks, safe=False)
    
def sellStock(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        Quantity = int(request.POST.get("quantity"))
        Symbol = request.POST.get("stock")
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
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        Quantity = int(request.POST.get("quantity"))
        Symbol = request.POST.get("stock")
        Price = int(request.POST.get("price"))
        Stop = int(request.POST.get("stop"))
        Type = request.POST.get("type")
        currentUser = User.objects.filter(username=Cuser)[0]
        TStock = TrackedStock.objects.filter(Account=currentUser,Symbol=request.POST.get("stock"))
        if TStock.count() > 0 and TStock.values()[0]["Quantity"] >= Quantity:
            if TStock.values()[0]["Quantity"] == Quantity:
                TStock.delete()
            else:
                TStock.update(Quantity=TStock.values()[0]["Quantity"]-Quantity)
            LimitOrders.objects.create(Symbol=Symbol,Price=Price,Account=currentUser,Type=Type,Stop=Stop,Quantity=Quantity,OrginalPrice=getStockPrice(Symbol))
            return HttpResponse("Placed Limit order sell")
        else:
            return HttpResponse("not enough stock")
    return HttpResponse("404")
        
    
def cancelStockLimit(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
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
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'GET':
        Userinfo = list(Investor.objects.filter(user= User.objects.filter(username=Cuser)[0]).values('user__username','user__email',"money","user__password") )
        #Userinfo = list(User.objects.filter(username=request.GET.get("username")).values('username' , 'email'))
        return JsonResponse(Userinfo, safe=False)
    
    
def getStockPrice(symbol):
    return FakeStock.objects.filter(Symbol=symbol).values("Price")[0]["Price"]

def BuyOption(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        currentUser = User.objects.filter(username=Cuser)[0]
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        Price = getOptionPrice(request.POST.get("symbol"),request.POST.get("strike"),request.POST.get("experationDate"))
        Strike = int(request.POST.get("strike"))
        if request.POST.get("type") == 'call':
            if money[0]["money"] > (Price + Strike)*100*int(request.POST.get("quantity")):
                Option.objects.create(Symbol=request.POST.get("symbol"),LastPrice=Price,StrikePrice=Strike,ExperationDate=request.POST.get("experationDate"),Account=currentUser,Quantity=request.POST.get("quantity"),holder=True,Type='call')
                inv.update(money = money[0]["money"]-(Price + Strike)*100*int(request.POST.get("quantity")))
                return HttpResponse("buy call")
            else:
                return HttpResponse("no enought money")
        if request.POST.get("type") == 'put':
            if money[0]["money"] > Price*100:
                 Option.objects.create(Symbol=request.POST.get("symbol"),LastPrice=Price,StrikePrice=Strike,ExperationDate=request.POST.get("experationDate"),Account=currentUser,Quantity=request.POST.get("quantity"),holder=True,Type='put')
                 inv.update(money = money[0]["money"]-Price*100)
                 return HttpResponse("buy put")
            else:
                return HttpResponse("no enought money")
            
def SellOption(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        currentUser = User.objects.filter(username=Cuser)[0]
        inv = Investor.objects.filter(user=currentUser)
        money = list((inv.values('money')))
        Price = getOptionPrice(request.POST.get("symbol"),request.POST.get("strike"),request.POST.get("experationDate"))
        Strike = int(request.POST.get("strike"))
        if request.POST.get("type") == 'call':
            if TrackedStock.objects.filter(Symbol=request.POST.get("symbol"),Account=currentUser).count() > 0 and TrackedStock.objects.filter(Symbol=request.POST.get("symbol"),Account=currentUser).values("Quantity")[0]["Quantity"]  >= int(request.POST.get("quantity"))*100:
                Option.objects.create(Symbol=request.POST.get("symbol"),LastPrice=Price,StrikePrice=Strike,ExperationDate=request.POST.get("experationDate"),Account=currentUser,Quantity=request.POST.get("quantity"),holder=False,Type='call')
                return HttpResponse("sell call")
            else:
                return HttpResponse("no enough stock")
        if request.POST.get("type") == 'put':
            if money[0]["money"] >  Strike*100*int(request.POST.get("quantity")):
                 Option.objects.create(Symbol=request.POST.get("symbol"),LastPrice=Price,StrikePrice=Strike,ExperationDate=request.POST.get("experationDate"),Account=currentUser,Quantity=request.POST.get("quantity"),holder=False,Type='put')
                 return HttpResponse("sell put")
            else:
                return HttpResponse("no enought money")
            
def ExerciseBuyOption(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    if request.method == 'POST':
        CurrentOption = list(Option.objects.filter(id=request.POST.get("id")).values())
        
        if len(CurrentOption) == 1:
            inv = Investor.objects.filter(user=CurrentOption[0]["Account_id"])
            currentUser = User.objects.filter(id=CurrentOption[0]["Account_id"])[0]
            money = list((inv.values('money')))
            if CurrentOption[0]["holder"] == True and CurrentOption[0]["Type"] == 'call':
               AddStock(CurrentOption[0]["Symbol"],0,100,CurrentOption[0]["Account_id"])
               Option.objects.filter(id=request.POST.get("id")).delete()
               
            if CurrentOption[0]["holder"] == True and CurrentOption[0]["Type"] == 'put':
               Quantity = TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).values("Quantity")[0]["Quantity"]
               if Quantity > 100:
                    TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).update(Quantity=Quantity-100)
                    Option.objects.filter(id=request.POST.get("id")).delete()
                    inv.update(money = money[0]["money"]+CurrentOption[0]["StrikePrice"]*100)
               elif Quantity == 100:
                    TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).delete()
                    Option.objects.filter(id=request.POST.get("id")).delete()
                    inv.update(money = money[0]["money"]+CurrentOption[0]["StrikePrice"]*100)
               else:
                    return HttpResponse("not enough stock to exerice option")
               
            return HttpResponse("ExeriseOption")
        
        
def ExerciseSellOption(request):
    if request.method == 'POST':
        CurrentOption = list(Option.objects.filter(id=request.POST.get("id")).values())
        
        if len(CurrentOption) == 1:
            inv = Investor.objects.filter(user=CurrentOption[0]["Account_id"])
            currentUser = User.objects.filter(id=CurrentOption[0]["Account_id"])[0]
            money = list((inv.values('money')))
            if CurrentOption[0]["holder"] == False and CurrentOption[0]["Type"] == 'call':
                if TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).count() > 0:
                    Quantity = TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).values("Quantity")[0]["Quantity"]
                else:
                    Quantity = 0
                if Quantity > 100:
                    TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).update(Quantity=Quantity-100)
                    Option.objects.filter(id=request.POST.get("id")).delete()
                    inv.update(money = money[0]["money"]+CurrentOption[0]["StrikePrice"]*100 + CurrentOption[0]["LastPrice"]*100)
                elif Quantity == 100:
                    TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).delete()
                    inv.update(money = money[0]["money"]+CurrentOption[0]["StrikePrice"]*100 + CurrentOption[0]["LastPrice"]*100)
                    Option.objects.filter(id=request.POST.get("id")).delete()
                    
                else:
                   AddStock(CurrentOption[0]["Symbol"],0,100,CurrentOption[0]["Account_id"])
                   Option.objects.filter(id=request.POST.get("id")).delete()
                   TrackedStock.objects.filter(Symbol=CurrentOption[0]["Symbol"],Account=currentUser).delete()
                   inv.update(money = money[0]["money"]+(CurrentOption[0]["StrikePrice"]-getStockPrice(CurrentOption[0]["Symbol"]))*100 + CurrentOption[0]["LastPrice"]*100)
                   Option.objects.filter(id=request.POST.get("id")).delete()
               
            if CurrentOption[0]["holder"] == False and CurrentOption[0]["Type"] == 'put':
               AddStock(CurrentOption[0]["Symbol"],0,100,CurrentOption[0]["Account_id"])
               inv.update(money = money[0]["money"]-CurrentOption[0]["StrikePrice"]*100 + CurrentOption[0]["LastPrice"]*100)
               Option.objects.filter(id=request.POST.get("id")).delete()
               
            return HttpResponse("ExeriseOption")
            

def getOptionPrice(symbol,strike,exp):
    return FakeOptionChain.objects.filter(Symbol=symbol,StrikePrice=strike,ExperationDate=exp).values("LastPrice")[0]["LastPrice"]

def getOptionByUser(request):
    Cuser = authenticateUser(request.headers.get('Authorization'))
    if Cuser == None:
        return HttpResponse("not authenticated")
    return JsonResponse(list(Option.objects.filter(Account=User.objects.filter(username=Cuser)[0]).values()),safe=False)


def updateOrders():
    print("Test Limit")
    limits = list(LimitOrders.objects.all().order_by('Symbol').values_list('Symbol','Price','Stop','Type','Quantity','Account','id','OrginalPrice'))
   
    LastSymbol = ''
    CurrentPrice = 0;
    for x in range(len(limits)):
        inv = Investor.objects.filter(user=limits[x][5])
        if LastSymbol != limits[x][0]:
            LastSymbol = limits[x][0]
            CurrentPrice = FakeStock.objects.filter(Symbol=LastSymbol).values_list('Price')[0][0]
        if limits[x][3] == 'BL':
            if CurrentPrice <= limits[x][1]:
                AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                inv.update(money = inv.values("money")[0]["money"]+(limits[x][1]-CurrentPrice)*limits[x][4])
                LimitOrders.objects.filter(id=limits[x][6]).delete()
                printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'BSL':
            if CurrentPrice >= limits[x][2]:
                    if CurrentPrice <= limits[x][1]:
                        AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                        inv.update(money = inv.values("money")[0]["money"]+(limits[x][1]-CurrentPrice)*limits[x][4])
                        LimitOrders.objects.filter(id=limits[x][6]).delete()
                        printInfo(limits[x],CurrentPrice)
                    else:
                        LimitOrders.objects.create(Symbol=limits[x][0],Price=limits[x][1],Account=User.objects.filter(id= limits[x][5])[0],Type='BL',Stop=0,Quantity=limits[x][4])
                        LimitOrders.objects.filter(id=limits[x][6]).delete()
                        printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'BSM':
            if CurrentPrice >= limits[x][1]:
                        AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                        inv.update(money = inv.values("money")[0]["money"]+(limits[x][1]-CurrentPrice)*limits[x][4])
                        LimitOrders.objects.filter(id=limits[x][6]).delete()
                        printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'BTP':
            if limits[x][2] > CurrentPrice:
                LimitOrders.objects.filter(id=limits[x][6]).update(Stop=CurrentPrice)
            elif limits[x][2] + (limits[x][2]*float(limits[x][1]/100)) <= CurrentPrice:
                AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                inv.update(money = inv.values("money")[0]["money"]+(limits[x][7]-CurrentPrice)*limits[x][4])
                LimitOrders.objects.filter(id=limits[x][6]).delete()
                printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'BTD':
            if limits[x][2] > CurrentPrice:
                LimitOrders.objects.filter(id=limits[x][6]).update(Stop=CurrentPrice)
            elif limits[x][2] + limits[x][1] <= CurrentPrice:
                AddStock(limits[x][0],limits[x][1],limits[x][4],limits[x][5])
                inv.update(money = inv.values("money")[0]["money"]+(limits[x][7]-CurrentPrice)*limits[x][4])
                LimitOrders.objects.filter(id=limits[x][6]).delete()
                printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'SL':
            if CurrentPrice >= limits[x][1]:
                removeStock(limits[x][1],limits[x][4],limits[x][5])
                LimitOrders.objects.filter(id=limits[x][6]).delete()
                printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'SSL':
            if CurrentPrice <= limits[x][2]:
                    if CurrentPrice >= limits[x][1]:
                        removeStock(CurrentPrice,limits[x][4],limits[x][5])
                        LimitOrders.objects.filter(id=limits[x][6]).delete()
                        printInfo(limits[x],CurrentPrice)
                    else:
                        LimitOrders.objects.create(Symbol=limits[x][0],Price=limits[x][1],Account=User.objects.filter(id= limits[x][5])[0],Type='SL',Stop=0,Quantity=limits[x][4])
                        LimitOrders.objects.filter(id=limits[x][6]).delete()
                        printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'SSM':
            if CurrentPrice <= limits[x][2]:   
                removeStock(CurrentPrice,limits[x][4],limits[x][5])
                LimitOrders.objects.filter(id=limits[x][6]).delete()  
                printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'STP':
            if limits[x][2] < CurrentPrice:
                print(limits[x][2])
                LimitOrders.objects.filter(id=limits[x][6]).update(Stop=CurrentPrice)
            elif limits[x][2] - (limits[x][2]*float(limits[x][1]/100)) >= CurrentPrice:
                removeStock(CurrentPrice,limits[x][4],limits[x][5])
                LimitOrders.objects.filter(id=limits[x][6]).delete() 
                printInfo(limits[x],CurrentPrice)
        elif limits[x][3] == 'STD':
            if limits[x][2] < CurrentPrice:
                LimitOrders.objects.filter(id=limits[x][6]).update(Stop=CurrentPrice)
            elif limits[x][2] - limits[x][1] >= CurrentPrice:
                removeStock(CurrentPrice,limits[x][4],limits[x][5])
                LimitOrders.objects.filter(id=limits[x][6]).delete() 
                printInfo(limits[x],CurrentPrice)

def testlmit(request):
   # stonks = list(FakeStock.objects.all().values_list("Symbol"))
    
    #for x in range(len(stonks)):
       #  AddStock(stonks[x][0],0,1000,User.objects.filter(username='jake').values("id")[0]['id'])
    #LimitOrders.objects.all().delete()
    #LimitOrders.objects.create(Symbol="APL",Price=getStockPrice("APL")-getStockPrice("APL")*.05,Account=User.objects.filter(username='jake')[0],Type='BL',Stop=0,Quantity=15)
    #LimitOrders.objects.create(Symbol="T",Price=getStockPrice("T")+getStockPrice("T")*.05,Account=User.objects.filter(username='jake')[0],Type='BSL',Stop=getStockPrice("T")+getStockPrice("T")*.1,Quantity=15)
    #LimitOrders.objects.create(Symbol="COX",Price=getStockPrice("COX")+getStockPrice("COX")*.05,Account=User.objects.filter(username='jake')#[0],Type='BSM',Stop=105,Quantity=15)
    #LimitOrders.objects.create(Symbol="CHP",Price=7,Account=User.objects.filter(username='jake')[0],Type='BTP',Stop=100000,Quantity=15)
    #LimitOrders.objects.create(Symbol="GME",Price=10,Account=User.objects.filter(username='jake')[0],Type='BTD',Stop=100000,Quantity=15)
    #LimitOrders.objects.create(Symbol="AMC",Price=getStockPrice("AMC")+getStockPrice("AMC")*.05,Account=User.objects.filter(username='jake')[0],Type='SL',Stop=0,Quantity=15)
    #LimitOrders.objects.create(Symbol="AMZ",Price=getStockPrice("AMZ")-getStockPrice("AMZ")*.05,Account=User.objects.filter(username='jake')[0],Type='SSL',Stop=getStockPrice("AMZ")-getStockPrice("AMZ")*.1,Quantity=15)
    #LimitOrders.objects.create(Symbol="GOOG",Price=getStockPrice("GOOG")-getStockPrice("GOOG")*.05,Account=User.objects.filter(username='jake')[0],Type='SSM',Stop=450,Quantity=15)
    #LimitOrders.objects.create(Symbol="APL",Price=5,Account=User.objects.filter(username='jake')[0],Type='STP',Stop=0,Quantity=15)
    #LimitOrders.objects.create(Symbol="T",Price=8,Account=User.objects.filter(username='jake')[0],Type='STD',Stop=0,Quantity=15)

    updateOrders()
    return HttpResponse("l")


def printInfo(Order, Price):
    print(Order)
    print(" Price: " + str(Price))

def AddStock(Symbol,Price,Quantity,CUser):
    inv = Investor.objects.filter(user=CUser)
    TStock = TrackedStock.objects.filter(Account=CUser,Symbol=Symbol)
    if TStock.count() > 0:
        TStock.update(Quantity=TStock.values()[0]["Quantity"]+Quantity)
    else:
        TrackedStock.objects.create(Symbol=Symbol,Account=User.objects.filter(id=CUser)[0],Quantity=Quantity)
        

def removeStock(Price,Quantity,CUser):
    inv = Investor.objects.filter(user=CUser)
    inv.update(money = inv.values("money")[0]["money"]+Quantity*Price)
    


def makeStock(request):
    if request.method == 'GET':
        stocks = list(FakeStock.objects.all().values('Symbol','Price'))
        return JsonResponse(stocks, safe=False)
    
def makeOptionChain(request):
    if request.method == 'GET':
        FakeOptionChain.objects.create(Symbol='APL',LastPrice=11.5,StrikePrice=110,ExperationDate='2012-09-04 05:00:00')
        return JsonResponse(list(FakeOptionChain.objects.all().values()), safe=False)
    
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
        FakeStock.objects.filter(Symbol=stocks[x][0]).update(Price=newPrice)
        
    print("Test Limit")
    limits = list(LimitOrders.objects.all().order_by('Symbol').values_list('Symbol','Price','Stop','Type','Quantity','Account','id','OrginalPrice'))
   
    updateOrders()
    
def startsheduler(request):
    if request.method == 'GET':
        schedule.every(5).seconds.do(background_job)

        # Start the background thread
        stop_run_continuously = run_continuously()
    return HttpResponse("started shecduler")


def getHistoricalStockPrice(request):
    end_time = dt.datetime.today()
    start_time = dt.datetime.today() - dt.timedelta(days=365)
   
    start_time_int = int(t.mktime(start_time.timetuple()))
    end_time_int = int(t.mktime(end_time.timetuple()))

    
    stock_url = "https://query1.finance.yahoo.com/v7/finance/download/"+request.POST.get("Symbol")+"?period1="+str(start_time_int)+"&period2="+str(end_time_int)+"&interval=1d&events=history"
    
    info = pd.read_csv(stock_url)
    return JsonResponse(info.to_json(), safe=False)