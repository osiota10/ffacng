from rest_framework import serializers
from .models import *


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'slug', 'title', 'description',
                  'get_image_url', 'safe_description_body_html')


class TestimonialSerialer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id', 'name', 'location', 'testimony', 'get_photo_url')


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ('id', 'title', 'description', 'get_image_url')


class CompanyInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInformation
        fields = ('id', 'get_logo_url', 'get_page_header_image', 'company_name', 'company_address',
                  'email', 'telephone', 'telephone_2', 'company_history', 'about_company',
                  'term_and_conditions', 'privacy_policy', 'facebook_url', 'instagram_url',
                  'twitter_url', 'linkedin_url', 'whatsapp_url', 'get_history_image', 'youtube_url', 'safe_about_body_html')


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ('id', 'stat_figure', 'stat_title', 'get_image_url')


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ('id', 'name', 'location',
                  'email', 'phone_number', 'message')


class WhyChooseUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUs
        fields = ('id', 'title', 'sub_title', 'description', 'get_image_url')


class NetworkMarketingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NetworkMarketing
        fields = ('id', 'title', 'sub_title', 'description',
                  'get_image_url', 'safe_description_body_html')


class HeroMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroMenu
        fields = ('id', 'title', 'snippet', 'get_image_url')


class BranchAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchAddress
        fields = ('id', 'branch_name', 'phone_number', 'branch_address')


class EmailSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscription
        fields = ('id', 'email', 'date')


class PhotoGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoGallery
        fields = ('id', 'title', 'description', 'get_image_url')
