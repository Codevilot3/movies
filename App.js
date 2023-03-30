import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    // Make API call with username and password
    const apiKey = `https://api.themoviedb.org/3/movie/550?api_key=bcc703647d81ec7788b8fc5ca4141c59`;
    const apiUrl = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`;
    axios
      .post(apiUrl, {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data;
        // Handle successful login response
        if (data.success) {
          // Save access token and refresh token
          const accessToken = data.access_token;
          const refreshToken = data.refresh_token;
          // Route to home page
          toast.success('Login successful!');
          return;
        }
        // Handle unsuccessful login response
        toast.error('Invalid username or password');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="full">
      <div className="half">
        <div className="heading">
          <p className="title">Sign In</p>
          <p className="texts">Sign in to your self-service portal</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="USERNAME"
            className="input1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="input2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="input3" value="LOGIN" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
