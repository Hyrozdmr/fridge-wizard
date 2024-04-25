from django.http import JsonResponse
from django.contrib.auth import authenticate
from ..lib.token import generate_token
from .users import *  

def create_token(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            token = generate_token(str(user.id))
            return JsonResponse({'token': token, 'message': 'OK'}, status=201)
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
