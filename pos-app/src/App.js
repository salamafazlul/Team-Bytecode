import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import { ReactDOM } from "react-dom";
import { Log } from "./components/UserMgt/Log";
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes, Route, Switch, Link } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import AddUsers from "./components/UserMgt/AddUsers";
import EditUser from "./components/UserMgt/EditUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/KeyBoard" element={<KeyBoard />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/AddUsers" element={<AddUsers />} />
          <Route path="/EditUser/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
