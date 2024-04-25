from django.urls import path
from backend.controllers.authentication import create_token


urlpatterns = [
    path('/', create_token, name='create_token'),
]
