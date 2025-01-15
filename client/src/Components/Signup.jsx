import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/signup", formData);
      if (result.status === 201) {
        console.log("User created successfully");
        navigate("/login"); // Redirect to the login page
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        window.alert("Email already exists. Please use a different email.");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Signup</h2>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter name..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <button className="form-button" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
  