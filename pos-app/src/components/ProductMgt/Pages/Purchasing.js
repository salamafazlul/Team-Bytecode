import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import PurchersingForm from "../Components/Purchersing/PurchersingForm";

function Mainpage() {
  return (
    <>
      <div>
        <Sidenav userRole="storekeeper" />
      </div>
      <div>
        <Header />
        <PurchersingForm />
      </div>
    </>
  );
}

export default Mainpage;
