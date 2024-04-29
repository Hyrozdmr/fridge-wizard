import AxiosInstance from '../components/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from '../components/itemsList';
import FridgeImage from '../assets/FridgeImg2.png';
import '../styles.css';

export default function Fridge() {
  const location = useLocation();
  const userId = location.state && location.state.user_id;
  const [currentFridgeContents, setCurrentFridgeContent] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const categories = [
    {label: '🥕 Vegetables', value: 'Vegetables'},
    {label: '🍖 Meat', value: 'Meat'},
    {label: '🍎 Fruit', value: 'Fruit'},
    {label: '🧀 Dairy', value: 'Dairy'},
    {label: '🥫 Miscellaneous', value: 'Misc'}
  ];

  useEffect(() => {
    if (userId) {
      getFridgeData(userId);
    }
  }, [userId]);

  function navigateToRoot() {
    navigate('/');
  };

  // Logic for getting fridge data goes here
  function getFridgeData(data) {
    // Send get request with userData body to get endpoint
    AxiosInstance.get('fridges/get/', {params: {user_id: userId}})
        .then(response => {
          // Handle successful response
          setCurrentFridgeContent(response.data);
        })
        .catch((error) => {
          // Handle error if POST request fails
          console.error('Error:', error);
        });
  }

  function toggleForm() {
    setShowForm(!showForm);
    if (!showForm && items.length === 0) {
      addItem(); // Add first empty item automatically
    }
  }

  function handleItemChange(index, field, value) {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  }

  function addItem() {
    const newItem = {name: '', category: '', expiry_date: ''};
    setItems([...items, newItem]);
  }

  function addItemToFridge() {
    for (const item of items) {
      if (!item.name || !item.category || item.category === "" || !item.expiry_date) {
        alert("Please fill all fields for all items before adding.");
        return;
      }
      item.expiry_date = new Date(item.expiry_date).toISOString().slice(0, 11) + "00:00:00Z";
    }

    AxiosInstance.patch(`fridges/${currentFridgeContents.fridge_data._id}/add-items/`, {items})
        .then(response => {
          setItems([]);
          setShowForm(false);
          getFridgeData(userId);
        })
        .catch(error => {
          console.error('Error adding items:', error);
        });
  }

  return (
      <div className='fridge-view-container'>
        <div className='open-fridge-image-container'>
          <button onClick={navigateToRoot}>
            <h1>FH</h1>
          </button>
          <div className='open-fridge-image'>
            <img src={FridgeImage} alt="Fridge"/>
          </div>
        </div>
        <div className='item-list'>
          <h1>{showForm ? 'Add Items' : "What's inside?"}</h1>
          {!showForm && <ItemList returnedFridgeData={currentFridgeContents}/>}
          {!showForm && <button onClick={toggleForm} className="fridge-form-button">Add Items</button>}

          {showForm && (
              <>
                {items.map((item, index) => (
                    <div key={index} className="item-input-container">
                      <div className="item-input-group">
                        <select value={item.category} onChange={e => handleItemChange(index, 'category', e.target.value)}>
                          <option value="">Choose Category...</option>
                          {categories.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                          ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={e => handleItemChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="date"
                            value={item.expiry_date}
                            onChange={e => handleItemChange(index, 'expiry_date', e.target.value)}
                        />
                      </div>
                      {index === items.length - 1 &&
                          <button onClick={addItem} className="add-more-items-button">+</button>}
                    </div>
                ))}
                <button onClick={() => {
                  addItemToFridge();
                  toggleForm();
                }} className="fridge-form-button">Submit All Items
                </button>
                <button onClick={toggleForm} className="fridge-form-button">Cancel</button>
              </>
          )}
        </div>
      </div>
  );
}
