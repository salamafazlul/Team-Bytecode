import React from "react";
import "./Hedingsecstyle.css";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";

function Headingsec() {
  return (
    <div className="Hedsec">
      <div>
        <h1 className="syname">BY TECH POS SYSTEM</h1>
        <h4 className="interfacename">INVENTORY MANAGEMENT</h4>
      </div>
      <div className="notification">
        <IconContext.Provider value={{ size: "1.5rem", color: "white" }}>
          <FiMessageSquare />
          <IoMdNotificationsOutline />
          <CgProfile />
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Headingsec;
