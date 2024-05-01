from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from pymongo import MongoClient, UpdateOne
import json
from bson import ObjectId


# Set up function for getting db connection
def get_db_handle(db_name, host, port, username, password):
    client = MongoClient(host=host, port=int(port), username=username, password=password)
    db_handle = client[db_name]
    return db_handle, client

# create function creates a new fridge with assigned user_id 
# and default storedItems
@csrf_exempt # Disables CSRF protection for this view
def create(request):
    # Check if post method in request
    if request.method == 'POST':
        data = json.loads(request.body)
        storedItems = data.get('storedItems')
        user_id = data.get('user_id')
        
        # Get the database handle
        db, client = get_db_handle(db_name='fridge_hero',
                                    host='localhost',
                                    port=27017,
                                    username='',
                                    password='')

        # Replace the above lines with the following to use MongoDB Atlas
        # Get the URI from settings.py
        uri = settings.MONGODB_URI
        # Create a MongoClient instance with the provided URI
        client = MongoClient(uri)
        # Get the database from the client
        db = client.get_default_database()

        fridges_collection = db['fridges']
        print('fridge created')

        # Insert the new fridge into the db
        fridge_id = fridges_collection.insert_one({
            'storedItems': storedItems,
            'user_id': user_id,
        }).inserted_id

        # Clean up: close the MongoDB client
        client.close()

        # Response depends on success / error 
        # Success returns new fridge_id
        return JsonResponse({'message': 'Fridge created successfully', 'fridge_id': str(fridge_id)}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# get function returns fridge data for a single user_id
@csrf_exempt # Disables CSRF protection for this view
def get(request):
    # Check if get method in request
    if request.method == 'GET':
        # Get the user id supplied as params with the get request
        user_id = request.GET.get('user_id')

        if not user_id:
            return JsonResponse({'error': 'user_id parameter is missing'}, status=400)

        
        # Get the database handle
        db, client = get_db_handle(db_name='fridge_hero',
                                    host='localhost',
                                    port=27017,
                                    username='',
                                    password='')

        # Replace the above lines with the following to use MongoDB Atlas
        # Get the URI from settings.py
        uri = settings.MONGODB_URI
        # Create a MongoClient instance with the provided URI
        client = MongoClient(uri)
        # Get the database from the client
        db = client.get_default_database()

        fridges_collection = db['fridges']
        print('got fridge data')

        # Insert the new fridge into the db
        fridge_data = fridges_collection.find_one({'user_id': user_id})

        # Clean up: close the MongoDB client
        client.close()
    
            # Response depends on success / error 
        # First, check if the fridge data exists
        if fridge_data:
            # Convert ObjectId to string before serializing to JSON
            fridge_data['_id'] = str(fridge_data['_id'])
            return JsonResponse({'fridge_data': fridge_data}, status=200)
        else:
            return JsonResponse({'error': 'Fridge not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def add_items(request, fridge_id):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body)
            items = data.get('items', [])

            # Get the database handle
            db, client = get_db_handle(db_name='fridge_hero',
                                        host='localhost',
                                        port=27017,
                                        username='',
                                        password='')

            # Replace the above lines with the following to use MongoDB Atlas
            # Get the URI from settings.py
            uri = settings.MONGODB_URI
            # Create a MongoClient instance with the provided URI
            client = MongoClient(uri)
            # Get the database from the client
            db = client.get_default_database()

            fridges_collection = db['fridges']

            updates = []
            print( 'items', items)
            for item in items:
                item_category = item.get('category')
                item_name = item.get('name')
                expiry_date = item.get('expiry_date')
                updates.append(
                    UpdateOne(
                        {'_id': ObjectId(fridge_id)},
                        {'$set': {f'storedItems.{item_category}.{item_name}': expiry_date}}
                    )
                )
            print('updates', updates)
            print('collection', fridges_collection)
            if updates:
                update_result = fridges_collection.bulk_write(updates)
                print('this is running')
            print('update result', update_result)
            print ('modified count', update_result.modified_count)
            client.close()
            if updates and update_result.modified_count > 0:
                return JsonResponse({'message': f'{update_result.modified_count} items added successfully'}, status=200)
            else:
                return JsonResponse({'message': 'No items were added', 'details': str(update_result.bulk_api_result)}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
