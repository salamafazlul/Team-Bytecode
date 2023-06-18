import React from "react";
import "./Checkout.css";
import Header from "./Header";
import { SectionRefund } from "./SectionRefund";
import { useParams, useLocation } from "react-router-dom"; // Import useParams and useLocation to access the route parameters and query parameters

const Refund = () => {
  const { invoiceId } = useParams(); // Access the invoiceId from the route parameter
  const location = useLocation(); // Access the location object to extract the query parameters
  const emailParam = new URLSearchParams(location.search).get("email"); // Extract the email parameter from the query string

  return (
    <div className="checkout">
      <Header />

      <div class="mainGlass">
        <div></div>
        <SectionRefund currentInvoice={invoiceId} email={emailParam} />
        <div></div>
      </div>
    </div>
  );
};

export default Refund;
