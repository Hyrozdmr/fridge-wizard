import jwt
import json
from datetime import datetime, timedelta
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import os

@csrf_exempt
def generate_token(request):
    if request.method == 'POST':
        # Extract user ID from request body
        data = request.body.decode('utf-8')
        data_json = json.loads(data)
        user_id = data_json.get('user_id')

        if user_id:
            token = _generate_token(user_id)
            return JsonResponse({'token': str(token)})
        else:
            return JsonResponse({'error': 'User ID not provided'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def decode_token(request):
    if request.method == 'POST':
        # Extract token from request body
        data = request.body.decode('utf-8')
        data_json = json.loads(data)
        token = data_json.get('token')

        if token:
            try:
                decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
                return JsonResponse({'decoded_token': decoded_token})
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Token has expired'}, status=400)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid token'}, status=400)
        else:
            return JsonResponse({'error': 'Token not provided'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def _generate_token(user_id):
    # Generate JWT token
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')
