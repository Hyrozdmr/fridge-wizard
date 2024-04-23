from django.urls import path
from ..controllers import users as user_controllers

urlpatterns = [
    path('users/', user_controllers.signup, name='user-signup'),
]