from django.http import JsonResponse
from app.models import Fridge
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
# from ...utils import get_db_handle
import json

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

    if request.method == 'POST':
        data = json.loads(request.body)
        storedItems = [{
            'category1':{
                'item1':'expiry1',
                'item2':'expiry2'},
            'category2':{
                'item3':'expiry3',
                'item4':'expiry4'}
            }
        ]
        
        # Get the database handle
        db, client = get_db_handle(db_name='fridge_hero',
                                    host='localhost',
                                    port=27017,
                                    username='',
                                    password='')
        print('getting this far')
        fridges_collection = db['fridges']
        # Insert the new fridge
        fridge_id = fridges_collection.insert_one({
            'storedItems': storedItems,
        }).inserted_id

        # Clean up: close the MongoDB client
        client.close()

        return JsonResponse({'message': 'Fridge created successfully', 'fridge_id': str(fridge_id)}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
 



    #     # Clean up: close the MongoDB client
    #     client.close()



