from .utils import MLMSystem, User
from django.shortcuts import render
from .models import *
from .utils import *
from rest_framework import generics
from .serializer import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView


class PaymentView(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class PaymentViewRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated,]
    lookup_field = "id"

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class RefCodeCheckView(generics.RetrieveAPIView):
    serializer_class = RefCodeCheckSerializer
    permission_classes = [AllowAny,]
    lookup_field = 'code'

    def get_queryset(self):
        return UserAccount.objects.all()


# First Super User
super_user = UserAccount.objects.all().filter(is_superuser=True).first()
super_user_email = super_user.email

# User list without Super user
user_info_list = list(UserAccount.objects.all().exclude(
    is_superuser=True).values_list('email', 'recommended_by__email'))

user_info_list.insert(0, super_user_email)


mlm_system_test = MLMSystem(user_info_list)
tree = mlm_system_test.print_binary_tree()


class DownlineView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        current_user_downline = mlm_system_test.get_downline_by_depth(
            request.user.email)

        downline_user_list = []
        for user in current_user_downline[1:]:
            find_user = UserAccount.objects.get(email=user)
            downline_user_list.append(find_user)
        queryset = downline_user_list
        # print(mlm_system_test.find_user_depth(request.user.email))
        serializer = MlmSystemUserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RefferalView(generics.ListCreateAPIView):
    serializer_class = MlmSystemUserSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        query = UserAccount.objects.filter(
            refferer_code_used=self.request.user.code)
        return query


class WithdrawalView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        withdrawals = Withdrawal.objects.filter(user=request.user)
        serializer = WithdrawalSerializer(withdrawals, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_account = UserAccountInfo.objects.get(
            user=request.user)  # retrieve UserAccountInfo instance
        balance = user_account.balance
        amount = request.data.get('amount')

        if float(amount) <= balance:  # convert amount to float before comparison
            # Create withdrawal
            withdrawal = Withdrawal.objects.create(
                user=request.user, amount=amount, status='Pending')

            # Update user balance
            balance -= float(amount)
            user_account.save()
            # Set balance_before and balance_after
            withdrawal.balance_before = user_account.balance + float(amount)
            withdrawal.balance_after = user_account.balance
            withdrawal.save()
            # Return withdrawal data
            serializer = WithdrawalSerializer(withdrawal)
            return Response(serializer.data)
        else:
            return Response({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)


class UserAccountInfoView(generics.RetrieveAPIView):
    serializer_class = UserAccountInfoSerializer
    permission_classes = [IsAuthenticated,]

    def get_object(self):
        return UserAccountInfo.objects.get(user=self.request.user)

# tree = mlm_system_test.print_binary_tree()
# # mlm_system_test._print_binary_tree('Osiota')
# mlm_system_test.print_individual_binary_tree('faith')
# print(mlm_system_test.find_depth('favour'))
# print(mlm_system_test.get_downline_by_depth('Osiota'))

# users = UserAccount.objects.all().exclude(is_superuser=True)

# super_user = UserAccount.objects.all().filter(is_superuser=True).first

# users_dict = {user.email: user.recommended_by for user in users}

# # print(super_user)
# print(users_dict.keys())
# print(users_dict.values())
# mlm_system_test = MLMSystem()
# # for key, value in users_dict.items():
# #     mlm_system_test.add_user(key, value)

# tree = mlm_system_test.print_binary_tree()
