# backend/controllers/users.py
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Disables CSRF protection for this view (for simplicity in this example)
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Create the user
        user = User.objects.create_user(username=username, email=email, password=password)

        # Return successful response
        return JsonResponse({'message': 'User created successfully'}, status=201)
    else:
        # Return 405 if user tries method that isn't post
        return JsonResponse({'error': 'Method not allowed'}, status=405)
