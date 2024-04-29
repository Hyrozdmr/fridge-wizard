// file: frontend/src/components/signUp.js
import React, {useState} from 'react';
import AxiosInstance from './axios';
import { Button } from '@mui/material';
import SimpleTextField from './forms/simpleTextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FridgeImage from '../assets/Fridge-closed.jpg';
import './styles.css';
import { signup } from '../services/user_services';

// Welcome page elements to be conditionally rendered on landing page
export default function SignUp({ onBackClick }) {

  // Set navigate function to be used by buttons following user input
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  

  // Set default values for submitted information
  const defaultValues = {
    email:'',
    username:'',
    password:'',
  }

  // Declare a useForm variable to handle submitting information
  const {handleSubmit, control, formState: { errors }} = useForm({defaultValues:defaultValues})  


  async function submission(data) {
    try {
       // Validate email format
       if (!data.email.match(/^[\w\.-]+@[\w\.-]+$/)) {
        setErrorMessage('Invalid email format');
        return;
      }

      // Validate password length and special characters
      if (data.password.length < 8 || !/[!@#$%^&*()-_+={}[\]|\\:]/.test(data.password)) {
        setErrorMessage('Password must be at least 8 characters long and contain at least one special character');
        return;
      }


      await signup(data.username, data.email, data.password)
      .then((res) => {
        let user_id = res.user_id;
      
      const today = new Date();
      function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      
      const fridgeData = {// Set data to be sent with request when creating new fridge
        storedItems: {
          'Welcome pack':{
            'Expired hot sauce': addDays(today, -7),
            'White miso paste': addDays(today, 7)
          },
          'Vegetables':{ },
          'Fruit':{ },
          'Meat':{ },
          'Dairy':{ },
          'Misc':{ }
        },

        user_id : user_id

      };

    // Send post request with fridgeData body to create endpoint
    // And then on success navigate to fridge page passing on
    // User id details to get fridge on next page
    AxiosInstance.post('fridges/create/', fridgeData) // Send post request with fridgeData body to create endpoint

    AxiosInstance.post('users/login/', data)
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

    })} catch (error) {
      console.error('Error signing up:', error.message);
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

      <h1>Get your own Fridge Hero</h1>

      <form className='login-fields' onSubmit={handleSubmit(submission)}>
      
        <SimpleTextField
          label='Email'
          name='email'
          control={control}
          width={'30%'}
          >
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </SimpleTextField>

        <SimpleTextField
          label='Username'
          name='username'
          control={control}
          width={'30%'}
          >
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </SimpleTextField>

        <SimpleTextField
          label='Password'
          name='password'
          control={control}
          width={'30%'}
          >
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </SimpleTextField>

        <Button className='welcome-button' variant='contained' type='submit'>
          Submit
        </Button>
      </form>
      <div className="error-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    </div>
  </div>
  );
}

