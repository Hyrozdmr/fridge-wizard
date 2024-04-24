import requests

BASE_URL = "http://localhost:8000"

def create_user(data): # function to send a post request to create a new user 

    url = f"{"http://localhost:8000"}/api/users/create/"
    response = requests.post(url, json=data)
    return response

def get_user(user_id):
    url = f"{"http://localhost:8000"}/api/users/get"  
    response = requests.get(url)
    return response