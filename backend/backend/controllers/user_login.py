# we created login as separate file 

from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json
from ..lib.token import generate_token

def get_db_handle(db_name, host, port, username, password):
    client = MongoClient(host=host, port=int(port), username=username, password=password)
    db_handle = client[db_name]
    return db_handle, client

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Get the database handle
        db, client = get_db_handle(db_name='fridge-hero', host='localhost', port=27017, username='', password='')

        users_collection = db['users']

        try:
            # Retrieve the user from the database
            user = users_collection.find_one({'email': email})
            if not user:
                # User not found
                client.close()
                return JsonResponse({'error': 'User not found'}, status=404)
            
            # Check if the password matches
            if not check_password(password, user['password']):
                # Password incorrect
                client.close()
                return JsonResponse({'error': 'Password incorrect'}, status=401)
            # token = generate_token(user['_id'])

            # Clean up: close the MongoDB client
            client.close()

            return JsonResponse({'message': 'Login successful', 'user_id': str(user)}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Something went wrong: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
