import React, { useState, useEffect } from "react";
import { MDBCard, MDBCol, MDBInput, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import "./Checkout.css";
import "./Addtocart.css";
import "./KeyBoard.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import Keyboard from "react-simple-keyboard";

export const SectionRefund = () => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectCode, setSelectCode] = useState();
  const [selectName, setSelectName] = useState("Name");
  const [selectPrice, setSelectPrice] = useState();
  const [selectQuantity, setSelectQuantity] = useState();
  const [selectDiscount, setSelectDiscount] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const [total, setTotal] = useState();
  const [discount, setDiscount] = useState(0);
  const [currentInvoice, setCurrentInvoice] = useState();
  const [invoiceKey, setInvoiceKey] = useState();


  useEffect(() => {
    const invoice_id = invoiceKey;
    Axios.get(
      `http://localhost:3001/invoice/api/getInvoice?invoice_id=${invoice_id}`
    ).then((response) => {
      setInvoiceList(response.data);
    });
  }, [invoiceKey]);

  return (
    <>
      <section className="section">
        <div class="addtocart">
          <MDBCol>
            <button
              class="select_btn"
              
              style={{ marginLeft: "-15px", width: "130px" }}
            >
              Start Refund
            </button>
          </MDBCol>
          <MDBRow className="m-0">
            <div className="addContainer" class="leftcontainer">
              {/* selected product area */}
              <MDBRow style={{ width: "100%" }}>
                <MDBCol className="flex col-md-2">
                  <MDBInput
                    className="mt-4 ml-3"
                    placeholder="Code"
                    value={selectCode}
                  />
                </MDBCol>

                <MDBCol className="col-md-3">
                  <MDBInput
                    className="mb-2 mt-4 ml-3"
                    placeholder="Name"
                    value={selectName}
                  />
                </MDBCol>

                <MDBCol>
                  <MDBInput
                    className="mb-2 mt-4 ml-3"
                    placeholder="Price"
                    type="number"
                    value={selectPrice}
                    onChange={(e) => setSelectPrice(e.target.value)}
                  />
                </MDBCol>

                <MDBCol>
                  <MDBInput
                    className="mb-2 mt-4 ml-3"
                    placeholder="Qty"
                    type="number"
                    defaultValue="1"
                    value={selectQuantity}
                    onChange={(e) => setSelectQuantity(e.target.value)}
                  />
                </MDBCol>

                <MDBCol>
                  <button class="select_btn" >
                    Add Item
                  </button>
                </MDBCol>
              </MDBRow>

              <div class="search">
                <Container>
                  <Form style={{ paddingBottom: "10px" }}>
                    <InputGroup>
                      <Form.Control
                        value={invoiceKey}
                        onChange={(e) => setInvoiceKey(e.target.value)}
                        placeholder="Enter Invoice ID"
                        style={{ flex: '1', marginRight: '10px' }}
                      />
                      <Form.Control
                        value={search}
                        placeholder="Search Product"
                        style={{ flex: '3' }}
                      />
                    </InputGroup>
                  </Form>
                  <div
                    className="table-wrapper-scroll-y border"
                    style={{ width: "100%", minHeight: "250px" }}
                  >
                    <Table hover style={{ color: "white" }}>
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      >
                        <tr>
                          <th>Code</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>quantity</th>
                          <th>discount</th>
                          <th>amount</th>
                        <th></th>
                        </tr>
                      </thead>
                      <tbody style={{height:"250px"}}>
                        {invoiceList
                          .filter((product) => {
                            return search.toLowerCase() === ""
                              ? product
                              : product.product_name
                                  .toLowerCase()
                                  .includes(search.toLocaleLowerCase());
                          })
                          .map((product) => (
                            <tr key={product.product_id}>
                              <td>{product.product_id}</td>
                              <td>{product.Product.product_name}</td>
                              <td>{product.price}</td>
                              <td>{product.quantity}</td>
                              <td>{product.discount}</td>
                              <td>{product.amount}</td>
                              <td>
                                <button
                                  class="atc_btn"
                                >
                                  ADD
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <div
                      style={{
                        position: "sticky",
                        bottom: 0,
                        backgroundColor: "white",
                        color: "black",
                        width: "100%",
                        height: "30px",
                        padding:"13px"
                      }}
                    >
                    <table>
                        <tr>
                            <td> Gross Amount</td>{}    
                        </tr>
                    </table>
                    </div>
                  </div>
                </Container>
              </div>

              <MDBRow>
                <MDBCol className="mt-3 p-3">
                  <Keyboard
                    className="row"
                  />
                </MDBCol>
              </MDBRow>
            </div>

            {/* Right Cart */}
            <div class="rightside">
              <div class="rightcontainer">
                <div
                  className="table-wrapper-scroll-y my-custom-scrollbar border"
                  style={{ minHeight: "350px", color: "white" }}
                >
                  <Table hover>
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        color: "white",
                      }}
                    >
                      <tr>
                        <th style={{ width: "10px" }}>Code</th>
                        <th>Name</th>
                        <th>Discount</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                     {}
                    </tbody>
                  </Table>
                </div>

                <MDBCard className=" flex-end my-3 p-3  ">
                  <div class="net_amount">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Total (Rs):</span>
                      <span>{}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Discount(%):</span>
                      <MDBInput
                        style={{
                          height: "25px",
                          width: "65px",
                          marginLeft: "-240px",
                        }}
                        type="number"
                        min={0}
                        max={100}
                        defaultValue="0"
                      />
                      <span style={{ textAlign: "right" }}>{}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Net amount:</span>
                      <span></span>
                    </div>
                  </div>
                </MDBCard>

                <MDBRow>
                  <MDBCol>
                    <button class="end_btn">CASH</button>
                  </MDBCol>
                  <MDBCol>
                    <button class="end_btn">Cancel</button>
                  </MDBCol>
                </MDBRow>
              </div>
            </div>
          </MDBRow>
        </div>
      </section>
    </>
  );
};
