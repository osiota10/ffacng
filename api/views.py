from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *
from rest_framework.permissions import AllowAny


# Create your views here.
class ServiceView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny,]


class ServiceDetail(generics.RetrieveAPIView):
    lookup_field = 'slug'
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    permission_classes = [AllowAny,]


class TestimonialView(generics.ListAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerialer
    permission_classes = [AllowAny,]


class CoreValueView(generics.ListAPIView):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer
    permission_classes = [AllowAny,]


class CompanyInformortionView(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = CompanyInformation.objects.all()
    serializer_class = CompanyInformationSerializer
    permission_classes = [AllowAny,]


class StatView(generics.ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [AllowAny,]


class ContactUsView(generics.CreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [AllowAny,]


class WhyChooseUsView(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = WhyChooseUs.objects.all()
    serializer_class = WhyChooseUsSerializer
    permission_classes = [AllowAny,]


class NetworkMarketingView(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = NetworkMarketing.objects.all()
    serializer_class = NetworkMarketingSerializer
    permission_classes = [AllowAny,]


class HeroMenuView(generics.ListAPIView):
    queryset = HeroMenu.objects.all()
    serializer_class = HeroMenuSerializer
    permission_classes = [AllowAny,]


class BranchAddressView(generics.ListAPIView):
    queryset = BranchAddress.objects.all()
    serializer_class = BranchAddressSerializer
    permission_classes = [AllowAny,]


class EmailSubscriptionView(generics.CreateAPIView):
    queryset = EmailSubscription.objects.all()
    serializer_class = EmailSubscriptionSerializer
    permission_classes = [AllowAny,]


class PhotoGalleryView(generics.ListAPIView):
    queryset = PhotoGallery.objects.all()
    serializer_class = PhotoGallerySerializer
    permission_classes = [AllowAny,]
