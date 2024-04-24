# file: views.py
from django.http import HttpResponse
from pymongo import MongoClient
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Fridge

# Create your views here.

# Example of importing the database connection logic and creating
# a database connection
# from .utils import get_db_handle

# def template_mongo_view():
#     # Your MongoDB connection details
#     host = 'localhost'
#     port = 27017
#     username = 'admin'
#     password = 'admin'
#     db_name = 'fridge_hero'

#     # Get the database handle and client
#     db_handle, client = get_db_handle(db_name, host, port, username, password)

#     # Now you can use db_handle to interact with your MongoDB database
#     # For example:
#     collection = db_handle['my_collection']
#     result = collection.find_one({'some_key': 'some_value'})
    
#     # Don't forget to close the client when you're done
#     client.close()

# fridge_view handles requests to the fridges collection
@csrf_exempt
def fridge_view(request, fridge_instance):                 #http request from client
    # break down the fridge object
    fridge_id = fridge_instance.id
    stored_items = fridge_instance.storedItems

    # connect to mongo db
    client = MongoClient('mongodb://localhost:27017')
    db = client['fridge_hero']
    collection = db['fridges']

    # testing if i can insert a fridge to the db
    fridge_data = {
        'fridge_id' : fridge_id,
        'items' : stored_items,
    }

    collection.insert_one(fridge_data)
    print(fridge_data)

    # Close the client when the request is complete
    client.close()

    return HttpResponse('Fridge created succesfully')

# To test create fridge, comment out the above and use the below and Postman
# @csrf_exempt
# def fridge_view(request):                 #http request from client
#     # break down the fridge object
#     # fridge_id = fridge_instance.id
#     # stored_items = fridge_instance.storedItems

#     # connect to mongo db
#     client = MongoClient('mongodb://localhost:27017')
#     db = client['fridge_hero_test']
#     collection = db['fridges']

#     # testing if i can insert a fridge to the db
#     test_fridge_data = {
#         'fridge_id' : '1',
#         'items' : {'category' : 'item'},
#     }
#     collection.insert_one(test_fridge_data)
#     # collection.insert_one(fridge_data)
#     print(test_fridge_data)

#     # Close the client when the request is complete
#     client.close()

#     return HttpResponse('Fridge created succesfully')