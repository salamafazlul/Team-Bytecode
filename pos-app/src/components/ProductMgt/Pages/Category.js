import React from "react";
import Sidenav from "../../Common/Sidenavbar/Sidenav";
import Header from "../../Common/Hederbar/Heder";
import CategoryForm from "../Components/Category/CategoryForm";
import RemoveCategory from "../Components/Category/RemoveCategory";
import Showcattegory from "../Components/Category/Showcattegory";

function Category() {
  return (
    <div className="page">
      <div>
        <Sidenav userRole="storekeeper" />
      </div>
      <div>
        <Header />
        <CategoryForm />
        <RemoveCategory />
        <Showcattegory />
      </div>
    </div>
  );
}

export default Category;
