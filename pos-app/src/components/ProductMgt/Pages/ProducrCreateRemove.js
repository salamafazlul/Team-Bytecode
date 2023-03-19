import React from 'react'
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import AddProduct from "../Components/Add/AddProduct";
import Return from "../Components/Return/Return";
import Remove from "../Components/Remove/Remove";

const AddRemove = () => {
  return (
    <>
    <Sidenav userRole="storekeeper"/>
      <div>
        <Header />
        <AddProduct/>
        <Return/>
        <Remove/>
      </div>
    </>
  )
}

export default AddRemove