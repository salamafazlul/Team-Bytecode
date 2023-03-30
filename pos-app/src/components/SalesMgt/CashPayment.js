import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function CashPayment(props) {
  const [amountReceived, setAmountReceived] = useState();
  const [balance, setBalance] = useState(-props.amount);
  const [showAlert, setShowAlert] = useState(false);
  // const [paid, setPaid] = useState(false);

  const handleAmountReceivedChange = (e) => {
    const receivedAmount = e.target.value;
    setAmountReceived(receivedAmount);
    setBalance(parseFloat((receivedAmount - props.amount).toFixed(2)));
  };
  const handleCancel = () => {
    setBalance(-props.amount);
    setAmountReceived("");
    setShowAlert(false);
    props.onHide();
  };
  const handlePay = (e) => {
    e.preventDefault(); // prevent default button click behavior
    if (amountReceived >= props.amount) {
      setBalance(0);
      setShowAlert(false);
      // perform payment processing
      // setPaid(true); // set isPaid to true after successful payment
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body
        className="show-grid rounded "
        style={{ background: "#4483ad" }}
      >
        <div className="flex justify-content-between px-2">
          <div className="d-flex w-[45%] mx-1">
            <form>
              <div className="row my-3">
                <div className="col">
                  <label className="form-label text-white m-0">
                    Amount Received
                  </label>
                  <input
                    type="number"
                    className="form-control px-1"
                    placeholder="Rupees"
                    required
                    value={amountReceived}
                    onChange={handleAmountReceivedChange}
                  />
                </div>
              </div>
              <div className="row my-3">
                <div className="col">
                  <p className="fpx-1 bg-white rounded border px-1 py-2 mb-1">
                    Amount
                    <span style={{ float: "right" }}>{props.amount}</span>
                  </p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col">
                  <p className="fpx-1 bg-white rounded border px-1 py-2">
                    Balance
                    <span style={{ float: "right" }}>
                      {parseFloat(balance.toFixed(2))}
                    </span>
                  </p>
                </div>
              </div>
              <div className="row my-3">
                <div className="flex col justify-content-center">
                  <button class="modalbtn" onClick={handlePay}>
                    Pay
                  </button>
                </div>
              </div>
              {showAlert && (
                <div className="row my-3">
                  <div className="col">
                    <p className="fpx-1 bg-white rounded border px-1 py-2 text-danger">
                      Insufficient Payment!
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="d-flex bg-gray-100 w-1 rounded "></div>
          <div className="d-flex align-items-start flex-column  justify-content-center w-[42%] mx-1">
            <div className="flex align-items-center mx-auto ">
              <b
                className="fs-5"
                style={{ color: "#26eb0c", fontWeight: "bold" }}
              >
                Paid!
              </b>
            </div>
            <div className="flex align-items-center mx-auto ">
              <b className="text-white fs-5 ">Cash Payment</b>
            </div>

            <div className="d-flex mx-auto mt-2">
              <button class="modalbtn">Checkout</button>
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

export default CashPayment;
