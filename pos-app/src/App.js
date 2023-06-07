import React,{ useState} from "react";
import './App.css';
import Login from './components/UserMgt/Login';
import { ReactDOM } from "react-dom";
import Checkout from "./components/SalesMgt/Checkout";
import Refund from "./components/SalesMgt/Refund"
import Cashier from "./components/SalesMgt/Cashier";
import { BrowserRouter, Routes,Route } from "react-router-dom";


function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Checkout/:invoiceId" element={<Checkout />} /> {/* Ensure the element prop is set to the Checkout component */}
        <Route path="/Refund" element={<Refund/>} />
        <Route path="/Cashier" element={<Cashier/>} />
      </Routes>
    </BrowserRouter>

  </>
  );
}

export default App