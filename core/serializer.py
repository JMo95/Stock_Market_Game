from rest_framework import serializers 
from . models import React, User, Stock, Person
# , PersonS_A
from rest_framework_jwt.settings import api_settings



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



################################################################################
################################################################################
################################################################################

class ReactPerson_S(serializers.ModelSerializer):
    
    class Meta:
        model = Person
        fields = ('username',)

class ReactPerson_Auth(serializers.ModelSerializer):
    
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = Person
        fields = ('token', 'username', 'password',)



