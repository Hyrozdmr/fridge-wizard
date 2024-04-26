from django.urls import path
from backend.controllers import users as user_controllers
from backend.controllers import user_login as login
# from backend.lib import token as makeToken

# imported the login above 
# added path for login on line 10 

urlpatterns = [
    path('signup/', user_controllers.signup, name='user-signup'),
    path('login/', login.login, name='user-login'),    
    # path('token/', makeToken.generate_token, name='user-token'),
]