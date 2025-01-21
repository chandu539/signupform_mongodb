import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import Media from './Media';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (savedUser) {
      setUserInfo(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      setUserInfo(response.data);

      // Save user info in localStorage for persistence
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo'); // Clear user info on logout
  };

  return (
    <div className="login-container">
      {!userInfo ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="form-button" type="submit">Login</button>
        </form>
      ) : (
        <div className="welcome-message">
          <h2>Welcome, {userInfo.name}!</h2>
          <p>Email: {userInfo.email}</p>
          <Media/>
          <button className="form-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
