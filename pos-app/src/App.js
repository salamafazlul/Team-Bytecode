import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Mainpage from "./components/Page/Mainpage";
import Category from "./components/Page/Category";
import AddRemove from "./components/Page/AddRemove";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Mainpage />} />
            <Route path="addorremove" element={<AddRemove />} />
            <Route path="category" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
