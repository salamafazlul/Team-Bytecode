import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";


function CardPayment(props) {
  return (
    
      <Modal
       {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid bg-blue-800 rounded">
          <div className="flex justify-content-between">
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
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <label className="form-label  text-white m-0">Expire Date </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control px-1"
                      placeholder="mm"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control px-1"
                      placeholder="yy"
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
                    />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col">
                    <p className="fpx-1 bg-gray-100 rounded border px-1 py-2">
                      {" "}
                      value Paid
                    </p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="flex col justify-content-center">
                    <input
                      type="submit"
                      className="btn px-1 bg-blue-600 shadow text-white"
                      placeholder="Cv"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="d-flex bg-gray-100 w-1 rounded "></div>
            <div className="d-flex align-items-start flex-column  justify-content-center w-[45%] mx-1">
              <div className="flex align-items-center mx-auto ">
                <p className="text-white fs-5 ">Payment Successful</p>
              </div>
              <div className=" shadow btn text-white d-flex-row align-items-center bg-blue-600 mx-auto ">
                Checkout
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  );
}

export default CardPayment;
