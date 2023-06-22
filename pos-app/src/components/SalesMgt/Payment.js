import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

const Popup = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <>
      <Button variant="primary" className="bg-blue-700" onClick={handleShow}>
        Card Payment
      </Button>
      <Button variant="primary" className="bg-blue-700"  onClick={handleShow2}>
        cash payment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid bg-blue-800 rounded">
          <div className="flex justify-content-between">
            <div className="d-flex w-[45%] mx-1">
              <form>
                <div class="row my-3">
                  <div class="col">
                    <label class="form-label text-white m-0">Card Number </label>
                    <input
                      type="text"
                      class="form-control px-1"
                      placeholder="Card Number"
                    />
                  </div>
                </div>

                <div class="row my-3">
                  <label class="form-label  text-white m-0">Expire Date </label>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control px-1"
                      placeholder="mm"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control px-1"
                      placeholder="yy"
                    />
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col">
                    <label class="form-label m-0 text-white ">CV Code</label>
                    <input
                      type="text"
                      class="form-control px-1"
                      placeholder="Cv"
                    />
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col">
                    <p class="fpx-1 bg-gray-100 rounded border px-1 py-2">
                      {" "}
                      value Paid
                    </p>
                  </div>
                </div>

                <div class="row my-3">
                  <div class="flex col justify-content-center">
                    <input
                      type="submit"
                      class="btn px-1 bg-blue-600 shadow text-white"
                      placeholder="Cv"
                    />{" "}
                  </div>
                </div>
              </form>
            </div>
            <div className="d-flex bg-gray-100 w-1 rounded "></div>
            <div className="d-flex align-items-start flex-column  justify-content-center w-[45%] mx-1">
              <div className="flex align-items-center mx-auto ">
                <p className="text-white fs-5 ">
                  Payment Successful
                </p>
              </div>
              <div className=" shadow btn text-white d-flex-row align-items-center bg-blue-600 mx-auto ">
                Checkout
              </div>
            </div>
          </div>
        </Modal.Body>
       
      </Modal>

      <Modal
        size="l"
        show={show2}
        onHide={handleClose2}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid bg-blue-800 rounded">
          <div className="flex justify-content-between">
            <div className="d-flex w-[45%] mx-1 justify-content-center">
              <form>
                <div class="row my-3">
                  <div class="col flex align-items-center">
                    <label class="form-label text-white m-0 ">Given Amount </label>
                    </div>
                    <div className="col">
                    <input
                      type="text"
                      class="form-control px-1 align-items-right"
                      placeholder="00.00"
                    />
                 
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col flex align-items-center">
                    <label class="form-label text-white m-0 ">Due Amount </label>
                    </div>
                    <div className="col">
                    <input
                      type="text"
                      class="form-control px-1"
                      placeholder="00.00"
                    />
                 
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col flex align-items-center">
                    <label class="form-label text-white m-0 ">Balance </label>
                    </div>
                    <div className="col">
                    <input
                      type="text"
                      class="form-control px-1"
                      placeholder="00.00"
                    />
                 
                  </div>
                </div>


                <div class="row my-3">
                  <div class="flex col justify-content-center">
                    <input
                      type="submit"
                      class="btn px-1 bg-blue-600 shadow text-white"
                      placeholder="Cv"
                    />{" "}
                  </div>
                </div>
              </form>
            </div>
            <div className="d-flex bg-gray-100 w-1 rounded "></div>
            <div className="d-flex align-items-start flex-column  justify-content-center w-[45%] mx-1">
              <div className="flex align-items-center mx-auto ">
                <p className="text-white fs-5 ">
                  Payment Successful
                </p>
              </div>
              <div className=" shadow btn text-white d-flex-row align-items-center bg-blue-600 mx-auto ">
                Checkout
              </div>
            </div>
          </div>
        </Modal.Body>
       
      </Modal>
    </>
  );
};

export default Popup;