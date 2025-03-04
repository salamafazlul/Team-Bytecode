import React, { useState, useEffect } from "react";
import { MDBCard, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
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
import CashPayment from "./CashPayment";
import CardInvoice from "./CardInvoice";
import StripeCheckout from "react-stripe-checkout";

export const AddtoCart = ({ currentInvoice, email }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectCode, setSelectCode] = useState();
  const [selectName, setSelectName] = useState("Name");
  const [selectPrice, setSelectPrice] = useState();
  const [selectQuantity, setSelectQuantity] = useState();
  const [selectStock, setSelectStock] = useState();
  const [invoiceList, setInvoiceList] = useState([]);
  const [total, setTotal] = useState();
  const [netTotal, setNetTotal] = useState();
  const [discount, setDiscount] = useState(0); //bill discount value
  const [cashModal, setCashModal] = useState();
  const [cardInvoice, setCardInvoice] = useState();
  const [billDiscount, setBillDiscount] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/invoice/api/getProduct").then(
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
      `http://localhost:3001/invoice/api/getBillDiscount?invoice_id=${invoice_id}`
    ).then((response) => {
      setBillDiscount(response.data.rate);
      setDiscount((response.data.rate * total) / 100);
    });
  });

  useEffect(() => {
    const invoice_id = currentInvoice;
    Axios.get(
      `http://localhost:3001/invoice_product/api/getTotal?invoice_id=${invoice_id}`
    ).then((response) => {
      setTotal(response.data.total);
      setDiscount((response.data.total * billDiscount) / 100);
      setNetTotal(parseFloat((response.data.total - discount).toFixed(2)));
    });
  });

  const addToInvoice = () => {
    Axios.post("http://localhost:3001/invoice_product/api/addToInvoice/", {
      iid: currentInvoice,
      pid: selectCode,
      price: selectPrice,
      quantity: selectQuantity,
    });
  };

  const selectProduct = (pid, pname, price, stock) => {
    if (stock <= 0) {
      alert("There is no stock available.");
      return;
    }
    setSelectCode(pid);
    setSelectName(pname);
    setSelectPrice(price);
    setSelectQuantity(1);
    setSearchKey("");
    setSelectStock(stock);
  };

  const setSearchKey = (input) => {
    setSearch(input);
  };

  const cancelCheckout = () => {
    Axios.delete(
      `http://localhost:3001/invoice_product/api/deleteRecords/${currentInvoice}`
    )
      .then(() => {
        navigate("/Cashier"); // Navigate back to the cashier page
      })
      .catch((error) => {
        console.error(error);
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
    const qtyDiff = newQuantity - quantity; //1

    Axios.get(
      `http://localhost:3001/invoice_product/api/getStock?product_id=${product_id}`
    )
      .then((response) => {
        const stock = response.data.stock;
        if (stock <= 0 && qtyDiff > 0) {
          alert("Insufficient stock");
          return;
        }
        Axios.post(
          "http://localhost:3001/invoice_product/api/updateQuantity/",
          {
            product_id: product_id,
            invoice_id: invoice_id,
            quantity: newQuantity,
            amount: newAmount,
            oldQuantity: quantity,
          }
        );
      })
      .catch((error) => {
        console.log("Error fetching stock:", error);
      });
  };

  const removeProduct = (product_id, invoice_id) => {
    Axios.post(`http://localhost:3001/invoice_product/api/removeProduct/`, {
      invoice_id: invoice_id,
      product_id: product_id,
    });
  };

  //card payment
  const publishableKey =
    "pk_test_51NI5LaAclf538auUPHQcqQbCJFYQsWfDTH3fRJDTg2ZOTclWmPyMM7b67NKwrql9o8wiL5q65KnLQNJC5uFB2eNc003S3YyfsT";
  const tempPriceForStripe = parseInt(netTotal*100);
  const priceForStripe = parseInt(tempPriceForStripe);
  const payNow = async (token) => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/card_payment/payment",
        {
          amount: priceForStripe,
          token,
          invoice_id: currentInvoice,
        }
      );
      if (response.data.status === "success") {
        setCardInvoice(true);
      } else {
        alert("Card Payment Failed");
      }
    } catch (error) {
      console.log(error);
    }
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
                    onChange={(e) => setSelectPrice(e.target.value)}
                  />
                </MDBCol>

                <MDBCol>
                  <MDBInput
                    className={`mb-2 mt-4 ml-3`}
                    placeholder="Qty"
                    type="number"
                    defaultValue="1"
                    min={1}
                    value={selectQuantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (selectStock - newQuantity !== -1) {
                        setSelectQuantity(newQuantity);
                      } else {
                        alert("No Stock");
                      }
                    }}
                    onKeyPress={(e) => e.preventDefault()} // Prevent any key inputs
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
                          <th>Stock</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList
                          .filter((product) => {
                            const searchValue = search.toLowerCase();
                            const productId = product.product_id
                              .toString()
                              .toLowerCase();
                            const productName =
                              product.product_name.toLowerCase();

                            return (
                              searchValue === "" ||
                              productId.includes(searchValue) ||
                              productName.includes(searchValue)
                            );
                          })
                          .map((product) => (
                            <tr class="trcashier" key={product.product_id}>
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
                                      product.selling_price,
                                      product.stock
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
                      class="theadcashier"
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      <tr class="trcashier">
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
                              onKeyPress={(e) => e.preventDefault()} // Prevent any key inputs
                              min={1}
                            ></input>
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
                      <span style={{ marginRight: "5px" }}>
                        Discount: <b>{billDiscount}%</b>
                      </span>

                      {/* <MDBInput
                        className="discount_btn"
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
                      /> */}
                      <span style={{ textAlign: "right" }}>
                        {parseFloat(discount.toFixed(2))}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Net amount:</span>
                      <span>{netTotal}</span>
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
                    <div class="stripe_btn">
                      <StripeCheckout
                        stripeKey={publishableKey}
                        label="CARD"
                        currency="LKR"
                        name="Pay With Card"
                        amount={priceForStripe}
                        description={`Your total is Rs${priceForStripe/100}`}
                        token={payNow}
                        style={{
                          width: "80px",
                          height: "35px",
                        }}
                      />
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <button class="end_btn" onClick={cancelCheckout}>
                      Cancel
                    </button>
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
        invoice_id={currentInvoice}
        email={email}
      />
      <CardInvoice
        show={cardInvoice}
        onHide={() => setCardInvoice(false)}
        invoice_id={currentInvoice}
        email={email}
        text="Card Payment"
      />
    </>
  );
};
