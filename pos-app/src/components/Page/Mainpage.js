import React from "react";
import SideNavi from "../sidebar/SideNavi";
import Headingsec from "../Heading/Headingsec";

function Mainpage() {
  return (
    <>
      <div>
        <SideNavi />
      </div>
      <div>
        <Headingsec />
        Mainpage
      </div>
    </>
  );
}

export default Mainpage;
