from django.db import models
from django.contrib.auth.models import User

class TrackedStock(models.Model):
    Symbol = models.CharField(max_length=4)
    Account = models.ForeignKey(User,on_delete=models.CASCADE)
    Quantity = models.IntegerField(default=0)
    
    class Meta:
        unique_together = (("Symbol", "Account"),)
        
class Investor(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    money = models.FloatField(default=0)
    
class FakeStock(models.Model):
    Symbol = models.CharField(max_length=4,unique=True)
    Price = models.FloatField(default=0)
    
class LimitOrders(models.Model):
    Symbol = models.CharField(max_length=4)
    Price = models.FloatField(default=0)
    Stop = models.FloatField(default=0)
    OrginalPrice = models.FloatField(default=0)
    Quantity = models.IntegerField(default=0)
    Account = models.ForeignKey(User,on_delete=models.CASCADE)
    Type = models.CharField(max_length=3,default=None)
    