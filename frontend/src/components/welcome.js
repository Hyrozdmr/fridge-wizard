// file: frontend/src/components/welcome.js
import React from 'react';
import './styles.css';

// Welcome page elements to be conditionally rendered on landing page
// importing login click functionality
export default function Welcome({ onSignUpClick, onLogInClick, }) {

  return (
    <div className='welcome-container'>
      <h2>Become a</h2>
      <h1>Fridge Hero</h1>
      <h2>today</h2>

      <button
        onClick={(onSignUpClick)}> 
          Sign up
      </button>

      <button
        onClick={(onLogInClick)}> 
          Log in
      </button>
    </div>
  );
}