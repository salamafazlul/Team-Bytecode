import React from "react";
import "./Checkout.css";
import Header from "./Header";
import { AddtoCart } from "./Addtocart";
import { useParams } from "react-router-dom"; // Import useParams to access the invoiceId from the route parameter

const Checkout = () => {
  const { invoiceId } = useParams(); // Access the invoiceId from the route parameter

  return (
    <div className="checkout">
      <Header />

      <div className="mainGlass">
        <div></div>
        <AddtoCart currentInvoice={invoiceId} /> {/* Pass the invoiceId as a prop */}
        <div></div>
      </div>
    </div>
  );
};

export default Checkout;
