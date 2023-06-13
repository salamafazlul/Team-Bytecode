import React, { useState, useEffect } from "react";
import "./Cashier.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import PosCustomer from "./PosCustomer";

const Cashier = (props) => {
  const navigate = useNavigate();
  const [currentInvoice, setCurrentInvoice] = useState("");
  const [customerModal, setCustomerModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (customerModal) {
      setEmail(""); // Reset the email state to an empty string when customerModal changes
    }
  }, [customerModal]);

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

  const createRefund = () => {
    Axios.post("http://localhost:3001/invoice/api/createInvoice/", {})
      .then((response) => {
        setCurrentInvoice(response.data.invoice_id);
        navigate(`/Refund/${response.data.invoice_id}`); // Navigate to the Refund page with the invoice ID
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailSet = (email) => {
    setEmail(email); // Update the email state in Cashier component
    console.log(email); // Display the email in the console
    setCustomerModal(false); // Close the modal
  };

  return (
    <>
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

          <button className="cashierbtn" onClick={() => setCustomerModal(true)}>
            Customer
          </button>
        </div>
      </div>
      <PosCustomer
        show={customerModal}
        onHide={() => setCustomerModal(false)}
        onEmailSet={handleEmailSet}
      />
    </>
  );
};

export default Cashier;
