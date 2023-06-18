import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import { ReactDOM } from "react-dom";
import { Log } from './components/UserMgt/Log';
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import Purchasing from "./components/ProductMgt/Pages/Purchasing";
import AddRemove from "./components/ProductMgt/Pages/ProducrCreateRemove";
import axios from "axios";
import { useEffect } from "react";
import Category from "./components/ProductMgt/Pages/Category";
import Refund from "./components/SalesMgt/Refund";
import Cashier from "./components/SalesMgt/Cashier";
import DiscountComponent from "./components/Discount/Discount";
import ProductReport from "./components/ReportMgt/ProductReport";
import Dashboard from "./components/Dashboard/Dashboard";
import SalesReport from "./components/ReportMgt/SalesReport";


function App() {
  useEffect(() => {
    axios.get("http://localhost:3001/category").then((response) => {
      console.log(response.data);
    }); 
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Checkout/:invoiceId" element={<Checkout />} />
          <Route path="/Refund/:invoiceId" element={<Refund />} />
          <Route path="/Cashier" element={<Cashier />} />
          <Route path="/pdiscount" element={<DiscountComponent />} />
          <Route path="/pdeport" element={<ProductReport />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SalesReport" element={<SalesReport />} />

          <Route path="Purchasing" element={<Purchasing />} />
          <Route path="AddRemove" element={<AddRemove />} />
          <Route path="Category" element={<Category/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

