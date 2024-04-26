import jwt
from datetime import datetime, timedelta
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json

# Function to generate JWT token
def generate_token(user_id):
    payload = {
        'user_id': str(user_id),
        'exp': datetime.utcnow() + timedelta(minutes=10)  # Token expiration time set to 10 minutes
    }
    return jwt.encode(payload, 'your_secret_key', algorithm='HS256')  # Replace 'your_secret_key' with your actual secret key

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
        db, client = get_db_handle(db_name='fridge-hero',
                                   host='localhost', 
                                   port=27017, username='', 
                                   password='')

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
            
            # Generate token for the authenticated user
            token = generate_token(user['_id'])

            # Clean up: close the MongoDB client
            client.close()

            # Return token along with user_id
            return JsonResponse({'message': 'Login successful', 'user_id': str(user['_id']), 'token': token.decode('utf-8')}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Something went wrong: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
