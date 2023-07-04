import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        user_password,
      });

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Login Successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "250px",
        });
        localStorage.setItem("accessToken", response.data.token);

        if (response.data.results.user_role === "admin") {
          history("/Dashboard")();
        } else if (response.data.results.user_role === "storekeeper") {
          history("/Purchasing")();
        } else if (response.data.results.user_role === "cashier") {
          history("/Cashier")();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Username or password is incorrect.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/Users/forgotPass/${forgotPasswordEmail}`,
        {
          // email: forgotPasswordEmail,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Reset password link sent successfully",
          showConfirmButton: false,
          timer: 1500,
          width: "250px",
        });

        setForgotPasswordEmail(""); // Clear the input field
        setShowModal(false); // Close the modal
      }
    } catch (error) {
      console.error("Error submitting forgot password:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "An error occurred. Please try again.",
        showConfirmButton: false,
        timer: 1500,
        width: "250px",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClearField = () => {
    setForgotPasswordEmail("");
  };

  return (
    <>
      <div className="split logo1">
        <div className="centered">
          <img src={require("../images/logo1.png")} alt="Logo" />
          <p className="p1">
            <b> WELCOME !</b>
          </p>
          <p className="p2"> BY TECH POS SOLUTION </p>
          <p className="p3"> Our technology creates your excellence </p>
        </div>
      </div>

      <div className="split App">
        <div className="auth-form-container">
          <h1>SignIn</h1>

          <form className="login-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="sign"
              type="submit"
              style={{ width: "20vh" }}
              onClick={handleSubmit}
            >
              Login
            </button>

            <button
              className="sign forgot-password"
              type="button"
              onClick={handleForgotPassword}
              style={{ width: "20vh" }}
            >
              Forgot Password
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "darkblue" }}>
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#9fbccb" }}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleForgotPasswordSubmit}>
            Submit
          </Button>
          <Button variant="primary" onClick={handleClearField}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
