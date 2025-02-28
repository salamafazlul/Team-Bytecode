import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import AddProduct from "../Components/Add/AddProduct";
import Return from "../Components/Return/Return";
import Remove from "../Components/Remove/Remove";
import Edit from "../Components/Edit/EditProduct"

const AddRemove = () => {
  return (
    <div className="page">
      <Sidenav userRole="storekeeper" />
      <div >
        <Header />
        <div className="elscore">
        <AddProduct />
        <Return />
        <Remove />
        <Edit/>
        </div>
      </div>
    </div>
  );
};

export default AddRemove;
