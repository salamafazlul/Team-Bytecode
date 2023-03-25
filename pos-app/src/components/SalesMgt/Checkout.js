import React from "react";
import "./Checkout.css";
import Header from "./Header";
import { AddtoCart } from "./Addtocart";
import { SideArrowL } from "./SideArrow";
import { SideArrowR } from "./SideArrow";

const Checkout = () => {
  return (
    <div className="checkout">
      <Header />

      <div class="mainGlass">
        <SideArrowL goto="../Refund" />
        <AddtoCart />
        <SideArrowR goto="../Refund" />
      </div>
    </div>
  );
};

export default Checkout;
