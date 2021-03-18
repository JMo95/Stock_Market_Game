from rest_framework import serializers 
from . models import React, User, Stock


class ReactSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = React 
		fields = ['name', 'detail'] 

class ReactUser(serializers.ModelSerializer): 
	class Meta: 
		model = User 
		fields = ['name', 'password', 'deposit', 'firstname', 'lastname']


class ReactStock(serializers.ModelSerializer): 
	class Meta: 
		model = Stock 
		fields = ['name', 'Company', 'price', 'description', 'date', 'ticker']





