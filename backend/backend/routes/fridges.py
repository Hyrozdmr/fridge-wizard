# file: fridge-hero/backend/backend/routes/fridges.py
from django.urls import path
from backend.controllers import fridges as fridge_controllers

urlpatterns = [
    path('create/', fridge_controllers.create, name='create'),
    path('get/', fridge_controllers.get, name='get'),
    path('<str:fridge_id>/add-items/', fridge_controllers.add_items, name='add_items'),
]