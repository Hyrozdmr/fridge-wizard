// file: frontend/src/components/signUp.js
import React from 'react';
import AxiosInstance from './axios';
import { Button } from '@mui/material';
import SimpleTextField from './forms/simpleTextField';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FridgeImage from '../assets/Fridge-closed.jpg'
import './styles.css';
import { signup } from '/Users/kevineboda/finalproject/fridge-hero/frontend/src/services/user_services.js';



// Welcome page elements to be conditionally rendered on landing page
export default function SignUp({ onBackClick }) {

  // Set navigate function to be used by buttons following user input
  const navigate = useNavigate();
  

  // Set default values for submitted information
  const defaultValues = {
    email:'',
    username:'',
    password:'',
  }

  // Declare a useForm variable to handle submitting information
  const {handleSubmit, control} = useForm({defaultValues:defaultValues})  


  async function submission(data) {
    try {
      await signup(data.username, data.email, data.password);
      navigate('/fridge');
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error (e.g., display error message to the user)

  // Logic for submitting the form goes here
  function submission(data) {
    // Define the data structure with hardcoded array of strings for storedItems
    // Get today's date and declare function for adding / subtracting days
    const today = new Date();
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  }
  

  // Logic for submitting the form goes here
  // function submission(data) {
  //     console.log(data.email);
  //     console.log(data.username);
  //     console.log(data.password);
  //     navigate('/fridge')
  //   }

    // Set data to be sent with request when creating new fridge
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
      user_id : "662a6899f9640ba036390714"
    };

    // Log user creation success
    console.log('New user with ' + data.email + ' signed up');

    // Send post request with fridgeData body to create endpoint
    // And then on success navigate to fridge page passing on
    // User id details to get fridge on next page
    AxiosInstance.post( 'fridges/create/', fridgeData)
      .then((res) => {
        navigate(
          '/fridge/',
          { state:{
            user_id: fridgeData.user_id}
          }
        )
      })
      .catch((error) => {
        // Handle error if POST request fails
        console.error('Error:', error);
    });

    // Log fridge creation success
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