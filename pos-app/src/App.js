import React,{ useState} from "react";
import './App.css';
import Login from './components/UserMgt/Login';
import { ReactDOM } from "react-dom";
import Checkout from "./components/SalesMgt/Checkout";
import Refund from "./components/SalesMgt/Refund"
import { BrowserRouter, Routes,Route } from "react-router-dom";


function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Checkout" element={<Checkout/>} />
        <Route path="/Refund" element={<Refund/>} />
      </Routes>
    </BrowserRouter>

  </>
  );
}

export default App