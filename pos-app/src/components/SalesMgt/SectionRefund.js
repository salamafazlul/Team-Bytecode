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

export const SectionRefund = (currentInvoice) => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectCode, setSelectCode] = useState();
  const [selectName, setSelectName] = useState();
  const [selectPrice, setSelectPrice] = useState();
  const [selectQuantity, setSelectQuantity] = useState();
  const [selectDiscount, setSelectDiscount] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const [refundList, setRefundList] = useState([]);
  const [total, setTotal] = useState();
  const [discount, setDiscount] = useState(0);
  const [invoiceKey, setInvoiceKey] = useState();

  useEffect(() => {
    const invoice_id = currentInvoice;
    Axios.get(
      `http://localhost:3001/invoice_product/api/getInvoiceList?invoice_id=${invoice_id}`
    ).then((response) => {
      setRefundList(response.data);
    });
  });
  
  useEffect(() => {
    const invoice_id = invoiceKey;
    Axios.get(
      `http://localhost:3001/invoice/api/getInvoice?invoice_id=${invoice_id}`
    ).then((response) => {
      setInvoiceList(response.data);
    });
  }, [invoiceKey]);

  const selectProduct = (pid, pname, price,dis) => {
    setSelectCode(pid);
    setSelectName(pname);
    setSelectPrice(price);
    setSelectQuantity(1);
    setDiscount(dis);
    setSearchKey("");
  };

  const setSearchKey = (input) => {
    setSearch(input);
  };

  const addToInvoice = () => {
    Axios.post("http://localhost:3001/invoice_product/api/addToInvoice/", {
      iid: currentInvoice.currentInvoice,
      pid: selectCode,
      price: selectPrice,
      quantity: selectQuantity,
      discount: selectDiscount,
    });
  };

  const updateQuantity = (e, product_id, invoice_id, price, discount) =>{
    const newQuantity = e.target.value;
    const newAmount = price * newQuantity * (100 - discount) / 100;
    Axios.post('http://localhost:3001/invoice_product/api/updateQuantity/', {
      product_id: product_id,
      invoice_id: invoice_id,
      quantity: newQuantity,
      amount: newAmount
    })
  }
  

  return (
    <>
      <section className="section">
        <div class="addtocart">
          <MDBCol>
            
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
                  <button class="select_btn" onClick={addToInvoice} >
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
                        onChange={(e) => setSearchKey(e.target.value)}
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
                              : product.Product.product_name
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
                                  onClick={() => {
                                    selectProduct(
                                      product.product_id,
                                      product.Product.product_name,
                                      product.price,
                                      product.discount
                                    );
                                  }}
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
                    onChange={(input) => setSearchKey(input)}
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
                        <th>Discount%</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                    {refundList.map((product) => (
                        <tr style={{ lineHeight: "0.5" }}>
                          <td>{product.product_id}</td>
                          <td>{product.product_name}</td>
                          <td>{product.discount}</td>
                          <td>{product.price}</td>
                          <td>
                            <input
                              type="number"
                              value={product.quantity}
                              style={{width:"40px",padding:"3px", margin:"-10px 0px -10px 0px"}}
                              onChange={(e) => updateQuantity(e, product.product_id, product.invoice_id,product.price,product.discount)}
                              min={0}
                              ></input>
                          </td>
                          <td>{product.amount}</td>
                        </tr>
                      ))}
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
