import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function PosCustomer(props) {
  const [contactNumber, setContactNumber] = useState(null);
  const [contactNumberError, setContactNumberError] = useState("");

  useEffect(() => {
    if (props.show) {
      setContactNumber(""); // Reset the contact number state to null when the modal is shown
      setContactNumberError(""); // Reset the contact number error state
    }
  }, [props.show]);

  const setContactNumberKey = (input) => {
    setContactNumber(input);
    setContactNumberError(""); // Clear the error message when the contact number changes
  };

  const handleDone = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (contactNumber && contactNumber.length === 10) {
      props.onContactNumberSet(contactNumber); // Invoke the callback function with the parsed contact number value
    } else {
      setContactNumberError("Contact number must be 10 digits");
    }
  };

  const numberKeyboardOptions = {
    layout: {
      default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
    },
    display: {
      "{bksp}": "⌫",
    },
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="show-grid rounded" style={{ background: "#4483ad" }}>
        <div className="mx-1">
          <form onSubmit={handleDone}>
            <div className="row my-3">
              <div className="col">
                <label className="form-label text-white m-0">Contact Number</label>
                <input
                  type="tel"
                  className="form-control px-1"
                  placeholder="Enter your contact number"
                  required
                  minLength={10}
                  maxLength={10}
                  value={contactNumber}
                  onChange={(e) => setContactNumberKey(e.target.value)}
                />
                {contactNumberError && <p className="text-danger">{contactNumberError}</p>}
              </div>
            </div>

            <div className="row my-3">
              <div className="col">
                <Keyboard
                  className="row"
                  input={contactNumber}
                  onChange={(input) => setContactNumberKey(input)}
                  layoutName="default"
                  mergeDisplay={true}
                  layout={numberKeyboardOptions.layout}
                  display={numberKeyboardOptions.display}
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
