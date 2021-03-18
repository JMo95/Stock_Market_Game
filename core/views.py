from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import React, User, Stock
from rest_framework.response import Response 
from . serializer import ReactSerializer, ReactUser, ReactStock
# Create your views here. 

class ReactView(APIView): 
	
	serializer_class = ReactSerializer 

	def get(self, request): 
		detail = [ {"name": detail.name,"detail": detail.detail} 
		for detail in React.objects.all()] 
		return Response(detail) 

	def post(self, request): 

		serializer = ReactSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 



class ReactView_U(APIView): 
	
	serializer_class = ReactUser

	def get(self, request): 
		detail = [ {"name": detail.name,"password": detail.password, "deposit": detail.deposit, "firstname": detail.firstname, "lastname": detail.lastname}
		for detail in User.objects.all()] 
		return Response(detail) 

	def post(self, request): 
		serializerU = ReactUser(data=request.data) 
		if serializerU.is_valid(raise_exception=True): 
			serializerU.save() 
			return Response(serializerU.data) 



class ReactView_S(APIView): 
	serializer_class = ReactStock

	def get(self, request): 
		detail = [ {"name": detail.name,"Company": detail.Company, "price": detail.price, "description": detail.description, "date": detail.date}
		for detail in Stock.objects.all()] 
		return Response(detail) 

	def post(self, request): 
		serializerU = ReactStock(data=request.data) 
		if serializerU.is_valid(raise_exception=True): 
			serializerU.save() 
			return Response(serializerU.data) 






