import React from "react";
import "./HederStyle.css";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";

function Heder() {
  return (
    <div className="Hedsec">
      <div>
        <h1 className="syname">BY TECH POS SYSTEM</h1>
        <h4 className="interfacename">INVENTORY MANAGEMENT</h4>
      </div>
      <div className="notification">
        <IconContext.Provider value={{ size: "1.5rem", color: "white" }}>
          <div className="ntf">
            <FiMessageSquare />
          </div>
          <div className="ntf">
            <IoMdNotificationsOutline />
          </div>
          <div className="ntf">
            <CgProfile />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Heder;
