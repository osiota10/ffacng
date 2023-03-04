from rest_framework import serializers
from .models import *
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model

user = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = user
        fields = ('id', 'first_name',
                  'last_name', 'email', 'password')


class UserInfoSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = user
        fields = ('id', 'first_name', 'last_name', 'phone_number', 'email', 'get_photo_url',
                  'date_of_birth', 'gender', 'home_address', 'local_govt', 'state_of_origin',
                  'nationality', 'image', 'code', 'bank_name', 'account_name', 'account_number', 'date_joined',
                  'local_govt', 'state_of_origin', 'recommended_by')


# class PaymentProofSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PaymentProof
#         fields = ('id', 'date', 'get_image_url')


class PaymentSerializer(serializers.ModelSerializer):
    # payment_proof = serializers.FileField()

    class Meta:
        model = Payment
        fields = ('id', 'date', 'amount', 'pin', 'status', 'payment_proof')

    # def create(self, validated_data):
    #     # Extract the nested proof data from the validated data
    #     proof_data = validated_data.pop('proof')

    # # Create the Payment object with the remaining validated data
    #     payment = Payment.objects.create(**validated_data)

    # # Create the associated Proof object
    #     PaymentProof.objects.create(payment=payment, **proof_data)

    # # Return the Payment object
    #     return payment
