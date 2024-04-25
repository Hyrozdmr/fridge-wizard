// file: frontend/src/components/signUp.js
import React from 'react';
import { Button } from '@mui/material';
import SimpleTextField from './forms/simpleTextField';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FridgeImage from '../assets/Fridge-closed.jpg'
import './styles.css';
import { signup } from '/Users/kevineboda/finalproject/fridge-hero/frontend/src/services/user_services.js';



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

  async function submission(data) {
    try {
      await signup(data.username, data.email, data.password);
      navigate('/fridge');
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error (e.g., display error message to the user)
    }
  }
  

  // Logic for submitting the form goes here
  // function submission(data) {
  //     console.log(data.email);
  //     console.log(data.username);
  //     console.log(data.password);
  //     navigate('/fridge')
  //   }

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