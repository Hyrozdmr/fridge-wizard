from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json
import pymongo
from bson import ObjectId
from pymongo import UpdateOne


# Set up function for getting db connection
def get_db_handle(db_name, host, port, username, password):

    client = MongoClient(host=host,
                    port=int(port),
                    username=username,
                    password=password
                    )
    db_handle = client[db_name]
    return db_handle, client

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
        print('getting this far')
        fridges_collection = db['fridges']

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
 



    #     # Clean up: close the MongoDB client
    #     client.close()


@csrf_exempt
def add_items(request, fridge_id):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body)
            items = data.get('items', [])

            db, client = get_db_handle(db_name='fridge_hero', host='localhost', port=27017, username='', password='')
            fridges_collection = db['fridges']

            updates = []
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

            if updates:
                update_result = fridges_collection.bulk_write(updates)

            client.close()

            if updates and update_result.modified_count > 0:
                return JsonResponse({'message': f'{update_result.modified_count} items added successfully'}, status=200)
            else:
                return JsonResponse({'message': 'No items were added', 'details': str(update_result.bulk_api_result)}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



