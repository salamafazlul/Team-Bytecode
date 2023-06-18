import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import AddProduct from "../Components/Add/AddProduct";
import Return from "../Components/Return/Return";
import Remove from "../Components/Remove/Remove";

const AddRemove = () => {
  return (
    <div className="App">
      <Sidenav userRole="storekeeper" />
      <div>
        <Header />
        <AddProduct />
        <Return />
        <Remove />
      </div>
    </div>
  );
};

export default AddRemove;
