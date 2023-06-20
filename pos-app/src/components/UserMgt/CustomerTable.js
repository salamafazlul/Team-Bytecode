import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "react-bootstrap";

import "./CustomerTable.css";

function CustomerTable() {
  const [listOfCustomers, setListOfCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchNameInput, setSearchNameInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/customers").then((response) => {
      const sortedCustomers = response.data.sort((a, b) => b.id - a.id);
      setListOfCustomers(sortedCustomers);
    });
  }, []);

  const editCustomer = (customer_id) => {
    const customer = listOfCustomers.find(
      (customer) => customer.id === customer_id
    );
    setSelectedCustomer(customer);
    setEditedCustomer({ ...customer });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value,
    });
  };

  const saveChanges = () => {
    axios
      .put(
        `http://localhost:3001/customers/${editedCustomer.id}`,
        editedCustomer
      )
      .then((response) => {
        const updatedCustomerList = listOfCustomers.map((customer) =>
          customer.id === editedCustomer.id ? editedCustomer : customer
        );
        setListOfCustomers(updatedCustomerList);
        setShowModal(false);
        alert("Changes saved successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to save changes. Please try again.");
      });
  };

  const removeCustomer = (customer_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this customer?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/customers/${customer_id}`)
        .then((response) => {
          const updatedCustomerList = listOfCustomers.filter(
            (customer) => customer.id !== customer_id
          );
          setListOfCustomers(updatedCustomerList);
          setShowModal(false);
          alert("Customer removed successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to remove the customer.");
        });
    }
  };

  return (
    <div className="Customertable">
      <div className="CustomerTcontainer ">
        <div className="CustomersearchBarWrapper ">
          {/* <div className="searchBar">
            <input
              type="text"
              placeholder="Search by user ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div> */}
          <div className="CustomersearchBar">
            <div className="CustomersearchBarWrapper">
              <input
                className="CustomersearchBar"
                type="text"
                placeholder="Search by name"
                value={searchNameInput}
                onChange={(e) => setSearchNameInput(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="CustomerTable">
          <Table responsive style={{ width: "150vh" }}>
            <thead>
              <tr>
                {/* <th className="tableHead01">#</th> */}
                <th className="tableHead01">Name</th>
                <th className="tableHead01">Contact No</th>
                <th className="tableHead01">EmailAddress</th>
                <th className="tableHead01"></th>
                <th className="tableHead01"></th>
              </tr>
            </thead>
            <tbody className="tbody">
              {listOfCustomers
                .filter((customer) =>
                  customer.id.toString().includes(searchInput)
                )
                .filter((customer) =>
                  customer.full_name
                    .toLowerCase()
                    .includes(searchNameInput.toLowerCase())
                )
                .slice(0, 3)
                .map((customer, key) => {
                  return (
                    <tr key={key}>
                      {/* <td>{customer.id}</td> */}
                      <td>{customer.full_name}</td>
                      <td>{customer.mobile_no}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button
                          className="CustomerTableButton"
                          onClick={() => {
                            editCustomer(customer.id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="CustomerTableButton"
                          onClick={() => {
                            removeCustomer(customer.id);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "darkblue" }}>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedCustomer && (
            <div>
              <p>ID: {editedCustomer.id}</p>
              <p>
                Name:
                <input
                  type="text"
                  name="full_name"
                  value={editedCustomer && editedCustomer.full_name}
                  onChange={handleInputChange}
                  style={{ width: "100%", backgroundColor: "white" }}
                />
              </p>
              <p>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editedCustomer && editedCustomer.email}
                  onChange={handleInputChange}
                  style={{ width: "100%", backgroundColor: "white" }}
                />
              </p>
              <p>
                Mobile Number:
                <input
                  type="text"
                  name="mobile_no"
                  value={editedCustomer && editedCustomer.mobile_no}
                  onChange={handleInputChange}
                  style={{ width: "100%", backgroundColor: "white" }}
                />
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="closeButton"
            variant="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomerTable;
