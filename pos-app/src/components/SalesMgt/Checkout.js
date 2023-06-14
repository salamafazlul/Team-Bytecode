import React from "react";
import "./Checkout.css";
import Header from "./Header";
import { AddtoCart } from "./Addtocart";
import { useParams, useLocation } from "react-router-dom"; // Import useParams and useLocation to access the route parameters and query parameters

const Checkout = () => {
  const { invoiceId } = useParams(); // Access the invoiceId from the route parameter
  const location = useLocation(); // Access the location object to extract the query parameters
  const emailParam = new URLSearchParams(location.search).get("email"); // Extract the email parameter from the query string
  
  return (
    <div className="checkout">
      <Header />

      <div className="mainGlass">
        <div></div>
        <AddtoCart currentInvoice={invoiceId} email={emailParam} /> {/* Pass the invoiceId and emailParam as props */}
        <div></div>
      </div>
    </div>
  );
};

export default Checkout;
