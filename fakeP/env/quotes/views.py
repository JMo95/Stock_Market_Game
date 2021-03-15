
from django.shortcuts import render 
from rest_framework.views import APIView 
from .models import React
from rest_framework.response import Response 
from . import serializer
# Create your views here. 
  
class ReactView(APIView): 
	serializer_class = serializer.ReactSerializer 
	def get(self, request): 
		detail = [ {"name": detail.name,"detail": detail.detail}  
		for detail in React.objects.all()] 
		return Response(detail) 
  
	def post(self, request): 
		serializerX = serializer.ReactSerializer(data=request.data) 
		if serializerX.is_valid(raise_exception=True): 
			serializerX.save() 
			return  Response(serializerX.data) 



