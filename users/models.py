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
    money = models.IntegerField(default=0)
    