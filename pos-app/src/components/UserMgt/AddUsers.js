import React from "react";
import "./AddUsers.css";
import UserForm from "./UserForm";
// import Table from "./Table";
import Sidenav from "../Common/Sidenavbar/Sidenav";
import Header from "../Common/Hederbar/Heder";

export default function AddUsers() {
  return (
    <>
      <div className="container">
        <Header />
        <Sidenav userRole="storekeeper" />
        <div className="others">
          <UserForm />
        </div>
      </div>
    </>
  );
}
