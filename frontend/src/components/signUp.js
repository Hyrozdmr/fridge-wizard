// file: frontend/src/components/logIn.js
import React from 'react';
import { Button } from '@mui/material';
import SimpleTextField from './forms/simpleTextField';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// Welcome page elements to be conditionally rendered on landing page
export default function SignUp() {

  const navigate = useNavigate();

  // Set default values for submitted information
  const defaultValues = {
    email:'',
    password:'',
  }

  // Declare a useForm variable to handle submitting information
  const {handleSubmit, control} = useForm({defaultValues:defaultValues})

  // Logic for submitting the form goes here
  function submission(data) {
      console.log(data.email);
      navigate('/fridge')
    }

  return (
    <div>
      <h1>Sign up</h1>

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

        <Button variant='contained' type='submit' sx={{width: '100%'}}>
              
          Submit

        </Button>
    </form>
    </div>
  )

}