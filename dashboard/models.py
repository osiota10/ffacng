from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
from django.conf import settings
from .utils import generate_ref_code, generate_payment_pin
from decimal import Decimal


class UserAccountManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    GENDER = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.IntegerField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(null=True, blank=True)
    image = CloudinaryField('image', null=True, blank=True)
    gender = models.CharField(max_length=7, blank=True,
                              null=True, choices=GENDER)
    home_address = models.TextField(null=True, blank=True)
    local_govt = models.CharField(max_length=255, null=True, blank=True)
    state_of_origin = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    bank_name = models.CharField(max_length=50, blank=True, null=True)
    account_name = models.CharField(max_length=50, blank=True, null=True)
    account_number = models.CharField(max_length=10, blank=True, null=True)
    code = models.CharField(max_length=12, blank=True)
    recommended_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CharField, blank=True, null=True, related_name='ref_by')
    refferer_code_used = models.CharField(max_length=12, blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'phone_number', 'refferer_code_used']
    ordering = ('email',)

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    @property
    def get_photo_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return "https://cdn-icons-png.flaticon.com/512/147/147142.png"

    def save(self, *args, **kwargs):
        if self.code == "":
            code = generate_ref_code()
            self.code = code

        # if self.refferer_code_used:
        #     current_reffer = UserAccount.objects.get(
        #         code=self.refferer_code_used)
        #     self.recommended_by = current_reffer

        if self.refferer_code_used:
            current_reffer = UserAccount.objects.get(
                code=self.refferer_code_used)
            if self.pk is None and UserAccount.objects.filter(is_superuser=True).count() == 0:
                self.recommended_by = ''
            else:
                self.recommended_by = current_reffer
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class Payment(models.Model):
    STATUS = [
        ('Pending', 'Pending'),
        ('Rejected', 'Rejected'),
        ('Approved', 'Approved')
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    pin = models.CharField(max_length=5, blank=True)
    amount = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS, default='Pending')
    payment_proof = CloudinaryField('image', blank=True, null=True)

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.payment_proof}")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - N{self.amount} - {self.status}"

    def save(self, *args, **kwargs):
        if self.pin == "":
            pin = generate_payment_pin()
            self.pin = pin
        super().save(*args, **kwargs)


class UserAccountInfo(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='balance')
    balance = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.email}'s balance: {self.balance}"


class Withdrawal(models.Model):
    STATUS = [
        ('Pending', 'Pending'),
        ('Rejected', 'Rejected'),
        ('Approved', 'Approved')
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    amount = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS, default='Pending')
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    balance_before = models.IntegerField(default=0)
    balance_after = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        user_account = UserAccountInfo.objects.get(user=self.user)
        balance_before = user_account.balance
        self.balance_before = balance_before
        balance_after = balance_before - int(self.amount)
        self.balance_after = balance_after

        if self.status == 'Approved':
            # update user balance
            user_account.balance = balance_after
            user_account.save()

        super().save(*args, **kwargs)
