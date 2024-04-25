# file: fridge-hero/backend/backend/routes/fridges.py
from django.urls import path
from backend.controllers import fridges as fridge_controllers

urlpatterns = [
    path('create/', fridge_controllers.create, name='create'),
    path('<str:fridge_id>/add-item/', fridge_controllers.add_item, name='add_item'),
]