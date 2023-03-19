import React from "react";
import "./SidenavStyle.css";
import { Navideta } from "./SidenavData";
import logo from "../../images/logo.png";
import { MdLogout } from "react-icons/md";

function SideNavi(props) {
  return (
    <div className="sidenavi">
      <>
        <img className="logo" src={logo} />
      </>

      <ul>
        {props.userRole==="storekeeper" && Navideta.map((val, key) => {
          return (
            <li
              className="but"
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {""}
              <div className="icon"> {val.icon} </div>
              {""}
              <div> {val.title} </div>
            </li>
          );
        })}

{props.userRole==="user" && Navideta.map((val, key) => {
          return (
            <li
              className="but"
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {""}
              <div className="icon"> {val.icon} </div>
              {""}
              <div> {val.title} </div>
            </li>
          );
        })}
      </ul>
      <div className="logodiv">
        <button className="logout">
          <MdLogout />
          <span className="butonname"> Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SideNavi;