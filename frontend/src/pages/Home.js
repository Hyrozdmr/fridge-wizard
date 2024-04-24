// file: frontend/src/pages/Home.js
import Welcome from '../components/welcome';
import LogIn from '../components/logIn';
import { useState } from 'react';

// Home page conditionally renders welcome, login or signup elements
export default function Home() {

  // Set state for the home page to handle which elements will render
  const [ homePage, setHomePage ] = useState('welcome')

    // Handle login button click
  const handleLoginClick = () => {
    setHomePage('login');
  };

  return (
    <div>
      {
      // If homePage state = 'welcome' render the welcome info only
      homePage === 'welcome' ? 
      <Welcome 
        onLoginClick={handleLoginClick}/> : 
      // If homePage state = 'logIn' render the logIn info
      <LogIn /> 
      }
    </div>
  )
}