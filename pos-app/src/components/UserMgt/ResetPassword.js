import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";

import Swal from "sweetalert2";

const ResetPassword = () => {
  // const { userId, resetToken } = useParams();
  const { id, token } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("error");

  console.log(id);
  console.log(token);
  console.log(confirmPassword);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password != confirmPassword) {
        // Password and confirm password do not match
        Swal.fire("Error", "Passwords do not match", "error");
        return;
      }

      const response = await axios.post(
        `http://localhost:3001/users/reset/${id}/${token}`,
        {
          new_password: password,
        }
      );
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "password reset successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "250px",
        }).then(() => {
          // Redirect to the login page
          history("/");
        });
      }
      console.log(response.status);
      console.log(password);
      // Handle the response from the API
      // Display success or error message to the user
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="split logo1">{/* Rest of the code */}</div>

      <div className="split App">
        <div className="auth-form-container">
          <h1>Reset Password</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="password">Enter new password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="sign" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
