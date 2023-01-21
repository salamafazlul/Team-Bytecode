import React from "react";
import "./NaviStyle.css";
import { Navideta } from "./Navideta";
import logo from "../assets/logo.png";
import { MdLogout } from "react-icons/md";

function sideNavi() {
  return (
    <div className="sidenavi">
      <>
        <img className="logo" src={logo} />
      </>

      <ul>
        {Navideta.map((val, key) => {
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

export default sideNavi;
