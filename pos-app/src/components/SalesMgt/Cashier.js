import React, { useState, useEffect } from "react";
import "./Cashier.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import PosCustomer from "./PosCustomer";

const Cashier = (props) => {
  const navigate = useNavigate();
  const [customerModal, setCustomerModal] = useState(false);
  const [contactNumber, setContactNumber] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (customerModal) {
      setContactNumber(); // Reset the contact number state to an empty string when customerModal changes
    }
  }, [customerModal]);

  useEffect(() => {
    if (contactNumber) {
      // Make an API request to fetch the email address for the given contact number
      Axios.get(
        `http://localhost:3001/cashier/api/getEmailAddress?contactNumber=${contactNumber}`
      )
        .then((response) => {
          const { email } = response.data;
          if (email) {
            setEmail(email);
            alert(email)
          } else {
            alert("Customer is not registered");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [contactNumber]);
  
  
  const createInvoice = () => {
    Axios.post("http://localhost:3001/invoice/api/createInvoice/", {})
      .then((response) => {
        const emailParam = email ? encodeURIComponent(email) : null;
        navigate(`/Checkout/${response.data.invoice_id}?email=${emailParam}`); // Navigate to the Checkout page with the invoice ID and email
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createRefund = () => {
    Axios.post("http://localhost:3001/invoice/api/createInvoice/", {})
      .then((response) => {
        const emailParam = email ? encodeURIComponent(email) : null;
        navigate(`/Refund/${response.data.invoice_id}?email=${emailParam}`); // Navigate to the Refund page with the invoice ID and email
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleContactNumberSet = (contactNumber) => {
    setContactNumber(contactNumber); // Update the contact number state in Cashier component
    console.log(contactNumber); // Display the contact number in the console
    setCustomerModal(false); // Close the modal
  };

  return (
    <>
      <div className="cashier-container">
        <Header />
        <div style={{ marginLeft: "40px" }}>Cashier Name: Jeffry</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="cashierbtn"
            onClick={createInvoice}
            style={{ marginRight: "10px" }}
          >
            Checkout
          </button>
          <button className="cashierbtn" onClick={createRefund}>
            Refund
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="cashierbtn"
            onClick={() => setCustomerModal(true)}
            style={{ marginRight: "10px" }}
          >
            POS Customer
          </button>
          <button className="cashierbtn" style={{ marginRight: "10px" }}>
            Register Customer
          </button>
          <button className="cashierbtn">View Customers</button>
        </div>
      </div>
      <PosCustomer
        show={customerModal}
        onHide={() => setCustomerModal(false)}
        onContactNumberSet={handleContactNumberSet}
      />
    </>
  );
};

export default Cashier;
