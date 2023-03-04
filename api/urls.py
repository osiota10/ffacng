from django.urls import path
from .views import *

urlpatterns = [
    path('services', ServiceView.as_view()),
    path('services/<slug:slug>', ServiceDetail.as_view()),
    path('testimonials', TestimonialView.as_view()),
    path('core-values', CoreValueView.as_view()),
    path('company-information/<int:id>', CompanyInformortionView.as_view()),
    path('stat', StatView.as_view()),
    path('contact-us', ContactUsView.as_view()),
    path('why-choose-us/<int:id>', WhyChooseUsView.as_view()),
    path('network-marketing/<int:id>', NetworkMarketingView.as_view()),
    path('hero', HeroMenuView.as_view()),
    path('branch-address', BranchAddressView.as_view()),
    path('email-subscription', EmailSubscriptionView.as_view()),
    path('photo-gallery', PhotoGalleryView.as_view()),
]
