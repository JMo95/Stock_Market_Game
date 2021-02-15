from django.db import models
from django.contrib.auth.models import User

class TrackedStock(models.Model):
    Symbol = models.CharField(max_length=4)
    Account = models.ForeignKey(User,on_delete=models.CASCADE)
    