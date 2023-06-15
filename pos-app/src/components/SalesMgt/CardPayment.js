import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import CardInvoice from "./CardInvoice";

function CardPayment(props) {
  const [cardInvoice, setCardInvoice] = useState();
  const email=props.email;
  const balance = parseFloat(props.balance);
  
  //card payment
  const publishableKey =
    "pk_test_51NI5LaAclf538auUPHQcqQbCJFYQsWfDTH3fRJDTg2ZOTclWmPyMM7b67NKwrql9o8wiL5q65KnLQNJC5uFB2eNc003S3YyfsT";
  const tempPriceForStripe = parseInt((balance * 100) / 250.0);
  const priceForStripe = parseInt(tempPriceForStripe);
  const payNow = async (token) => {
    try {
      const response = await Axios({
        url: "http://localhost:3001/card_payment/payment",
        method: "post",
        data: {
          amount: priceForStripe,
          token,
        },
      });
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
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body
          className="show-grid rounded "
          style={{ background: "#4483ad" }}
        >
          <div className="justify-content-between px-2">
            <div className="row my-3">
              <div className="col">
                <p className="fpx-1 bg-white rounded border px-1 py-2">
                  Balance
                  <span style={{ float: "right" }}>{balance}</span>
                </p>
              </div>
            </div>
            <div className="flex col justify-content-center">
                      <p className="fpx-1 bg-white rounded border px-1 py-2 " style={{textAlign:"center"}}>
                        Card payment will be processed in USD!!
                      </p>
                    </div>
            <div className="row my-3">
              <div className="flex col justify-content-center">
                <div class="stripe_btn">
                  <StripeCheckout
                    stripeKey={publishableKey}
                    label="Pay With Card"
                    name="Pay With Card"
                    amount={priceForStripe}
                    description={`Your total is $${priceForStripe / 100}`}
                    token={payNow}
                    style={{
                      width: "150px",
                      height: "35px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <CardInvoice
        show={cardInvoice}
        onHide={() => setCardInvoice(false)}
        invoice_id={props.invoice_id}
        email={email}
      />
    </>
  );
}

export default CardPayment;
