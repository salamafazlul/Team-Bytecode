import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import { ReactDOM } from "react-dom";
import { Log } from "./components/UserMgt/Log";
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import Purchasing from "./components/ProductMgt/Pages/Purchasing";
import AddRemove from "./components/ProductMgt/Pages/ProducrCreateRemove";
import axios from "axios";
import { useEffect } from "react";
import Category from "./components/ProductMgt/Pages/Category";

function App() {
  useEffect(() => {
    axios.get("http://localhost:3001/category").then((response) => {
      console.log(response.data);
    }); 
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/KeyBoard" element={<KeyBoard />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="Purchasing" element={<Purchasing />} />
          <Route path="AddRemove" element={<AddRemove />} />
          <Route path="Category" element={<Category/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
