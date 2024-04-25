// file: frontend/src/components/signUp.js
import React from 'react';
import AxiosInstance from './axios';
import { Button } from '@mui/material';
import SimpleTextField from './forms/simpleTextField';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FridgeImage from '../assets/Fridge-closed.jpg'
import './styles.css';

// Welcome page elements to be conditionally rendered on landing page
export default function SignUp({ onBackClick }) {

  const navigate = useNavigate();

  // Set default values for submitted information
  const defaultValues = {
    email:'',
    username:'',
    password:'',
  }

  // Declare a useForm variable to handle submitting information
  const {handleSubmit, control} = useForm({defaultValues:defaultValues})

  // Logic for submitting the form goes here
  function submission(data) {
    // Define the data structure with hardcoded array of strings for storedItems
    // Get today's date
    const today = new Date();
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const fridgeData = {
      storedItems: {
        'Welcome pack':{
            'Expired hot sauce': addDays(today, -7),
            'White miso paste': addDays(today, 7) },
        'Vegetables':{ },
        'Fruit':{ },
        'Meat':{ },
        'Dairy':{ },
        'Misc':{ }
        },
      user_id : "662a2ecac531a17f726fcbc1"
    };
    console.log('New user with ' + data.email + ' signed up');
    AxiosInstance.post( 'fridges/create/', fridgeData)
      .then((res) => {
        navigate('/fridge/')
      })
      .catch((error) => {
        // Handle error if POST request fails
        console.error('Error:', error);
    });
    console.log('Created default fridge for user_id ' + fridgeData.user_id);
  }

  return (
    <div className='container'>
    <div className='image-container'>
      <img src={FridgeImage} alt="Fridge" />
    </div>
    <div className='welcome-container'>
      <Button className='welcome-button'
        variant='contained'
        onClick={( onBackClick )}> 
          Back
      </Button>

      <h1>Get your own Fridge Hero</h1>

      <form className='login-fields' onSubmit={handleSubmit(submission)}>
      
        <SimpleTextField
          label='Email'
          name='email'
          control={control}
          width={'30%'}
          >
        </SimpleTextField>

        <SimpleTextField
          label='Username'
          name='username'
          control={control}
          width={'30%'}
          >
        </SimpleTextField>

        <SimpleTextField
          label='Password'
          name='password'
          control={control}
          width={'30%'}
          >
        </SimpleTextField>

        <Button className='welcome-button' variant='contained' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  </div>
  )
}