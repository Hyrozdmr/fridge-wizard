from django.http import JsonResponse
from django.contrib.auth.models import User
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

@csrf_exempt  # Disables CSRF protection for this view
def signup(request):
    print('function working')
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')  # Consider hashing this

        # Get the database handle
        db, client = get_db_handle(db_name='fridge-hero',
                                   host='localhost',
                                   port=27017,
                                   username='',
                                   password='')
        print('getting this far')
        users_collection = db['users']


        # Insert the new user
        user_id = users_collection.insert_one({
            'username': username,
            'email': email,
            'password': password  # Store hashed password
        }).inserted_id

        # Clean up: close the MongoDB client
        client.close()

        return JsonResponse({'message': 'User created successfully', 'user_id': str(user_id)}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


