# Generated by Django 4.1.6 on 2023-05-07 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_withdrawal_useraccountinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccountinfo',
            name='balance',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='withdrawal',
            name='amount',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='withdrawal',
            name='balance_after',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='withdrawal',
            name='balance_before',
            field=models.IntegerField(default=0),
        ),
    ]
