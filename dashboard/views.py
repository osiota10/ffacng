from .utils import MLMSystem, User
from django.shortcuts import render
from .models import *
from .utils import *
from rest_framework import generics
from .serializer import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class PaymentView(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class PaymentViewRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated,]
    lookup_field = "id"

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class RefCodeCheckView(generics.RetrieveAPIView):
    serializer_class = RefCodeCheckSerializer
    permission_classes = [AllowAny,]
    lookup_field = 'code'

    def get_queryset(self):
        return UserAccount.objects.all()


# mlm_system_test = MLMSystem()
# mlm_system_test.add_user('Osiota', 'Root')
# mlm_system_test.add_user('Terry', 'Root')
# mlm_system_test.add_user('emeka', 'Osiota')
# mlm_system_test.add_user('anita', 'Osiota')
# mlm_system_test.add_user('favour', 'Osiota')
# mlm_system_test.add_user('ese', 'Osiota')
# mlm_system_test.add_user('paul', 'Root')
# mlm_system_test.add_user('faith', 'emeka')
# mlm_system_test.add_user('gift', 'emeka')
# mlm_system_test.add_user('john', 'emeka')
# mlm_system_test.add_user('philip', 'emeka')
# mlm_system_test.add_user('special', 'emeka')
# mlm_system_test.add_user('special11', 'Osiota')
# mlm_system_test.add_user('special12', 'Osiota')
# mlm_system_test.add_user('Godwin', 'Root')
# mlm_system_test.add_user('Peace', 'Root')

# tree = mlm_system_test.print_binary_tree()
# # mlm_system_test._print_binary_tree('Osiota')
# mlm_system_test.print_individual_binary_tree('faith')
# print(mlm_system_test.find_depth('favour'))
# print(mlm_system_test.get_downline_by_depth('Osiota'))

# users = UserAccount.objects.all().exclude(is_superuser=True)

# super_user = UserAccount.objects.all().filter(is_superuser=True).first

# users_dict = {user.email: user.recommended_by for user in users}

# # print(super_user)
# print(users_dict.keys())
# print(users_dict.values())
# mlm_system_test = MLMSystem()
# # for key, value in users_dict.items():
# #     mlm_system_test.add_user(key, value)

# tree = mlm_system_test.print_binary_tree()
