import React,{ useState} from "react";
import './App.css';
import axios from "axios";
import { useEffect } from "react";
import styled from 'styled-components';
import Login from './components/UserMgt/Login';
import { ReactDOM } from "react-dom";
import { Log } from './components/UserMgt/Log';
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes,Route, Switch } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import Dashboard from "./components/Dashboard/Dashboard";
import SalesReport from "./components/ReportMgt/SalesReport";

function App() {  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/KeyBoard" element={<KeyBoard/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/SalesReport" element={<SalesReport/>} />
      </Routes>
    
    </BrowserRouter>

  );
}

export default App;