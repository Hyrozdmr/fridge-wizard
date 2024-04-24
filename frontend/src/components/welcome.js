// file: frontend/src/components/welcome.js
import React from 'react';
import { Button } from '@mui/material';

// Welcome page elements to be conditionally rendered on landing page
// importing login click functionality
export default function Welcome({ onSignUpClick, onLogInClick, }) {

  return (
    <div>
      <h1>Welcome</h1>

        <Button
          variant='contained'
          type='submit'
          sx={{width: '100%'}}
          onClick={(onSignUpClick)}> 
            Sign up
        </Button>

        <Button
          variant='contained'
          type='submit'
          sx={{width: '100%'}}
          onClick={(onLogInClick)}> 
            Log in
        </Button>

    </div>
  );
}