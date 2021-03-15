from rest_framework import serializers 
from . models import Base


class ReactSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Base 
        fields = ['name', 'detail', 'problems'] 

