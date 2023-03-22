import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import CategoryForm from "../Components/Category/CategoryForm";

function Category() {
  return (
    <>
      <div>
        <Sidenav userRole = "storekeeper" />
      </div>
      <div>
        <Header />
        <CategoryForm/>
      </div>
    </>
  );
}

export default Category;