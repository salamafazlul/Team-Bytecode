import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="split logo">
        <div className="centered">
          <img src={require("../images/logo.png")} />
          <p className="p1">
            <b> WELCOME !</b>
          </p>
          <p className="p2"> BY TECH POS SOLUTION </p>
          <p className="p3"> Our technology creates your excellence </p>
        </div>
      </div>

      <div className="split App">
        <div className="auth-form-container">
          <h1>Signup</h1>

          <form className="login-form">
            {" "}
            {/*onSubmit={this.handleSubmit} */}
            <label htmlfor="email">Username</label>
            <input
              type="email"
              placeholder="Enter your username"
              id="email"
              name="email"
              required
            ></input>
            <label htmlfor="password">password</label>
            <input
              type="password"
              placeholder="****"
              id="password"
              name="password"
              required
            ></input>
            <button
              className="sign"
              type="submit"
              onClick={() => navigate("/Cashier")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
