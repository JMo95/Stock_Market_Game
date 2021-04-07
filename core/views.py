from django.http import HttpResponseRedirect
from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import React, User, Stock, Person
# , PersonS_A
from rest_framework.response import Response
from . serializer import ReactSerializer, ReactUser, ReactStock, ReactPerson_Auth, ReactPerson_S
from rest_framework import permissions, status
from rest_framework.permissions import IsAdminUser, DjangoModelPermissions
from rest_framework.decorators import api_view
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
		detail = [ {"name": detail.name,"Company": detail.Company, "price": detail.price, "description": detail.description, "date": detail.date, "ticker": detail.ticker,}
		for detail in Stock.objects.all()] 
		return Response(detail) 

	def post(self, request): 
		serializerU = ReactStock(data=request.data) 
		if serializerU.is_valid(raise_exception=True): 
			serializerU.save() 
			return Response(serializerU.data) 



################################################################################
################################################################################
################################################################################





@api_view(['GET'])
def current_person(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = ReactPerson_S(request.user)
    return Response(serializer.data)


class React_PersonList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = ReactPerson_Auth(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







