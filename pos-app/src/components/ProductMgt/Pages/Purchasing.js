import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import PurchersingForm from "../Components/Purchersing/PurchersingForm";

function Mainpage() {
  return (
    <div className="page">
      <div>
        <Sidenav userRole="storekeeper" />
      </div>
      <div>
        <Header />
        <PurchersingForm />
      </div>
    </div>
  );
}

export default Mainpage;
