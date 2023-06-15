import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function CardInvoice(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(props.email || "");

  const handleCancel = () => {
    props.onHide();
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
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body
        className="show-grid rounded "
        style={{ background: "#4483ad" }}
      >
        <div className="justify-content-center  mx-1" centered>
          <div className=" flex align-items-center mx-auto flex-column mb-4">
            <b className="fs-5" style={{ color: "white", fontWeight: "bold" }}>
              Payment Successful!!
            </b>
            <button
              class="modalbtn"
              style={{ background: "#081933", color: "white", width:"150px" }}
              onClick={() => handleInvoice(email)}
            >
              Send Invoice
            </button>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              style={{ marginTop: "5px" , marginBottom:"20px"}}
            />
            <div className="flex align-items-center mx-auto ">
            <b className="text-white fs-5 ">Card Payment</b>
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
  );
}

export default CardInvoice;
