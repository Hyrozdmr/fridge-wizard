// file: frontend/src/components/logIn.js
import React from 'react';
import AxiosInstance from './axios';
import { Button } from '@mui/material';
import SimpleTextField from './forms/simpleTextField';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FridgeImage from '../assets/Fridge-closed.jpg'
import './styles.css';

// Welcome page elements to be conditionally rendered on landing page
export default function LogIn({ onBackClick }) {

  const navigate = useNavigate();

  // Set default values for submitted information
  const defaultValues = {
    email:'',
    password:'',
  }

  // Declare a useForm variable to handle submitting information
  const {handleSubmit, control} = useForm({defaultValues:defaultValues})

  // Logic for submitting the form goes here
  async function submission(data) {
    try {
      let userInfo = {
        email: data.email,
        password: data.password
      }

      AxiosInstance.post('users/login/', userInfo)
      .then((res) => {
        console.log(res.data.user_id);
        localStorage.setItem("token", res.data.token);
        navigate(
          '/fridge/',
          { state:{
            user_id: res.data.user_id}
          }
      )})
      .catch((error) => {// Handle error if POST request fails
        console.error('Error:', error);
      });
    } catch (error) {
      console.log('Error logging in:', error.message);
    }
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
      
      <h1>Log in to Fridge Hero</h1>

      <form className='login-fields' onSubmit={handleSubmit(submission)}>
      
        <SimpleTextField
          label='Email'
          name='email'
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

        <Button className='welcome-button' variant='contained' type='submit' sx={{width: '100%'}}> 
          Submit
        </Button>

      </form>
    </div>
    </div>
  )
}