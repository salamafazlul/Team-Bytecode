import React from 'react'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";
  import './Checkout.css';
  import { MDBIcon } from "mdbreact";

  import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { AddtoCart } from './Addtocart';
import { SideArrowL } from './SideArrow';
import { SideArrowR } from './SideArrow';


const Checkout = () => {

  return (
    <div className="checkout">
    <Header/>

    <div class="mainGlass" >

      <SideArrowL/>
      <AddtoCart />
      <SideArrowR/>

    </div>
    </div>
  )
}

export default Checkout