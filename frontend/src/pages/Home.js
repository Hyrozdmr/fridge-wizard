// file: frontend/src/pages/Home.js
import Welcome from '../components/welcome';
import LogIn from '../components/logIn';
import SignUp from '../components/signUp';
import { useState } from 'react';

// Home page conditionally renders welcome, login or signup elements
export default function Home() {

  // Set state for the home page to handle which elements will render
  const [ homePage, setHomePage ] = useState('welcome')

  // Handle sign up button click
  const handleSignUpClick = () => {
    setHomePage('signUp');
  };

    // Handle log in button click
  const handleLogInClick = () => {
    setHomePage('logIn');
  };

  // Handle log in button click
  const handleBackClick = () => {
    setHomePage('welcome');
  };

  let componentToRender = 'welcome';

  if (homePage === 'signUp') {
    componentToRender = 
      <SignUp 
        onBackClick={handleBackClick}
      />;
  } else if (homePage === 'logIn') {
    componentToRender = 
      <LogIn 
        onBackClick={handleBackClick}
      />;
  } else {
    componentToRender = 
      <Welcome 
        onLogInClick={handleLogInClick}
        onSignUpClick={handleSignUpClick}
      />
  }
  
  return componentToRender;
}