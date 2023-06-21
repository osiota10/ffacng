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
    recommended_by_email = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        model = user
        fields = ('id', 'first_name', 'last_name', 'phone_number', 'email', 'get_photo_url',
                  'date_of_birth', 'gender', 'home_address', 'status', 'local_govt', 'state_of_origin',
                  'nationality', 'image', 'code', 'bank_name', 'account_name', 'account_number', 'date_joined',
                  'local_govt', 'state_of_origin', 'recommended_by', 'recommended_by_email')

    def get_recommended_by_email(self, obj):
        if obj.recommended_by:
            return f'{obj.recommended_by.first_name} {obj.recommended_by.last_name} - {obj.recommended_by.email}'
        return None


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'date', 'amount', 'pin', 'status',
                  'payment_proof', 'get_image_url')


class RefCodeCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('first_name', 'last_name', 'code')


class MlmSystemUserSerializer(serializers.ModelSerializer):
    class Meta(UserSerializer.Meta):
        models = user
        fields = ('id', 'status', 'date_joined', 'first_name',
                  'last_name', 'email', 'phone_number')


class WithdrawalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Withdrawal
        fields = ('id', 'user', 'amount', 'status', 'created_at',
                  'updated_at', 'balance_before', 'balance_after')


class UserAccountInfoSerializer(serializers.ModelSerializer):
    depth = serializers.IntegerField()

    class Meta:
        model = UserAccountBalance
        fields = ('total_balance', 'match_bonus_earned',
                  'referral_bonus_earned', 'depth')


class UserNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNotification
        fields = '__all__'


class LevelInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LevelInformation
        fields = '__all__'
