# Generated by Django 4.2 on 2023-04-19 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='sender',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
