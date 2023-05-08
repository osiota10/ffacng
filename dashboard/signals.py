from django.db.models.signals import post_save
from django.dispatch import receiver
from dashboard.models import UserAccountInfo, UserAccount


@receiver(post_save, sender=UserAccount)
def create_user_account_info(sender, instance, created, **kwargs):
    if created:
        UserAccountInfo.objects.create(user=instance)
