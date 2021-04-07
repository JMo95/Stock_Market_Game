from django.db import models 

# Create your models here. 


class React(models.Model): 
	name = models.CharField(max_length=30) 
	detail = models.CharField(max_length=500)

class User(models.Model): 
	name = models.CharField(max_length=30, unique=True) 
	password = models.CharField(max_length=20)
	deposit = models.IntegerField(default=100)
	firstname = models.CharField(max_length=30, default="N/A")
	lastname = models.CharField(max_length=30, default="N/A")

	def __str__(self):
    	 return super().__str__()


class Stock(models.Model): 
	name = models.CharField(max_length=30) 
	Company = models.CharField(max_length=20)
	price = models.IntegerField()
	description = models.CharField(max_length=400)
	date = models.DateTimeField(auto_now=False, auto_now_add=False)
	ticker = models.CharField(max_length=20)

	def __str__(self):
    	 return super().__str__()


################################################################################
################################################################################
################################################################################



class Person(models.Model): 
	# usename = models.CharField(max_length=30, unique=True)
	token = models.CharField(max_length=30, unique=True) 
	username = models.CharField(max_length=30, default="N/A")
	password = models.CharField(max_length=20)

	def __str__(self):
    	 return super().__str__()


# class PersonS_A(models.Model): 
# 	token = models.CharField(max_length=30, unique=True) 
# 	username = models.CharField(max_length=30, default="N/A")
# 	password = models.CharField(max_length=20)
	

# 	def __str__(self):
#     	 return super().__str__()

	

