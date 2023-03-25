import React from "react";
import "./Checkout.css";
import Header from "./Header";
import { AddtoCart } from "./Addtocart";
import { SideArrowL } from "./SideArrow";
import { SideArrowR } from "./SideArrow";
import { SectionRefund } from "./SectionRefund";

const Refund = () => {
  return (
    <div className="checkout">
      <Header />

      <div class="mainGlass">
        <SideArrowL goto="../Checkout" />
        <SectionRefund />
        <SideArrowR goto="../Checkout" />
      </div>
    </div>
  );
};

export default Refund;
