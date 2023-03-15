import React from 'react'
import "./Checkout.css"
import { MDBIcon } from "mdbreact";


export const SideArrowL = () => {
  return (
    <div className='navigate_left'>
        <MDBIcon fas icon="chevron-left"/>
    </div>
  )
}

export const SideArrowR = () => {
    return (
      <div className='navigate_right'>
        <MDBIcon fas icon="chevron-right"/>
      </div>
    )
  }
