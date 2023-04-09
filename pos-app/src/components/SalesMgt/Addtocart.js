import React, { useState, useEffect } from "react";
import { MDBCard, MDBCol, MDBInput, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import "./Checkout.css";
import "./Addtocart.css";
import "./KeyBoard.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import Keyboard from "react-simple-keyboard";
import CardPayment from "./CardPayment";
import CashPayment from "./CashPayment";

export const AddtoCart = () => {
  const navigate = useNavigate();
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
  const [cardModal, setCardModal] = useState();
  const [cashModal, setCashModal] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/product/api/getProduct").then(
      (response) => {
        setProductList(response.data);
      }
    );
  });

  useEffect(() => {
    const invoice_id = currentInvoice;
    Axios.get(
      `http://localhost:3001/invoice_product/api/getInvoiceList?invoice_id=${invoice_id}`
    ).then((response) => {
      setInvoiceList(response.data);
    });
  });

  useEffect(() => {
    const invoice_id = currentInvoice;
    Axios.get(
      `http://localhost:3001/invoice_product/api/getTotal?invoice_id=${invoice_id}`
    ).then((response) => {
      setTotal(response.data.total);
    });
  });

  const addToInvoice = () => {
    Axios.post("http://localhost:3001/invoice_product/api/addToInvoice/", {
      iid: currentInvoice,
      pid: selectCode,
      price: selectPrice,
      quantity: selectQuantity,
      discount: selectDiscount,
    });
  };

  const getDiscount = (discount) => {
    Axios.post("http://localhost:3001/invoice/api/setTotalDiscount/", {
      discount: discount,
      invoice_id: currentInvoice,
    })
      .then((response) => {
        const totalDiscountValue = parseFloat(response.data.totalDiscountValue);
        setDiscount(totalDiscountValue);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createInvoice = () => {
    setSelectCode("");
    setSelectName("");
    setSelectPrice("");
    setDiscount(0);
    Axios.post("http://localhost:3001/invoice/api/createInvoice/", {})
      .then((response) => {
        setCurrentInvoice(response.data.invoice_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectProduct = (pid, pname, price) => {
    setSelectCode(pid);
    setSelectName(pname);
    setSelectPrice(price);
    setSelectQuantity(1);
    setSearchKey("");
  };

  const setSearchKey = (input) => {
    setSearch(input);
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
            <button
              class="select_btn"
              onClick={createInvoice}
              style={{ marginLeft: "-15px", width: "130px" }}
            >
              Start Checkout
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
                  <button class="select_btn" onClick={addToInvoice}>
                    Add Item
                  </button>
                </MDBCol>
              </MDBRow>

              <div class="search">
                <Container>
                  <Form style={{ paddingBottom: "10px" }}>
                    <InputGroup>
                      <Form.Control
                        value={search}
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Search"
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
                          <th>Stock</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList
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
                              <td>{product.product_name}</td>
                              <td>{product.selling_price}</td>
                              <td>{product.stock}</td>
                              <td>
                                <button
                                  class="atc_btn"
                                  onClick={() => {
                                    selectProduct(
                                      product.product_id,
                                      product.product_name,
                                      product.selling_price
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
                  </div>
                </Container>
              </div>

              <MDBRow>
                <MDBCol className="mt-3 p-3">
                  <Keyboard
                    className="row"
                    onChange={(input) => setSearchKey(input)}
                  />{" "}
                </MDBCol>
              </MDBRow>
            </div>

            {/* Right Cart */}
            <div class="rightside">
              <div class="rightcontainer">
                <div
                  className="table-wrapper-scroll-y my-custom-scrollbar border"
                  style={{ minHeight: "350px", background: "white" }}
                >
                  <Table hover>
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      <tr>
                        <th style={{ width: "10px" }}>Code</th>
                        <th>Name</th>
                        <th style={{ width: "15px" }}>Discount(%)</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceList.map((product) => (
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
                      <span>{total}</span>
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
                          marginLeft: "-220px",
                        }}
                        type="number"
                        min={0}
                        max={100}
                        defaultValue="0"
                        onChange={(e) => {
                          getDiscount(e.target.value);
                        }}
                      />
                      <span style={{ textAlign: "right" }}>{discount}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Net amount:</span>
                      <span>{parseFloat((total - discount).toFixed(2))}</span>
                    </div>
                  </div>
                </MDBCard>

                <MDBRow>
                  <MDBCol>
                    <button class="end_btn" onClick={() => setCashModal(true)}>
                      CASH
                    </button>
                  </MDBCol>
                  <MDBCol>
                    <button class="end_btn" onClick={() => setCardModal(true)}>
                      CARD
                    </button>
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
      <CashPayment
        show={cashModal}
        amount={parseFloat((total - discount).toFixed(2))}
        onHide={() => setCashModal(false)}
        invoice_id = {currentInvoice}
      />
      <CardPayment show={cardModal} onHide={() => setCardModal(false)} />
    </>
  );
};
