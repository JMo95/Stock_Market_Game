from django.db import models 

# Create your models here. 


class React(models.Model): 
	name = models.CharField(max_length=30) 
	detail = models.CharField(max_length=500)

class User(models.Model): 
	name = models.CharField(max_length=30) 
	password = models.CharField(max_length=20)
	deposit = models.IntegerField()
	firstname = models.CharField(max_length=30)
	lastname = models.CharField(max_length=30)

	def __str__(self):
    	 return super().__str__()




class Stock(models.Model): 
	name = models.CharField(max_length=30) 
	Company = models.CharField(max_length=20)
	price = models.IntegerField()
	description = models.CharField(max_length=400)
	date = models.DateTimeField(auto_now=False, auto_now_add=False)

	def __str__(self):
    	 return super().__str__()


	

