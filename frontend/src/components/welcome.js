// file: frontend/src/components/welcome.js
import React from 'react';
import { Button } from '@mui/material';

// Welcome page elements to be conditionally rendered on landing page
// importing login click functionality
export default function Welcome({ onLoginClick }) {

  // Logic for submitting the form goes here
  function submission() {
      // Logic change home page state
    }

  return (
    <div>
      <h1>Welcome</h1>

        <Button
        variant='contained'
        type='submit'
        sx={{width: '100%'}}
        onClick={(onLoginClick)}> 
          Log in
        </Button>

    </div>
  );
}