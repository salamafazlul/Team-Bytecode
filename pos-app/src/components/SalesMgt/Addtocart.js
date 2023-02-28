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
  import KeyBoard from './KeyBoard';
  import { useNavigate } from 'react-router-dom';
import Header from './Header';
import IncrementDecrement from "./IncrementDecrement"


export const AddtoCart = () => {
    const navigate = useNavigate();

  return (
    <>

    <section className="section " >
     {/* Left cart */}
      <div className=' container-l ' >
        <MDBRow className='m-0 '>
            <div className="addContainer m-0 p-2 my-2" style={{ background:"rgba(128,128,128,0.7)", height:"100%",width:"50%" ,border:"solid gray",}} >
                <MDBRow style={{width:"100%"}} >
                    <MDBCol className='flex'>
                    <MDBInput
                            className="mb-2 mt-4"
                            placeholder="Code"
                        />
                    </MDBCol>
                        
                    <MDBCol>
                        <MDBInput
                            className="mb-2 mt-4"
                            placeholder="Name"
                            
                        />
                    </MDBCol>

                    <MDBCol>
                        <MDBInput
                            className="mb-2 mt-4"
                            placeholder="Qty"
                           
                        />
                    </MDBCol>

                    <MDBCol className="mb-2 mt-3" >
                    <div   className="button mt-2 pb-2 pt-2" onClick={()=> navigate('/') }>
                    ADD ITEM
                    </div>
                  </MDBCol>

                </MDBRow>
                <MDBRow >
                
                <MDBCol> 
        
                            {/* <div className="input-group-prepend">
                            <span className="input-group-text purple lighten-3" id="basic-text1">
                                <MDBIcon className="text-white" icon="search" />
                            </span>
                            </div> */}

                            {/* <MDBIcon className="text-white" icon="search" /> */}

                            <input
                            className="form-control py-1"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            />
                        
                </MDBCol>
                </MDBRow>

                <div style={{height:"200px", width:"100%"}}></div>

                <MDBRow>
                    <MDBCol className='mt-3 '>
                        <KeyBoard class='row'  className=""/>
                    </MDBCol>
                </MDBRow>

            </div>

            
        {/* Right Cart */}
    <div xl='5' className='flex mx-0 my-2 p-0 ' style={{width:"50%"}}>
        <MDBRow md="6" lg="5" className="p-2  justify-content-center  " style={{ marginLeft:"10px" ,background:"rgba(128,128,128,0.7)", height:"100%", width:"100%", border:"solid gray"}}>
          <MDBCol className='p-0 m-0'>
            <MDBCard >
              <MDBCardBody className="cart-body px-2 table-wrapper-scroll-y my-custom-scrollbar">
                {/* <MDBRow className="align-items-center">
                  <MDBCol md="2">
                    <p className=" mb-4 pb-2">orderId</p>
                    <p className=" text-muted  mb-0">1</p>
                    <p className=" text-muted  mb-0">2</p>
                  </MDBCol>
                  <MDBCol md="2" className="d-flex justify-content-center">
                    <div>
                      <MDBRow className=" mb-4 pb-2">Id</MDBRow>
                      <p className=" text-muted  mb-0">0215</p>
                      <p className=" text-muted  mb-0">0216</p>

                    </div>
                  </MDBCol>
                  <MDBCol md="2" className="d-flex justify-content-center">
                    <div>
                      <p className="text-muted mb-4 pb-2">Name</p>
                      <p className=" text-muted   mb-0">Munchee</p>
                      <p className=" text-muted   mb-0">Maliban</p>
                    </div>
                  </MDBCol>
                  <MDBCol md="2" className="d-flex justify-content-center">
                    <div>
                      <p className="mb-4 pb-2">Quantity</p>
                      <MDBInput className='border-none py-0' type="number" min="0" defaultValue={1} size="sm" />
                      <MDBInput className='' type="number" min="0" defaultValue={1} size="sm" />

                    </div>
                  </MDBCol>
        

                  <MDBCol md="2" className="d-flex justify-content-center">
                    <div>
                      <p className="mb-4 pb-2">Price</p>
                      <p className="text-muted  mb-0">400.00</p>
                      <p className="text-muted  mb-0">500.00</p>
                    </div>
                  </MDBCol>
                  <MDBCol md="2" className="d-flex justify-content-center">
                    <div>
                      <p className=" mb-4 pb-2">Total</p>
                      <p className=" text-muted mb-0">400.00</p>
                      <p className=" text-muted mb-0">1000.00</p>
                    </div>
                  </MDBCol>     

                </MDBRow>  */}
                <table className='table '>
                    <thead>
                        <tr>
                            <td>Order Id</td>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                     <tr>
                        <td>2</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                    {/* <tr>
                        <td>1</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>0215</td>
                        <td>Munchee</td>
                        <td>
                        <div className='flex-wrap w-2 h-2'><IncrementDecrement/></div></td>
                        <td>450</td>
                        <td>450</td>
                    </tr> */}
                    
                    
                    </tbody>
                </table>
              </MDBCardBody>

            </MDBCard>
            <div style={{height:"100%"}}></div>
            </MDBCol>
          
            <MDBCard className=' flex-end my-2 '>
              <div className='py-3'>
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">1400.00</span>
                  </p>
                </div>
              </div>
            </MDBCard>

            
            <div  className="d-flex justify-content-around align-items-baseline">
                <div   className="button" onClick={()=> navigate('/') }>
                    CANCEL
                </div>
                <div   className="button " onClick={()=> navigate('/') }>
                    CARD PAYMENT
                </div>
                <div   className="button" onClick={()=> navigate('/') }>
                    CASH PAYMENT
                </div>
            </div>
        
         </MDBRow>
    </div>

        </MDBRow>

      </div>
    </section>

    </>
  )
}
