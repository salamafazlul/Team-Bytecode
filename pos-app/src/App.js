import React,{ useState} from "react";
import './App.css';
import axios from "axios";
import { useEffect } from "react";
import styled from 'styled-components';
import Login from './components/UserMgt/Login';
import { ReactDOM } from "react-dom";
import Checkout from "./components/SalesMgt/Checkout";
import Refund from "./components/SalesMgt/Refund"
import Cashier from "./components/SalesMgt/Cashier";
import { BrowserRouter, Routes,Route } from "react-router-dom";


function App() {  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Checkout/:invoiceId" element={<Checkout />} /> 
        <Route path="/Refund/:invoiceId" element={<Refund />} />
        <Route path="/Cashier" element={<Cashier/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;