# Generated by Django 3.1.6 on 2021-03-18 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=20)),
                ('deposit', models.IntegerField()),
                ('firstname', models.CharField(max_length=30)),
                ('lastname', models.CharField(max_length=30)),
            ],
        ),
    ]
