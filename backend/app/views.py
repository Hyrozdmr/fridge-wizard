# file: views.py
from django.http import HttpResponse
from pymongo import MongoClient
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Fridge
from .serializers import FridgeSerializer

# FridgeVset handles requests to the fridges collection
@csrf_exempt
class FridgeViewset(viewsets.ViewSet):
    # connect to mongo db
    client = MongoClient('mongodb://localhost:27017')
    db = client['fridge_hero_test']
    collection = db['fridges']

    permission_classes = [permissions.AllowAny]
    serializer_class = FridgeSerializer

    def create(self, request):
        serializer = FridgeSerializer(data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB collection
            self.collection.insert_one(serializer.data)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)