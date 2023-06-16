import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import { ReactDOM } from "react-dom";
import Checkout from "./components/SalesMgt/Checkout";
import Refund from "./components/SalesMgt/Refund";
import Cashier from "./components/SalesMgt/Cashier";
import DiscountComponent from "./components/Discount/Discount"
import ProductReport from "./components/ReportMgt/ProductReport"
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
