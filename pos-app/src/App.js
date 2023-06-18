import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import { ReactDOM } from "react-dom";
import Checkout from "./components/SalesMgt/Checkout";
import Refund from "./components/SalesMgt/Refund";
import Cashier from "./components/SalesMgt/Cashier";
import DiscountComponent from "./components/Discount/Discount";
import ProductReport from "./components/ReportMgt/ProductReport";
import Dashboard from "./components/Dashboard/Dashboard";
import SalesReport from "./components/ReportMgt/SalesReport";

import Purchasing from "./components/ProductMgt/Pages/Purchasing";
import AddRemove from "./components/ProductMgt/Pages/ProducrCreateRemove";
import Category from "./components/ProductMgt/Pages/Category";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
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
          <Route path="Category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
