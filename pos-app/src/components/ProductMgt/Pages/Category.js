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
      <div >
        <div > 
        <Header />
        <div className="elscore">
        <CategoryForm />
        <RemoveCategory />
        <Showcattegory />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
