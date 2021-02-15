from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User

def register(request):
    if request.method == 'POST':
        User.objects.create_user(request.POST.get("user"), request.POST.get("password"), request.POST.get("email"))
    return HttpResponse("Here's the text of the Web page.")