from django.urls import path
from backend.controllers import users as user_controllers

urlpatterns = [
    path('signup/', user_controllers.signup, name='user-signup'),
]