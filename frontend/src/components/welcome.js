// file: frontend/src/components/welcome.js
import React from 'react';
import { Button } from '@mui/material';
import FridgeImage from '../assets/Fridge-closed.jpg'
import './styles.css';

// Welcome page elements to be conditionally rendered on landing page
// importing login click functionality
export default function Welcome({ onSignUpClick, onLogInClick, }) {

  return (
    <div className='container'>
      <div className='image-container'>
        <img src={FridgeImage} alt="Fridge" />
      </div>
      <div className='welcome-container'>
        <h1>Welcome to Fridge Hero</h1>

        <Button className='welcome-button'
          variant='contained'
          onClick={(onSignUpClick)}> 
            Sign up
        </Button>

        <Button className='welcome-button'
          variant='contained'
          onClick={(onLogInClick)}> 
            Log in
        </Button>
      </div>
    </div>
  );
}