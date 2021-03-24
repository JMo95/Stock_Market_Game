from rest_framework import serializers 
from . models import *

class ReactSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = React 
		fields = ['name', 'detail'] 

class PullStockSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = PullStock 
		fields = ['stock_name'] 