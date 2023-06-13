import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Keyboard from "react-simple-keyboard";
import { useNavigate } from "react-router-dom";

function PosCustomer(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (props.show) {
      setEmail(""); // Reset the email state to an empty string when the modal is shown
    }
  }, [props.show]);

  const setEmailKey = (input) => {
    setEmail(input);
  };

  const handleDone = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    props.onEmailSet(email); // Invoke the callback function with the email value
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="show-grid rounded" style={{ background: "#4483ad" }}>
        <div className="mx-1">
          <form onSubmit={handleDone}>
            <div className="row my-3">
              <div className="col">
                <label className="form-label text-white m-0">Email</label>
                <input
                  type="text"
                  className="form-control px-1"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmailKey(e.target.value)}
                />
              </div>
            </div>

            <div className="row my-3">
              <div className="col">
                <Keyboard
                  className="row"
                  input={email}
                  onChange={(input) => setEmailKey(input)}
                />
              </div>
            </div>

            <div className="row my-3">
              <div className="flex col justify-content-center">
                <button className="modalbtn" type="submit">
                  Done
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PosCustomer;
