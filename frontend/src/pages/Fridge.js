import AxiosInstance from '../components/axios';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ItemList from '../components/itemsList';
import FridgeImage from '../assets/Fridge-open.jpg'

export default function Fridge() {
  const location = useLocation();
  const userId = location.state && location.state.user_id;
  const [ currentFridgeContents, setCurrentFridgeContent ] = useState(userId);
  console.log('Printed on fridge page:', userId);

  // Logic for getting fridge data goes here
  function getFridgeData(data) {
    // Set data (user_id) to be sent with request when getting fridge
    const userData = {
      user_id : userId
    };

    // Log user creation success
    console.log('Requesting fridge data for user ', userId);

    // Send get request with userData body to get endpoint
    // And then on success navigate set fridge item contents
    AxiosInstance.get( 'fridges/get/', { params: userData })
      .then(response => {
        // Handle successful response
        console.log('Data:', response.data);
      })
      .catch((error) => {
        // Handle error if POST request fails
        console.error('Error:', error);
    });
  }

  return (
    <div>
      <p>{userId}</p>
      <img src={FridgeImage} alt="Fridge" />
      <ItemList 
        userId={userId}
      />
      <button onClick={getFridgeData}>
        Refresh fridge
      </button>
    </div>
  )
}