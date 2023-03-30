import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function CardPayment(props) {
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
                    Card Number{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control px-1"
                    placeholder="Card Number"
                    required
                    minLength={10}
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="row my-3">
                <label className="form-label  text-white m-0">
                  Expire Date{" "}
                </label>
                <div className="col">
                  <input
                    type="text"
                    className="form-control px-1"
                    placeholder="mm"
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control px-1"
                    placeholder="yy"
                    required
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col">
                  <label className="form-label m-0 text-white ">CV Code</label>
                  <input
                    type="text"
                    className="form-control px-1"
                    placeholder="Cv"
                    required
                    minLength={3}
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col">
                  <p className="fpx-1 bg-white rounded border px-1 py-2">
                    Amount <span style={{float:"right"}}>0.00</span>
                  </p>
                </div>
              </div>

              <div className="row my-3">
                <div className="flex col justify-content-center">
                  <button class="modalbtn">Pay</button>
                </div>
              </div>
            </form>
          </div>
          <div className="d-flex bg-gray-100 w-1 rounded "></div>
          <div className="d-flex align-items-start flex-column  justify-content-center w-[45%] mx-1">
          <div className="flex align-items-center mx-auto ">
              <b className="fs-5" style={{color:"#26eb0c", fontWeight:"bold"}}>Paid!</b>
            </div>
            <div className="flex align-items-center mx-auto ">
              <b className="text-white fs-5 ">Card Payment </b>
            </div>
            <div className="mx-auto mt-2">
              <button class="modalbtn">Checkout</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CardPayment;
