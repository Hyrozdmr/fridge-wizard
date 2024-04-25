from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json

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



