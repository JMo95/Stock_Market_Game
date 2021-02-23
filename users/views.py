from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from users.models import TrackedStock
from django.core import serializers
from django.http import JsonResponse

def register(request):
    if request.method == 'POST':
        User.objects.create_user(request.POST.get("user"),request.POST.get("email"), request.POST.get("password"))
    return HttpResponse("created user")

def changeName(request):
    if request.method == 'POST':
        User.objects.filter(username=request.POST.get("user")).update(username = request.POST.get("new"))
    return HttpResponse("Upadted users")

def delete(request):
    if request.method == 'POST':
        User.objects.filter(username = request.POST.get("user")).delete()
    return HttpResponse("deleted users")


def addstock(request):
    if request.method == 'POST':
        TrackedStock.objects.create(Symbol=request.POST.get("stock"),Account=User.objects.filter(username=request.POST.get("user"))[0])
    return HttpResponse("added stock")

def getStocks(request):
    if request.method == 'GET':
        stocks = list(TrackedStock.objects.filter(Account=User.objects.filter(username='usertest')[0]).values('Symbol'))
        return JsonResponse(stocks, safe=False)
    
    
def getUser(request):
    if request.method == 'GET':
        Userinfo = list(User.objects.filter(username='usertest').values('username' , 'email'))
        return JsonResponse(Userinfo, safe=False)
