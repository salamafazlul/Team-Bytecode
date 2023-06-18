import React from 'react'
import "./Checkout.css"
import { MDBIcon } from "mdbreact";
import { useNavigate } from "react-router-dom";

export const SideArrowL = (props) => {
  const navigate = useNavigate();
  return (
    <div className='navigate_left' onClick={()=> navigate(props.goto) }>
        <MDBIcon fas icon="chevron-left"/>
    </div>
  )
}

export const SideArrowR = (props) => {
  const navigate = useNavigate();
    return (
      <div className='navigate_right' onClick={()=> navigate(props.goto) }>
        <MDBIcon fas icon="chevron-right"/>
      </div>
    )
  }
