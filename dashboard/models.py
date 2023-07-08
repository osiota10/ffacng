from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
from django.conf import settings
from .utils import generate_ref_code, generate_payment_pin
from django.core.validators import RegexValidator
from django.utils import timezone


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

    STATUS = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive')
    ]

    PLAN = [
        ('Premium', 'Premium'),
        ('Eureka', 'Eureka')
    ]

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(null=True, blank=True, max_length=11, validators=[
                                    RegexValidator(r'^\d{11}$', 'Enter a valid phone number.')])
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    image = CloudinaryField('image', null=True, blank=True)
    gender = models.CharField(max_length=7, blank=True,
                              null=True, choices=GENDER)
    status = models.CharField(max_length=9, choices=STATUS, default='Inactive')
    home_address = models.TextField(null=True, blank=True)
    local_govt = models.CharField(max_length=255, null=True, blank=True)
    state_of_origin = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    bank_name = models.CharField(max_length=50, blank=True, null=True)
    account_name = models.CharField(max_length=50, blank=True, null=True)
    account_number = models.CharField(max_length=10, blank=True, null=True)
    code = models.CharField(max_length=12, blank=True)
    plan = models.CharField(max_length=9, choices=PLAN)
    recommended_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name='ref_by')
    refferer_code_used = models.CharField(max_length=12, blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'phone_number', 'refferer_code_used', 'plan']
    ordering = ('email',)

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return self.first_name

    def get_date_only(self):
        return self.date_joined.date()

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.image}")

    @property
    def get_photo_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return "https://cdn-icons-png.flaticon.com/512/147/147142.png"

    def save(self, *args, **kwargs):
        if self.status == "Active" and self.code == "":
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

        if not self.id:  # Only set the date_joined if the user is being created
            self.date_joined = timezone.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class Payment(models.Model):
    STATUS = [
        ('Pending', 'Pending'),
        ('Rejected', 'Rejected'),
        ('Approved', 'Approved')
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    pin = models.CharField(max_length=5, blank=True)
    amount = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS, default='Pending')
    payment_proof = CloudinaryField('image', blank=True, null=True)
    is_reg_bonus_credited = models.BooleanField(default=False)
    payment_proof_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - N{self.amount} - {self.status}"

    def save(self, *args, **kwargs):
        if self.pin == "":
            pin = generate_payment_pin()
            self.pin = pin

        if self.payment_proof and self.payment_proof_url == "":
            url = f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.payment_proof}"
            self.payment_proof_url = self.get_image_url()
        super().save(*args, **kwargs)

    def get_image_url(self):
        return (f"https://res.cloudinary.com/dkcjpdk1c/image/upload/{self.payment_proof}")


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
    updated_at = models.DateTimeField(auto_now=True)
    balance_before = models.IntegerField(default=0)
    balance_after = models.IntegerField(default=0)
    is_total_balance_updated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - Requested to withdraw {self.amount}"


class UserAccountBalance(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='balance')
    total_balance = models.IntegerField(default=0)
    match_bonus_earned = models.IntegerField(
        default=0,
        help_text="Match bonus earned by the user"
    )
    referral_bonus_earned = models.IntegerField(
        default=0,
        help_text="Referral bonus earned by the user"
    )

    def __str__(self):
        return f"{self.user.email}'s balance: {self.total_balance} Match Bonus: {self.match_bonus_earned}"


class MatchBonus(models.Model):
    date_created = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='credited_depths', on_delete=models.CASCADE)
    user_depth = models.IntegerField()
    credited_amount = models.IntegerField(default=0)

    def __str__(self):
        return f"MatchBonus(user={self.user}, credited_depth={self.user_depth}, credited_amount={self.credited_amount})"

    class Meta:
        verbose_name_plural = "Match Bonuses"


class ReferralBonus(models.Model):
    date_created = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='referral', on_delete=models.CASCADE)
    # user_depth = models.IntegerField()
    referred_user_full_name = models.CharField(
        max_length=50, null=True, blank=True)
    referred_user_email = models.EmailField(null=True, blank=True)
    credited_amount = models.IntegerField(default=0)

    def __str__(self):
        return f"Referral Bonus(user={self.user}, credited_amount={self.credited_amount})"

    class Meta:
        verbose_name_plural = "Referral Bonuses"


class UserNotification(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notification')
    subject = models.CharField(max_length=225)
    message = models.TextField()
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.subject}"


class ActiveUser(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='active_user')
    full_name = models.CharField(max_length=225)
    email = models.EmailField()
    recommended_by = models.CharField(blank=True, null=True, max_length=225)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)

    def save(self, *args, **kwargs):
        if self.user:
            self.full_name = self.user.get_full_name()
            self.email = self.user.email
            self.recommended_by = self.user.recommended_by
            self.is_superuser = self.user.is_superuser
        super().save(*args, **kwargs)


class LevelInformation(models.Model):
    PLAN = [
        ('Premium', 'Premium'),
        ('Eureka', 'Eureka')
    ]

    level = models.IntegerField()
    expected_downlines = models.IntegerField()
    expected_match_bonus = models.IntegerField()
    plan = models.CharField(max_length=9, choices=PLAN, blank=True, null=True)
    additional_reward = models.CharField(max_length=225)

    def __str__(self):
        return str(f"Level {self.level} - Plan {self.plan}")
