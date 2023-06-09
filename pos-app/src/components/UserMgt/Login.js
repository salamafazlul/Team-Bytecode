import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

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
              className="signButton"
              type="submit"
              // onClick={() => navigate("AddUsers")}
              onClick={() => navigate("Table")}
            >
              ViewUsers
            </button>
            <button
              className="signButton"
              type="submit"
              // onClick={() => navigate("AddUsers")}
              onClick={() => navigate("AddUsers")}
            >
              AddUsers
            </button>
            <button
              className="signButton"
              type="submit"
              // onClick={() => navigate("AddUsers")}
              onClick={() => navigate("Customer")}
            >
              Customer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
