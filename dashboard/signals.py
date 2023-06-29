from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from dashboard.models import *
from dashboard.views import initialized_match_and_referral_bonus_payment
from django.db import transaction


@receiver(post_save, sender=UserAccount)
def create_user_account_info(sender, instance, created, **kwargs):
    if created:
        UserAccountBalance.objects.create(user=instance)

        if instance.plan == "Premium":
            Payment.objects.create(user=instance, amount='15000')
        elif instance.plan == "Eureka":
            Payment.objects.create(user=instance, amount='15500')

        initialized_match_and_referral_bonus_payment()


# Update Match Bonus
@receiver(post_save, sender=MatchBonus)
def update_match_bonus(sender, instance, created, **kwargs):
    if created:
        subject = 'Match Bonus'
        message = f'You have received N{instance.credited_amount} for completing level {instance.user_depth}'
        UserNotification.objects.create(
            user=instance.user, subject=subject, message=message)
        user_account_info = UserAccountBalance.objects.get(user=instance.user)

        credited_amount = instance.credited_amount
        user_account_info.match_bonus_earned += credited_amount
        user_account_info.total_balance += credited_amount

        user_account_info.save()


# Update User Status
@receiver(post_save, sender=Payment)
def update_user_status(sender, instance, created, **kwargs):
    if not created and not instance.is_reg_bonus_credited:
        current_user = UserAccount.objects.get(email=instance.user.email)
        payment_status = instance.status
        user_account_info = UserAccountBalance.objects.get(user=instance.user)
        subject = 'Registration Bonus'
        message = 'You have received N2000 as registration bonus'

        if payment_status == 'Approved':
            current_user.status = 'Active'  # set user active
            user_account_info.total_balance += 2000  # credit reg bonus
            UserNotification.objects.create(
                user=instance.user, subject=subject, message=message)  # create notification
            # Add user to Active List
            ActiveUser.objects.create(user=instance.user)
            initialized_match_and_referral_bonus_payment()

            with transaction.atomic():
                current_user.save()
                user_account_info.save()
                instance.is_reg_bonus_credited = True  # set is_reg_bonus_credited True
                instance.save()


# Update Referral Bonus
@receiver(post_save, sender=ReferralBonus)
def update_referral_bonus(sender, instance, created, **kwargs):
    if created:
        user_account_info = UserAccountBalance.objects.get(user=instance.user)
        subject = 'Referral Bonus'
        message = f'You have received N{instance.credited_amount} for referring {instance.referred_user_full_name}'
        UserNotification.objects.create(
            user=instance.user, subject=subject, message=message)

        credited_amount = instance.credited_amount
        user_account_info.referral_bonus_earned += credited_amount
        user_account_info.total_balance += credited_amount

        user_account_info.save()


# Withdrawal Approval
@receiver(post_save, sender=Withdrawal)
def approve_withdrawal(sender, instance, created, **kwargs):
    if not created and not instance.is_total_balance_updated:
        try:
            user_account_info = UserAccountBalance.objects.get(
                user=instance.user)
            withdrawal_amount = instance.amount

            if user_account_info.total_balance >= withdrawal_amount:

                if user_account_info.total_balance > instance.balance_before:
                    instance.balance_before = user_account_info.total_balance
                    instance.balance_after = user_account_info.total_balance - withdrawal_amount

                user_account_info.total_balance -= withdrawal_amount
                user_account_info.match_bonus_earned = 0
                user_account_info.referral_bonus_earned = 0

                with transaction.atomic():
                    user_account_info.save()
                    instance.is_total_balance_updated = True
                    instance.save()
            else:
                return

        except UserAccountBalance.DoesNotExist:
            # Handle the case where the UserAccountBalance doesn't exist for the user
            pass
