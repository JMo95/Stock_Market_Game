from django.contrib import admin 
from django.urls import path, include 
from django.conf.urls import url 
from . import views
  
urlpatterns = [ 
	path('admin/', admin.site.urls), 
	path('wel/', views.ReactView.as_view(), name= "something"), 
]

