from django.db import transaction
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


# def add_user(user_tuple, user_list):
#     user = user_tuple[0]  # Extract the user from the tuple
#     if user not in [item[0] for item in user_list]:
#         user_list.append(user_tuple)
#         print(f"User '{user}' added to the list.")
#     else:
#         print(f"User '{user}' already exists in the list.")


def process_mlm_system():
    super_user = UserAccount.objects.filter(is_superuser=True).first()
    if super_user is not None:
        super_user_email = super_user.email

        all_active_users = list(ActiveUser.objects.all().exclude(
            is_superuser=True).values_list('email', 'recommended_by').order_by('id'))
        all_active_users.insert(0, super_user_email)

        mlm_system_test = MLMSystem(all_active_users)
        tree = mlm_system_test.print_binary_tree()
        print(all_active_users)

        # Process the MLM system further or return the result
        return mlm_system_test
    else:
        # Handle the case when there is no superuser
        # You can raise an exception, return a default value, or perform any other desired action
        print("No superuser found in the database")
        return


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


class DownlineView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        current_user_downline = process_mlm_system().get_downline_by_depth(
            request.user.email, 6)

        downline_user_list = []
        for user in current_user_downline[1:]:
            find_user = UserAccount.objects.get(email=user)
            downline_user_list.append(find_user)
        queryset = downline_user_list
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
        user_account = UserAccountBalance.objects.get(
            user=request.user)  # retrieve UserAccountBalance instance
        balance = user_account.total_balance
        amount = request.data.get('amount')
        is_any_pending_withdrawal = Withdrawal.objects.filter(
            user=request.user, status='Pending').exists()

        if not is_any_pending_withdrawal:
            if float(amount) <= balance:  # convert amount to float before comparison
                balance_after = balance - float(amount)

                # Create withdrawal
                withdrawal = Withdrawal.objects.create(
                    user=request.user, amount=amount, balance_before=balance, balance_after=balance_after, status='Pending')

                serializer = WithdrawalSerializer(withdrawal)
                return Response(serializer.data)
            else:
                return Response({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'You still have a Pending Withdrawal awaiting approval'}, status=status.HTTP_400_BAD_REQUEST)


class UserAccountInfoView(generics.RetrieveAPIView):
    serializer_class = UserAccountInfoSerializer
    permission_classes = [IsAuthenticated,]

    def get_object(self):
        return UserAccountBalance.objects.get(user=self.request.user)

    def get_object(self):
        user_account_info = UserAccountBalance.objects.get(
            user=self.request.user)
        depth = process_mlm_system().find_user_depth(
            self.request.user.email)  # Calculate the depth
        user_account_info.depth = depth  # Add the depth to the user account info object
        return user_account_info


# Match Bonus Crediting
def credit_users(user_email, user_downline_by_depth, expected_users_by_depth, amounts_to_credit):
    credited_users = []

    # Retrieve the User object based on the email address
    user = UserAccount.objects.get(email=user_email)

    for depth, downline_count in enumerate(user_downline_by_depth, start=1):
        # Access list element by index
        expected_count = expected_users_by_depth[depth - 1]

        if downline_count == expected_count:
            # Access list element by index
            credited_amount = amounts_to_credit[depth - 1]

            # Check if the user has already been credited at this depth
            already_credited = MatchBonus.objects.filter(
                user=user, user_depth=depth).exists()

            if not already_credited:
                # Credit the user at the current depth
                credited_user = MatchBonus.objects.create(
                    user=user, user_depth=depth, credited_amount=credited_amount)
                credited_users.append(credited_user)

    return credited_users


def credit_users_for_mlm_system(mlm_system):
    credited_users = []

    for user in mlm_system.users.keys():
        user_downline_by_depth = mlm_system.count_users_by_depth_for_user(user)
        expected_users_by_depth = [2, 4, 8, 16, 32, 64]
        amounts_to_credit = [3000, 5000, 3000, 15000, 5000, 250000]

        credited_users.extend(credit_users(
            user, user_downline_by_depth, expected_users_by_depth, amounts_to_credit))

    return credited_users


# Referral Bonus Crediting
def credit_user_referral_bonus(user_email, user_downlines, amount_to_credit):
    credited_users = []

    # Retrieve the User object based on the email address
    current_user = UserAccount.objects.get(email=user_email)
    current_user_referral_code = current_user.code

    for user in user_downlines[1:]:
        user_info = UserAccount.objects.get(email=user)
        user_info_referral_code_used = user_info.refferer_code_used
        user_full_name = f"{user_info.first_name}  {user_info.last_name}"
        user_info_email = user_info.email

        if current_user_referral_code == user_info_referral_code_used:
            referral_bonus = amount_to_credit

            # Check if the user has already been credited
            already_credited = ReferralBonus.objects.filter(
                referred_user_email=user_info_email).exists()

            if not already_credited:
                credited_user = ReferralBonus.objects.create(
                    user=current_user, referred_user_full_name=user_full_name, referred_user_email=user_info_email, credited_amount=referral_bonus)
                credited_users.append(credited_user)
    return credited_users


def credit_users_referral_bonus_mlm_system(mlm_system):
    credited_users_referral = []

    for user in mlm_system.users:
        user_downline = mlm_system.get_downline_by_depth(user, 6)
        amount_to_credit = 500

        credited_users_referral.extend(credit_user_referral_bonus(
            user, user_downline, amount_to_credit))
    return credited_users_referral


def initialized_match_and_referral_bonus_payment():
    mlm = process_mlm_system()
    match_bonus_payment_system = credit_users_for_mlm_system(mlm)
    referral_bonus_payment_system = credit_users_referral_bonus_mlm_system(mlm)
    # print(credited_users)
