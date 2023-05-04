from django.urls import path
from .views import *

urlpatterns = [
    path('payments', PaymentView.as_view()),
    path('payments/<int:id>', PaymentViewRetrieveUpdateDestroyView.as_view()),
    path('check-refcode/<str:code>', RefCodeCheckView.as_view()),
]
