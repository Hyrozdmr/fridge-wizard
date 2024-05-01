import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editField, setEditField] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.user_id);

      fetch(`http://127.0.0.1:8000/users/get-user/?user_id=${decodedToken.user_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.user_data) {
          setUserData(data.user_data);
          setUsername(data.user_data.username);
          setEmail(data.user_data.email);
        } else {
          console.error('User data not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('Token not found');
    }
  }, []);
  function navigateToRoot() {
    navigate('/');
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleCancelEdit = () => {
    setEditField('');
  };

  const handleSave = (field) => {
    const token = localStorage.getItem('token');
    const requestBody = { user_id: userId };
    switch (field) {
      case 'username':
        requestBody.username = username;
        break;
      case 'email':
        requestBody.email = email;
        break;
      case 'password':
        requestBody.password = password;
        break;
      default:
        break;
    }

    fetch('http://127.0.0.1:8000/user_profile/update_profile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle success or error response
      if (data.message) {
        // Update the user data after saving
        setUserData(prevUserData => ({
          ...prevUserData,
          [field]: requestBody[field]
        }));
        setEditField(''); // Reset edit field after saving
      }
    })
    .catch(error => {
      console.error(`Error updating ${field}:`, error);
    });
  };

  return (
    <div className="profile-container">
      <div className='back-button'>
        <button onClick={navigateToRoot}>
          <ArrowBackIosNewIcon /><h1>FH</h1>
          </button>
          </div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <div className="user-details">
            <div>
              <label>Username:</label>
              {editField === 'username' ? (
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              ) : (
                <p>{userData.username}</p>
              )}
              {editField === 'username' ? (
                <div>
                  <button onClick={() => handleSave('username')}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleEdit('username')}>Edit</button>
              )}
            </div>
            <div>
              <label>Email:</label>
              {editField === 'email' ? (
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              ) : (
                <p>{userData.email}</p>
              )}
              {editField === 'email' ? (
                <div>
                  <button onClick={() => handleSave('email')}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleEdit('email')}>Edit</button>
              )}
            </div>
            <div>
              <label>Password:</label>
              {editField === 'password' ? (
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              ) : (
                <p>********</p>
              )}
              {editField === 'password' ? (
                <div>
                  <button onClick={() => handleSave('password')}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleEdit('password')}>Edit</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
