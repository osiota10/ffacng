# Generated by Django 4.1.6 on 2023-03-02 08:55

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_paymentproof_id_alter_paymentproof_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='payment_proof',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]
