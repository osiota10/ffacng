from django.contrib import admin
from . models import *
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount
from .forms import UserChangeForm, UserCreationForm

# Register your models here.


class CustomUserAdmin(UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    ordering = ('email',)
    list_display = ('email', 'first_name', 'last_name', 'plan', 'date_joined',
                    'is_active', 'is_staff', 'is_superuser', 'recommended_by')
    model = UserAccount
    fieldsets = (
        (None, {'fields': ('image', 'password',)}),
        ('Personal info', {
            'fields': ('status', 'first_name', 'last_name', 'email', 'gender', 'phone_number', 'date_of_birth', 'code', 'recommended_by', 'plan', 'refferer_code_used',)}),
        ('Bank Information', {
            'fields': ('bank_name', 'account_name', 'account_number',)}),
        ('Contact Address', {
         'fields': ('home_address', 'local_govt', 'state_of_origin', 'nationality',)}),
        ('Permissions', {
         'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {
            'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'email', 'refferer_code_used', 'plan', 'password1', 'password2')}
         ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Existing object (editing)
            return self.readonly_fields + ('status', 'code', 'recommended_by', 'plan', 'refferer_code_used', 'email')
        else:  # New object (creating)
            return self.readonly_fields


class UserAccountBalanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_balance', 'match_bonus_earned',
                    'referral_bonus_earned')

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Existing object (editing)
            return self.readonly_fields + ('user', 'total_balance', 'match_bonus_earned', 'referral_bonus_earned')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False


class MatchBonusAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Existing object (editing)
            return self.readonly_fields + ('date_created', 'user', 'user_depth', 'credited_amount')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('date', 'user', 'pin',
                    'amount', 'status', 'is_reg_bonus_credited')

    def get_readonly_fields(self, request, obj=None):
        if obj and obj.status == 'Approved':
            return self.readonly_fields + ('user', 'pin', 'amount', 'payment_proof', 'is_reg_bonus_credited', 'status')

        if obj:  # Existing object (editing)
            return self.readonly_fields + ('user', 'pin', 'payment_proof', 'amount', 'is_reg_bonus_credited')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False


class UserNotificationAdmin(admin.ModelAdmin):
    list_display = ('date', 'user', 'subject',
                    'message')

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Existing object (editing)
            return self.readonly_fields + ('user', 'subject', 'message', 'is_read')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False


class ReferralBonusAdmin(admin.ModelAdmin):
    list_display = ('date_created', 'user', 'referred_user_full_name',
                    'referred_user_email', 'credited_amount')

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Existing object (editing)
            return self.readonly_fields + ('user', 'referred_user_full_name', 'referred_user_email', 'credited_amount')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False


class WithdrawalsAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'user', 'amount', 'balance_before',
                    'balance_after', 'status', 'updated_at')

    def get_readonly_fields(self, request, obj=None):
        if obj and (obj.status == 'Rejected' or obj.status == 'Approved'):
            return self.readonly_fields + ('user', 'amount', 'balance_before', 'balance_after', 'is_total_balance_updated', 'status')

        if obj:  # Existing object (editing)
            return self.readonly_fields + ('user', 'amount', 'balance_before', 'balance_after', 'is_total_balance_updated')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False


class ActiveUsersAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'email', 'recommended_by',
                    'is_superuser')

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Existing object (editing)
            return self.readonly_fields + ('user', 'full_name', 'email', 'recommended_by', 'is_superuser')
        else:  # New object (creating)
            return self.readonly_fields

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(UserAccount, CustomUserAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(UserAccountBalance, UserAccountBalanceAdmin)
admin.site.register(Withdrawal, WithdrawalsAdmin)
admin.site.register(MatchBonus, MatchBonusAdmin)
admin.site.register(ReferralBonus, ReferralBonusAdmin)
admin.site.register(UserNotification, UserNotificationAdmin)
admin.site.register(ActiveUser, ActiveUsersAdmin)
admin.site.register(LevelInformation)


admin.site.site_header = 'FFCNG ADMIN'
admin.site.site_title = 'FFCNG Admin'
