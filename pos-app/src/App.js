import React from "react";
import "./App.css";
import SideNavi from "./components/sidebar/SideNavi";
import Form from "./components/Purchersingform/Form";
import Headingsec from "./components/Heading/Headingsec";
import Rform from "./components/Returnform/Rform";
import Removeform from "./components/Remove/Removeform";
import Footerbar from "./components/footer/Footerbar";

function App() {
  return (
    <div className="App">
      <SideNavi />
      <div>
        <Headingsec />
        <Form />
        <Rform />
        <Removeform />
        <Footerbar />
      </div>
    </div>
  );
}

export default App;
