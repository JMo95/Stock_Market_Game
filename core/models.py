from django.db import models 

# Create your models here. 


class React(models.Model): 
	name = models.CharField(max_length=30) 
	detail = models.CharField(max_length=500)

class PullStock(models.Model):
	stock_name = models.CharField(max_length=10)

	def __str__(self):
    	 return super().__str__()