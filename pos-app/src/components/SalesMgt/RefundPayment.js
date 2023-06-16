import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";


function RefundPayment(props) {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);
  const [email, setEmail] = useState(props.email || "");

 
  const handleCancel = () => {
    setPaid(false);
    props.onHide();
  };
  const handlePay = (e) => {
    e.preventDefault(); // prevent default button click behavior
    
      setPaid(true);
    
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvoice = (email) => {
    fetch("http://localhost:3001/Email_Invoice/api/generatePdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, invoice_id: props.invoice_id }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Invoice sent successfully");
          navigate("/Cashier"); // Navigate back to the cashier page
        } else {
          console.log("Failed to send invoice");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div className="flex justify-content-between px-2">
            <div className="d-flex w-[50%] mx-1">
              <form>
                <div className="row my-3">
                  <div className="flex col justify-content-center" >
                    <p className="fpx-1 bg-white rounded border px-1 py-2 mb-1"style={{width:"200px"}}>
                      Amount
                      <span style={{ float: "right" }}>{props.amount}</span>
                    </p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="flex col justify-content-center">
                    <button class="modalbtn" onClick={handlePay}>
                      Refund
                    </button>
                  </div>
                </div>
                
              </form>
            </div>
            <div className="d-flex bg-gray-100 w-1 rounded "></div>
            <div className="d-flex align-items-start flex-column  justify-content-center w-[42%] mx-1">
              {paid && (
                <div className="flex align-items-center mx-auto flex-column mb-4">
                  <b
                    className="fs-5"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Refunded!
                  </b>
                  <button
                    class="modalbtn"
                    style={{ background: "#081933", color: "white" }}
                    onClick={() => handleInvoice(email)}
                  >
                    Invoice
                  </button>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ marginTop: "5px" }}
                  />
                </div>
              )}
              <div className="flex align-items-center mx-auto ">
                <b className="text-white fs-5 ">Cash Refund</b>
              </div>

              <div className="d-flex mx-auto mt-2">
                <button
                  class="modalbtn"
                  style={{ marginLeft: "10px" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RefundPayment;
