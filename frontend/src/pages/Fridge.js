import AxiosInstance from '../components/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from '../components/itemsList';
import FridgeImage from '../assets/Fridge-open.jpg'

export default function Fridge() {
  const location = useLocation();
  const userId = location.state && location.state.user_id;
  const [ currentFridgeContents, setCurrentFridgeContent ] = useState(userId);
  console.log('Printed on fridge page:', userId);

  useEffect(() => {
    if (userId) {
      getFridgeData(userId);
    }
  }, [userId]);

  // Logic for getting fridge data goes here
  function getFridgeData(data) {
    // Send get request with userData body to get endpoint
    AxiosInstance.get( 'fridges/get/', { params: { user_id: userId  } })
    .then(response => {
      // Handle successful response
      console.log('Data:', response.data);
      setCurrentFridgeContent(response.data);
    })
    .catch((error) => {
      // Handle error if POST request fails
      console.error('Error:', error);
  });

    // Log user creation success
    console.log('Requesting fridge data for user ', userId);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', padding: '4em'}}>

      <div style={{paddingRight: '8em'}}>
        <ItemList 
          returnedFridgeData={currentFridgeContents}
        />
        <button onClick={() => getFridgeData(userId)}>
          Refresh fridge
        </button>
      </div>

      <div>
        <p>User id: {userId}</p>
        <img src={FridgeImage} alt="Fridge" />
      </div>
    </div>
  )
}