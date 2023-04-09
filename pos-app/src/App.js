import React,{ useState} from "react";
import './App.css';
import Login from './components/UserMgt/Login';
import { ReactDOM } from "react-dom";
import { Log } from './components/UserMgt/Log';
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import Discount from "./components/Discount/Discount";


function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/KeyBoard" element={<KeyBoard/>} />
        <Route path="/Checkout" element={<Checkout/>} />
        <Route path="/Discount" element={<Discount/>} />
       
      </Routes>
    
    </BrowserRouter>

  </>

  );
}

export default App