# Fridge Hero
Fridge Hero looks at ingredients in your fridge and suggests recipes for your next meals based on what is expiring first.

# Application structure
Fridge Hero uses a React frontend with JS, Typescript and Angular elements, a Django backend with Python and a Mongo database.

# Installation
To install Fridge Hero:
## Clone Git repository
Go to GitHub and clone the whole Git repo.

## Install dependencies
In the frontend folder, run npm install.
In the backend folder run pipenv install.

# Running
## Running the dev environment
In a terminal, in the frontend folder, run npm run start.
In another terminal, in the backend folder, run pipenv shell to start the virtual environment, then run python manage.py runserver.

By default, frontend and backend servers are accessible locally at ports 3000 and 8000 respectively.

## Running tests
For the backend, cd to backend and run pytest
For the frontend, cd to frontend and run npm run test

## Building for production
TK