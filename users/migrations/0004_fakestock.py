# Generated by Django 3.1.6 on 2021-03-05 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_investor'),
    ]

    operations = [
        migrations.CreateModel(
            name='FakeStock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Symbol', models.CharField(max_length=4, unique=True)),
                ('Price', models.FloatField(default=0)),
            ],
        ),
    ]