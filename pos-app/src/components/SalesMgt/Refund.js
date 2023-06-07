import React from "react";
import "./Checkout.css";
import Header from "./Header";
import { SectionRefund } from "./SectionRefund";
import { useParams } from "react-router-dom"; // Import useParams to access the invoiceId from the route parameter

const Refund = () => {
  const { invoiceId } = useParams(); // Access the invoiceId from the route parameter
  return (
    <div className="checkout">
      <Header />

      <div class="mainGlass">
        <div></div>
        <SectionRefund currentInvoice={invoiceId}/>
        <div></div>
      </div>
    </div>
  );
};

export default Refund;
