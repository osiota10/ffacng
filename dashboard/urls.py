from django.urls import path
from .views import *

urlpatterns = [
    path('payments', PaymentView.as_view()),
    path('payments/<int:id>', PaymentViewRetrieveUpdateDestroyView.as_view()),
]
