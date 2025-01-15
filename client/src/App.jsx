import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar"; // Import the Navbar component

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/*<Route path="/" element={<Navbar />} />*/}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
