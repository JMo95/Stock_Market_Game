from django.db import models 
  
# Create your models here. 
  
  
class Base(models.Model): 
    name = models.CharField(max_length=30) 
    detail = models.CharField(max_length=500)
    problems = models.CharField(max_length=500)

