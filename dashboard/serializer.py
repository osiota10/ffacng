from rest_framework import serializers
from .models import *
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model

user = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = user
        fields = ('id', 'first_name',
                  'last_name', 'email', 'refferer_code_used', 'password')


class UserInfoSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = user
        fields = ('id', 'first_name', 'last_name', 'phone_number', 'email', 'get_photo_url',
                  'date_of_birth', 'gender', 'home_address', 'local_govt', 'state_of_origin',
                  'nationality', 'image', 'code', 'bank_name', 'account_name', 'account_number', 'date_joined',
                  'local_govt', 'state_of_origin', 'recommended_by')


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'date', 'amount', 'pin', 'status',
                  'payment_proof', 'get_image_url')


class RefCodeCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('first_name', 'last_name', 'code')
