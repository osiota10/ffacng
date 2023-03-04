# Generated by Django 4.1.6 on 2023-03-02 07:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_paymentproof'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentproof',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='paymentproof',
            name='payment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='proof', to='dashboard.payment'),
        ),
    ]
