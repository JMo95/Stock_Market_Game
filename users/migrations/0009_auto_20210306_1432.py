# Generated by Django 3.1.6 on 2021-03-06 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_limitorders_stop'),
    ]

    operations = [
        migrations.AlterField(
            model_name='limitorders',
            name='Symbol',
            field=models.CharField(max_length=4),
        ),
    ]