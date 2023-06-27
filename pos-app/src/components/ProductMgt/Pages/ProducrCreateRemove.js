import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import AddProduct from "../Components/Add/AddProduct";
import Return from "../Components/Return/Return";
import Remove from "../Components/Remove/Remove";

const AddRemove = () => {
  return (
    <div className="page">
      <Sidenav userRole="storekeeper" />
      <div >
        <Header />
        <div className="scorele">
        <AddProduct />
        <Return />
        <Remove />
        </div>
      </div>
    </div>
  );
};

export default AddRemove;
