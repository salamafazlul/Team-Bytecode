import React, { useState } from "react";
import "./Cashier.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Checkout from "./Checkout";

const Cashier = () => {
  const navigate = useNavigate();
  const [currentInvoice, setCurrentInvoice] = useState("");

  const createInvoice = () => {
    Axios.post("http://localhost:3001/invoice/api/createInvoice/", {})
      .then((response) => {
        setCurrentInvoice(response.data.invoice_id);
        navigate(`/Checkout/${response.data.invoice_id}`); // Navigate to the Checkout page with the invoice ID
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createRefund =()=>{
    
  }

  return (
    <div className="cashier-container">
      <Header />
      <div style={{ marginLeft: "40px" }}>Cashier Name: Jeffry</div>
      <div className="centered-content">
        <button className="cashierbtn" onClick={createInvoice}>
          Checkout
        </button>
        <button className="cashierbtn" onClick={createRefund}>
          Refund
        </button>
      </div>
    </div>
  );
};

export default Cashier;
