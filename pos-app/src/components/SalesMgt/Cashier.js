import React, { useState, useEffect } from "react";
import "./Cashier.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUndo,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import PosCustomer from "./PosCustomer";

const Cashier = (props) => {
  const navigate = useNavigate();
  const [customerModal, setCustomerModal] = useState(false);
  const [contactNumber, setContactNumber] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (customerModal) {
      setContactNumber("");
    }
  }, [customerModal]);

  useEffect(() => {
    if (contactNumber) {
      Axios.get(
        `http://localhost:3001/cashier/api/getEmailAddress?contactNumber=${contactNumber}`
      )
        .then((response) => {
          const { email } = response.data;
          if (email) {
            setEmail(email);
            setTimeout(() => {
              alert(`Welcome ${response.data.name}!!`);
            }, 300);
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
        navigate(`/Checkout/${response.data.invoice_id}?email=${emailParam}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createRefund = () => {
    Axios.post("http://localhost:3001/invoice/api/createInvoice/", {})
      .then((response) => {
        const emailParam = email ? encodeURIComponent(email) : null;
        navigate(`/Refund/${response.data.invoice_id}?email=${emailParam}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleContactNumberSet = (contactNumber) => {
    setContactNumber(contactNumber);
    console.log(contactNumber);
    setCustomerModal(false);
  };

  return (
    <>
      <div className="cashier-container">
        <Header />
        <div style={{ marginLeft: "40px" }}>Cashier Interface</div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <button
            className="cashierbtn"
            onClick={createInvoice}
            style={{ marginRight: "10px", background: "#193882" }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ marginRight: "5px" }}
            />
            Checkout
          </button>
          <button
            className="cashierbtn"
            onClick={createRefund}
            style={{ marginLeft: "100px", background: "#2C4EA3" }}
          >
            <FontAwesomeIcon icon={faUndo} style={{ marginRight: "5px" }} />
            Refund
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <button
            className="cashierbtn"
            onClick={() => setCustomerModal(true)}
            style={{ marginRight: "10px", background: "#0E6EA9" }}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "15px" }} />
            POS Customer
          </button>
          <button
            className="cashierbtn"
            style={{ marginLeft: "100px", background: "#328CA9" }}
          >
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "5px" }} />
            Customers
          </button>
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
