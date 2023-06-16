import React, { useState, useEffect } from "react";
import { MDBCard, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import "./Checkout.css";
import "./Addtocart.css";
import "./KeyBoard.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import Keyboard from "react-simple-keyboard";
import { useNavigate } from "react-router-dom";
import CashPayment from "./CashPayment";

export const SectionRefund = ({ currentInvoice, email }) => {
  console.log(currentInvoice);
  console.log(email);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectCode, setSelectCode] = useState();
  const [selectName, setSelectName] = useState();
  const [selectPrice, setSelectPrice] = useState();
  const [selectAmount, setSelectAmount] = useState();
  const [selectQuantity, setSelectQuantity] = useState();
  const [selectDiscount, setSelectDiscount] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [refundList, setRefundList] = useState([]);
  const [total, setTotal] = useState();
  const [discount, setDiscount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [cashModal, setCashModal] = useState();

  useEffect(() => {
    const invoice_id = currentInvoice;
    Axios.get(
      `http://localhost:3001/invoice_product/api/getTotal?invoice_id=${invoice_id}`
    ).then((response) => {
      setTotal(response.data.total);
    });
  }); // Add dependency array
  
  useEffect(() => {
    const invoice_id = currentInvoice;
    Axios.get(
      `http://localhost:3001/invoice_product/api/getInvoiceList?invoice_id=${invoice_id}`
    ).then((response) => {
      setRefundList(response.data);
    });
  }); // Add dependency array
  

  const getInvoice = (invoiceKey) => {
    clearTimeout(timeoutId); // Clear previous timeout if any
    const invoice_id = invoiceKey;
    const timeout = setTimeout(() => {
      Axios.get(
        `http://localhost:3001/invoice/api/getInvoiceDetail?invoice_id=${invoice_id}&currentInvoice=${currentInvoice}` //currentInvoice.currentInvoice
      ).then((response) => {
        if (response.data.status === 400) {
          alert("A refund already made for the same invoice");
        } else {
          const invoiceDate = new Date(response.data.date);
          const currentDate = new Date();
          const diffInMilliseconds = Math.abs(currentDate - invoiceDate);
          const diffInDays = Math.floor(
            diffInMilliseconds / (1000 * 60 * 60 * 24)
          );
          // Check if the sale was made within the last 7 days
          if (diffInDays <= 7) {
            setInvoiceDetail(response.data);
            setDiscount(response.data.discount);
            Axios.get(
              `http://localhost:3001/invoice/api/getInvoice?invoice_id=${invoice_id}`
            )
              .then((response) => {
                setInvoiceList(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("Sale in not made within 7 days. Refund not allowed");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }, 1000); // Delay the execution of the Axios request by 1 second

    setTimeoutId(timeout); // Save the timeout ID for later use
  };

  const selectProduct = (pid, pname, price, dis, quantity, amount) => {
    setSelectCode(pid);
    setSelectName(pname);
    setSelectPrice(price);
    setSelectQuantity(quantity);
    setSelectDiscount(dis);
    setSelectAmount(amount);
    setSearchKey("");
  };

  const setSearchKey = (input) => {
    setSearch(input);
  };

  const addToInvoice = () => {
    Axios.post("http://localhost:3001/invoice_product/api/addToRefund/", {
      iid: currentInvoice,
      pid: selectCode,
      price: selectPrice,
      quantity: selectQuantity,
      discount: selectDiscount,
      amount: selectAmount,
    });
  };

  const updateQuantity = (
    e,
    product_id,
    invoice_id,
    price,
    discount,
    quantity
  ) => {
    const newQuantity = e.target.value;
    const newAmount = (price * newQuantity * (100 - discount)) / 100;
    Axios.post(
      "http://localhost:3001/invoice_product/api/updateRefundQuantity/",
      {
        product_id: product_id,
        invoice_id: invoice_id,
        quantity: newQuantity,
        amount: newAmount,
        oldQuantity: quantity,
      }
    );
  };
  const cancelRefund = () => {
    Axios.delete(
      `http://localhost:3001/invoice_product/api/deleteRefundRecords/${currentInvoice}`
    )
      .then(() => {
        navigate("/Cashier"); // Navigate back to the cashier page
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const removeProduct = (product_id, invoice_id) => {
    Axios.post(
      `http://localhost:3001/invoice_product/api/removeRefundProduct/`,
      {
        invoice_id: invoice_id,
        product_id: product_id,
      }
    );
  };

  return (
    <>
      <section className="section">
        <div class="addtocart">
          <MDBCol></MDBCol>
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
                    // onChange={(e) => setSelectPrice(e.target.value)}
                  />
                </MDBCol>

                <MDBCol>
                  <MDBInput
                    className="mb-2 mt-4 ml-3"
                    placeholder="Qty"
                    type="number"
                    // defaultValue="1"
                    value={selectQuantity}
                    // onChange={(e) => setSelectQuantity(e.target.value)}
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
                        onChange={(e) => getInvoice(e.target.value)}
                        placeholder="Enter Invoice ID"
                        style={{ flex: "1", marginRight: "10px" }}
                      />
                      <Form.Control
                        value={search}
                        placeholder="Search Product"
                        onChange={(e) => setSearchKey(e.target.value)}
                        style={{ flex: "3" }}
                      />
                    </InputGroup>
                  </Form>
                  <div
                    className="table-wrapper-scroll-y border"
                    style={{ width: "100%", minHeight: "250px" }}
                  >
                    <Table hover style={{ color: "white" }}>
                      <thead
                      class="theadcashier"
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      >
                        <tr class="trcashier">
                          <th>Code</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>quantity</th>
                          <th>discount</th>
                          <th>amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody style={{ height: "250px" }}>
                        {invoiceList
                          .filter((product) => {
                            const searchValue = search.toLowerCase();
                            const productId = product.product_id
                              .toString()
                              .toLowerCase();
                            const productName =
                              product.Product.product_name.toLowerCase();

                            return (
                              searchValue === "" ||
                              productId.includes(searchValue) ||
                              productName.includes(searchValue)
                            );
                          })
                          .map((product) => (
                            <tr class="trcashier" key={product.product_id}>
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
                                      product.discount,
                                      product.quantity,
                                      product.amount
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
                        padding: "13px",
                      }}
                    >
                      <table>
                        <tr class="trcashier">
                          <div
                            style={{ alignItems: "center", display: "flex" }}
                          >
                            <td
                              style={{ marginLeft: "40px", fontWeight: "bold" }}
                            >
                              Gross Amount:
                            </td>
                            <td style={{ marginLeft: "2px" }}>
                              {invoiceDetail?.total}
                            </td>
                            <td
                              style={{ marginLeft: "40px", fontWeight: "bold" }}
                            >
                              Bill Discount:
                            </td>
                            <td style={{ marginLeft: "2px" }}> {discount} %</td>
                            <td
                              style={{ marginLeft: "40px", fontWeight: "bold" }}
                            >
                              Net Amount:
                            </td>
                            <td style={{ marginLeft: "2px" }}>
                              {invoiceDetail?.total -
                                (invoiceDetail?.total * discount) / 100}
                            </td>
                          </div>
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
                    <thead class="theadcashier"
                      style={{
                        position: "sticky",
                        top: 0,
                        color: "white",
                      }}
                    >
                      <tr class="trcashier">
                        <th style={{ width: "10px" }}>Code</th>
                        <th>Name</th>
                        <th>Discount%</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "white" }}>
                      {refundList.map((product) => (
                        <tr class="trcashier" style={{ lineHeight: "0.5" }}>
                          <td>{product.product_id}</td>
                          <td>{product.product_name}</td>
                          <td>{product.discount}</td>
                          <td>{product.price}</td>
                          <td>
                            <input
                              type="number"
                              value={product.quantity}
                              style={{
                                width: "40px",
                                padding: "3px",
                                margin: "-10px 0px -10px 0px",
                                color: "black",
                              }}
                              onChange={(e) =>
                                updateQuantity(
                                  e,
                                  product.product_id,
                                  product.invoice_id,
                                  product.price,
                                  product.discount,
                                  product.quantity
                                )
                              }
                              onKeyDown={(e) => {
                                if (
                                  e.key === "e" ||
                                  e.key === "-" ||
                                  e.key === "+" ||
                                  e.key === "." ||
                                  e.key === "E"
                                ) {
                                  e.preventDefault(); // Prevent "e", "-", "+", ".", "E" key inputs
                                }
                              }}
                              onKeyPress={(e) => e.preventDefault()} // Prevent any key inputs
                              min={1}
                              max={
                                invoiceList.find(
                                  (item) =>
                                    item.product_id === product.product_id
                                )?.quantity
                              } // Set the max value dynamically based on the quantity in the invoice list
                            />
                          </td>

                          <td>{product.amount}</td>
                          <td>
                            <button
                              class="dlt_btn"
                              onClick={() => {
                                removeProduct(
                                  product.product_id,
                                  product.invoice_id
                                );
                              }}
                            >
                              X
                            </button>
                          </td>
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
                      <span style={{ textAlign: "right" }}>
                        {(total * discount) / 100}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Net amount:</span>
                      <span>
                        {parseFloat(
                          (total - (total * discount) / 100).toFixed(2)
                        )}
                      </span>
                    </div>
                  </div>
                </MDBCard>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <MDBRow>
                    <MDBCol>
                      <button
                        class="end_btn"
                        onClick={() => setCashModal(true)}
                      >
                        Cash
                      </button>
                    </MDBCol>
                    <MDBCol>
                      <button class="end_btn" onClick={cancelRefund}>
                        Cancel
                      </button>
                    </MDBCol>
                  </MDBRow>
                </div>
              </div>
            </div>
          </MDBRow>
        </div>
      </section>
      <CashPayment
        show={cashModal}
        amount={parseFloat((total - (total * discount) / 100).toFixed(2))}
        onHide={() => setCashModal(false)}
        invoice_id={currentInvoice}
        email={email}
      />
    </>
  );
};
