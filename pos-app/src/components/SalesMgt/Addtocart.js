import React, { useState, useEffect } from "react";
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
import "./Checkout.css";
import { MDBIcon } from "mdbreact";
import KeyBoard from "./KeyBoard";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Overlay from "react-bootstrap/esm/Overlay";
import Axios from "axios";

export const AddtoCart = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState();
  const [productList, setProductList] = useState([]);
  const [selectCode, setSelectCode] = useState();
  const [selectName, setSelectName] = useState("Name");
  const [selectPrice, setSelectPrice] = useState();
  const [selectQuantity,setSelectQuantity] =useState()
  const [invoiceList, setInvoiceList] = useState([]);
  const [total,setTotal] =useState()

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getProduct").then((response) => {
      setProductList(response.data);
    });
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getInvoiceList").then((response) => {
      setInvoiceList(response.data);
    });
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getTotal").then((response) => {
      setTotal(response.amount);
    });
  });
  const selectProduct = (pid, pname, price,) => {
    setSelectCode(pid);
    setSelectName(pname);
    setSelectPrice(price);
    setSelectQuantity(1)
  };
 
  const addToInvoice = () => {
    Axios.post(`http://localhost:3001/api/addToInvoice/`, {
      pid: selectCode,
      pname: selectName,
      price: selectPrice,
      quantity : selectQuantity
    });
  };

  const submitAmount = () => {
    Axios.post("http://localhost:3001/api/insert", {
      amount: amount,
    });
  };
  return (
    <>
      <section className="section ">
        {/* Left cart */}
        <div className=" container-l ">
          <MDBRow className="m-0 ">
            <div
              className="addContainer m-0 p-2 my-2"
              style={{
                background: "rgba(128,128,128,0.7)",
                height: "100%",
                width: "50%",
                border: "solid gray",
              }}
            >
              <MDBRow style={{ width: "100%" }}>
                <MDBCol className="flex col-md-2">
                  <MDBInput
                    className="mb-2 mt-4 ml-3 "
                    placeholder="Code"
                    value={selectCode}
                  />
                </MDBCol>

                <MDBCol className="col-md-3">
                  <MDBInput
                    className="mb-2 mt-4 ml-3 "
                    placeholder="Name"
                    value={selectName}
                  />
                </MDBCol>

                <MDBCol>
                  <MDBInput
                    className="mb-2 mt-4 ml-3"
                    placeholder="Price"
                    type="text"
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

                <MDBCol className="mb-2 mt-3 ">
                  <div className="button mt-2 pb-2 pt-2" onClick={addToInvoice}>
                    ADD ITEM
                  </div>
                </MDBCol>
              </MDBRow>

              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  color: "white",
                }}
              >
                <Container>
                  <Form style={{ paddingBottom: "10px" }}>
                    <InputGroup>
                      <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                      />
                    </InputGroup>
                  </Form>
                  <div
                    className="table-wrapper-scroll-y border"
                    style={{ width: "100%", height: "500px" }}
                  >
                    <Table
                      hover
                      className="my-custom-scrollbar"
                      style={{ width: "100%", color: "white" }}
                    >
                      <thead style={{ position: "sticky" }}>
                        <tr style={{ lineHeight: "0.5" }}>
                          <th>Product Code</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList
                          .filter((product) => {
                            return search.toLowerCase() === ""
                              ? product
                              : product.pname
                                  .toLowerCase()
                                  .includes(search.toLocaleLowerCase());
                          })
                          .map((product) => (
                            <tr key={product.pid} style={{ lineHeight: "0.5" }}>
                              <td>{product.pid}</td>
                              <td>{product.pname}</td>
                              <td>{product.price}</td>
                              <td>{product.stock}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    selectProduct(
                                      product.pid,
                                      product.pname,
                                      product.price,
                                      
                                    );
                                  }}
                                  style={{
                                    height: "15px",
                                    fontSize: "10px",
                                    backgroundColor: "#4483ad",
                                    color: "white",
                                    border: "none",
                                    boxShadow: "1px 2px rgba(0,0,0,0.5)",
                                    borderRadius: "2px",
                                  }}
                                >
                                  ADD
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </Container>
              </div>

              <MDBRow>
                <MDBCol className="mt-3 ">
                  <KeyBoard className="row"  />
                </MDBCol>
              </MDBRow>
            </div>

            {/* Right Cart */}
            <div
              xl="5"
              className="flex mx-0 my-2 p-0 "
              style={{ width: "50%" }}
            >
              <MDBRow
                md="6"
                lg="5"
                className="p-2  justify-content-center  "
                style={{
                  marginLeft: "10px",
                  background: "rgba(128,128,128,0.7)",
                  height: "100%",
                  width: "100%",
                  border: "solid gray",
                }}
              >
                <MDBCol className="p-0 m-0">
                  <MDBCard>
                    <div
                      className="table-wrapper-scroll-y border"
                      style={{ width: "100%", minHeight: "300px" }}
                    >
                      <Table
                        hover
                        className="my-custom-scrollbar"
                        style={{ width: "100%", color: "black" }}
                      >
                        <thead>
                          <tr style={{ lineHeight: "0.5" }}>
                            <th style={{ width: "10px" }}>Code</th>
                            <th>Name</th>
                            <th>Discount</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceList.map((product) => (
                            <tr style={{ lineHeight: "0.5" }}>
                              <td>{product.product_id}</td>
                              <td>{product.name}</td>
                              <td>0.00</td>
                              <td>{product.price}</td>
                              <td>{product.quantity}</td>
                              <td>{product.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </MDBCard>
                  <div style={{ height: "100%" }}></div>
                </MDBCol>

                <MDBCard className=" flex-end my-2 ">
                  {/* <div className="py-3">
                    <div className="float-end">
                      <label>Order Total</label>
                      <input
                        type="text"
                        name="amount"
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      /> */}
                  <p className="mb-0 me-5 d-flex align-items-center">
                    Order total:
                    {total}
                  </p>
                  {/* </div> */}
                  {/* </div> */}
                </MDBCard>
                <MDBRow style={{ width: "80%" }}>
                  <MDBCol className="mb-2 mt-3 ">
                    <div
                      className="button mt-2 pb-2 pt-2"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </div>
                  </MDBCol>
                  <MDBCol className="mb-2 mt-3 ">
                    <div
                      className="button mt-2 pb-2 pt-2"
                      onClick={submitAmount}
                    >
                      Cash
                    </div>
                  </MDBCol>
                  <MDBCol className="mb-2 mt-3 ">
                    <div
                      className="button mt-2 pb-2 pt-2"
                      // onClick={() => navigate("/")}
                    >
                      Card
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBRow>
            </div>
          </MDBRow>
        </div>
      </section>
    </>
  );
};
