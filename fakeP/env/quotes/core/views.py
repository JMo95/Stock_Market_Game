
from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import Base
from rest_framework.response import Response 
from . serializer import ReactSerializer
# Create your views here. 
  
class ReactView(APIView): 
	serializer_class = ReactSerializer 
	def get(self, request): 
		detail = [ {"name": detail.name,"detail": detail.detail}  
		for detail in Base.objects.all()] 
		return Response(detail) 
	def post(self, request): 
		serializerX = ReactSerializer(data=request.data) 
		if serializerX.is_valid(raise_exception=True): 
			serializerX.save() 
			return  Response(serializerX.data) 



