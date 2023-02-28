import React from 'react'
import Logo from "../images/logo.png"
import "./Header.css"
import { MDBIcon } from "mdbreact";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const Header = () => {

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">
          <MDBIcon far icon="user-circle" className='mr-2'/>
            <span>Salama Fazlul</span>
         </Popover.Header>
          <Popover.Body >
            <span>Change Password</span>
            <br/>
            <span>Logout</span>
          </Popover.Body>
        </Popover>
      );
      
      const UserProfile = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <div className='button'>
        <MDBIcon far icon="user-circle" />
        </div>
        </OverlayTrigger>
      );
    
  return (
    <div className='header'>
        <div className='left'>
            <img src={Logo} alt="logo" className='logo'></img>
            <h1 className='mx-4 font-weight-bold'> BY TECH POS SYSTEM</h1>            
        </div>
            <UserProfile className="userprfl"/>

    </div>
  )
}

export default Header