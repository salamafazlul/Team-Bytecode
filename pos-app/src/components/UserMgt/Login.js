import React, { useState, state, Component, props } from "react";
import { ReactDOM } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  //  handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(this.state.email)
  //     console.log(this.state.password)
  // // const handleSubmit = (e) => {
  // //     e.preventDefault();
  // //     console.log(this.state.email)
  // //     console.log(this.state.password)

  //     if(this.state.email == "fazlulsalama@gmail.com" && this.state.password == 123){
  //         const mes = "Welcome Salama"
  //         alert(mes);
  // //     if(this.state.email == "fazlulsalama@gmail.com" && this.state.password == 123){
  // //         const mes = "Welcome Salama"
  // //         alert(mes);

  //     }
  // //     }

  // }
  // // }

  //  changeHandler = (c) => {
  // //  const changeHandler = (c) => {

  //     const name = c.target.name;
  //     const value = c.target.value;
  // //     const name = c.target.name;
  // //     const value = c.target.value;

  //     this.setState({
  //       [name] : value,
  // //     this.setState({
  // //       [name] : value,

  //     });
  // }

  //     });
  // }

  /*
const [email, setEmail]         = State('');
const [password, setPassword]   = State('');
const [errMsg, setErrMsg]       = State('');
const [success, setSuccess]     = State('');
*/
  /*
this.state = {
    email :''
};*/

  return (
    <>
      <div className="split logo1">
        <div className="centered">
          <img src={require("../images/logo1.png")} />
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
              type="text"
              placeholder="Enter your username"
              id="user_name"
              name="user_name"
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
              onClick={() => navigate("AddUsers")}
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
