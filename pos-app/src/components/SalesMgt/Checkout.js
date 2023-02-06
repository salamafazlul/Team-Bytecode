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

const Checkout = () => {

  const navigate = useNavigate();
  return (
    <section class="section" className="vh-100" style={{ backgroundColor: "#fdccb0" }}>
      
      

      <MDBContainer className="h-100" >
        
        <MDBRow>
            <MDBCol md="6" lg="4" xl="6" style={{ background:"rgba(128,128,128,0.7)", height:"580px", marginTop :"20px", marginBottom :"20px", border:"solid gray",}} >
                <MDBRow  >
                    <MDBCol >
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

                    <MDBCol className=" mt-4" >
                          <MDBBtn >
                        <div className=" d-flex justify-content-between"  >
                        <span>Add Item</span>
                        
                        </div>
                    </MDBBtn>
                  </MDBCol>

                </MDBRow>
                <MDBRow >
                
                <MDBCol className='mb-2 mt-2' md="6" lg="4" xl="9"> 
        
                            {/* <div className="input-group-prepend">
                            <span className="input-group-text purple lighten-3" id="basic-text1">
                                <MDBIcon className="text-white" icon="search" />
                            </span>
                            </div> */}

                            <MDBIcon className="text-white" icon="search" />

                            <input
                            className="form-control my-0 py-1"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            />
                        
                </MDBCol>
                </MDBRow>

                <div style={{height:"200px"}}></div>

                <MDBRow className='align-bottom'>
                    <MDBCol className='mt-3 align-bottom' md="6" lg="4" xl="12" >
                        <KeyBoard class='row'  className=""/>
                    </MDBCol>
                </MDBRow>

            </MDBCol>

            
        
    <MDBCol >
        <MDBRow md="6" className="justify-content-center align-items-center " style={{ marginLeft:"10px",paddingLeft:"10px",paddingRight:"10px"   ,background:"rgba(128,128,128,0.7)", height:"580px", marginTop :"20px", marginBottom :"20px", paddingTop :"20px",border:"solid gray"}}>
          <MDBCol style={{ height:"340px"}}>
            <MDBCard className="mt-">
              <MDBCardBody className="px-4 ">
                <MDBRow className="align-items-center">
                  <MDBCol md="2">
                    <p className=" mb-4 pb-2">orderId</p>
                    <p className=" text-muted  mb-0">1</p>
                    <p className=" text-muted  mb-0">2</p>
                  </MDBCol>
                  <MDBCol md="2" className="d-flex justify-content-center">
                    <div>
                      <p className=" mb-4 pb-2">Id</p>
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

                  

                </MDBRow>
                
              </MDBCardBody>
            </MDBCard>
            <div style={{height:"100px"}}></div>
            </MDBCol>
          
    
            <MDBCard className="mb-4 ">
              <MDBCardBody className="p-4">
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">1400.00</span>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>

            <div  className="mb-4  d-flex justify-content-end ">
              <MDBBtn color="light"  className="me-2" onClick={()=> navigate('/') }>
                cancel
              </MDBBtn>
                <MDBBtn  className='mx-2'>Card payment</MDBBtn>
                <MDBBtn   className='mx-2' >Cash Payment</MDBBtn>
            </div>
        
         </MDBRow>
        </MDBCol>

        </MDBRow>

      </MDBContainer>
    </section>
  )
}

export default Checkout