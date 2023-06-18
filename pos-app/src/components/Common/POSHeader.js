import "./pos_header_style.css"
import { MDBIcon } from "mdbreact";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const POSHeader = (props) => {
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
        <div className='pos-header-button'>
        {props?.ImmediateRequestAlert ? <div onClick={() => {props.showImmediateRequestAlert()}} className="immediate-request-alert-count">{props?.ImmediateRequestAlert ? props?.ImmediateRequestAlert: ""}</div>: null}
          
        <MDBIcon far icon="user-circle" />
        </div>
        </OverlayTrigger>
      );
    
  return (
    <div className='pos-header'>
        <div className='left'>
            <div className='pos-header-title'> BY TECH POS SYSTEM</div>            
            <div className='pos-header-sub-title'> {props?.title ? props.title.toUpperCase() : 'No Title'  }</div>            
        </div>
            <UserProfile className="userprfl"/>

    </div>
  )

}

export default POSHeader