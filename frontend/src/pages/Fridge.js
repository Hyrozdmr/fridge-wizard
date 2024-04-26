import AxiosInstance from '../components/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from '../components/itemsList';
import FridgeImage from '../assets/Fridge-open.jpg';

export default function Fridge() {
  const location = useLocation();
  const userId = location.state && location.state.user_id;
  const [currentFridgeContents, setCurrentFridgeContent] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const categories = [
    { label: '🥕 Vegetables', value: 'vegetables' },
    { label: '🍖 Meat', value: 'meat' },
    { label: '🍎 Fruits', value: 'fruits' },
    { label: '🧀 Dairy', value: 'dairy' },
    { label: '🥫 Miscellaneous', value: 'canned_goods' }
  ];

  useEffect(() => {
    if (userId) {
      getFridgeData(userId);
    }
  }, [userId]);

  function getFridgeData(userId) {
    AxiosInstance.get('fridges/get/', { params: { user_id: userId } })
        .then(response => {
          console.log('Data:', response.data);
          setCurrentFridgeContent(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }

  function addItemToFridge() {
    AxiosInstance.patch(`fridges/${userId}/add-items/`, {
      items: [{
        name: itemName,
        category: itemCategory,
        expiry_date: expiryDate
      }]
    }).then(response => {
      console.log('Item added:', response.data);
      // Optionally clear the form here and refresh fridge data
      setItemName('');
      setItemCategory('');
      setExpiryDate('');
      getFridgeData(userId);
    }).catch(error => {
      console.error('Error adding item:', error);
    });
  }

  return (
      <div style={{display: 'flex', flexDirection: 'row', padding: '4em'}}>
        <div style={{paddingRight: '8em'}}>
          <ItemList returnedFridgeData={currentFridgeContents} />
          <button onClick={() => getFridgeData(userId)}>
            Refresh fridge
          </button>
          <div>
            <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
              {categories.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
              ))}
            </select>
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />
            <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
            />
            <button onClick={addItemToFridge}>Add Item</button>
          </div>
        </div>
        <div>
          <p>User id: {userId}</p>
          <img src={FridgeImage} alt="Fridge" />
        </div>
      </div>
  );
}
