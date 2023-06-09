import React from "react";
import "./AddUsers.css";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";
import Sidenav from "../Common/Sidenav";
import Header from "../Common/Heder";

export default function AddUsers() {
  return (
    <>
      <div className="container">
        <Header />
        <Sidenav userRole="storekeeper" />
        <div className="others">
          <CustomerForm />
          <CustomerTable />
        </div>
      </div>
    </>
  );
}
