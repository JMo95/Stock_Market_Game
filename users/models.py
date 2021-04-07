from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    username = models.CharField(max_length=30, default="N/A")
    deposit = models.IntegerField( max_length=30, default=100)
    firstname = models.CharField(max_length=30, default="N/A")
    lastname = models.CharField(max_length=30, default="N/A")
    # Any extra fields would go here
    def __str__(self):
        return super().__str__()


# Create your models here.
