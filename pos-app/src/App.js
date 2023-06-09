import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes, Route, Switch, Link } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import AddUsers from "./components/UserMgt/AddUsers";
// import ViewUsers from "./components/UserMgt/ViewUsers";
import Table from "./components/UserMgt/Table";
import Customer from "./components/UserMgt/Customer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/KeyBoard" element={<KeyBoard />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/AddUsers" element={<AddUsers />} />
          {/* <Route path="/ViewUsers" element={<ViewUsers />} /> */}
          <Route path="/Customer" element={<Customer />} />
          <Route path="/ViewUsers" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
