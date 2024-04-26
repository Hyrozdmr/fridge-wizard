export const signup = async (username, email, password) => {
  const requestData = {
    username: username,
    email: email,
    password: password
  };

  console.log("function called");

  const BACKEND_URL = 'http://localhost:8000/users/signup/';

  
  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  };

  const response = await fetch(BACKEND_URL, requestOptions);

  if (!response.ok) {
    const data = await response.json(); // Parse response JSON
    throw new Error(data.message); // Throw an Error object with the message from the response
  }

  const data = await response.json();
  return data;
};


// export const signup = async (username, email, password) => {
//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('email', email);
//     formData.append('password', password);

//     console.log("function called");

//     var BACKEND_URL = 'http://127.0.0.1:8000'
//     const requestOptions = {
//       method: "POST",
//       body: formData,
//     };
  
//     const response = await fetch(`${BACKEND_URL}/users/signup/`, requestOptions);
  
//     if (!response.ok) {
//       const data = await response.json(); // Parse response JSON
//       throw new Error(data.message); // Throw an Error object with the message from the response
//     }
  
//     const data = await response.json();
//     return data.token;
//   };