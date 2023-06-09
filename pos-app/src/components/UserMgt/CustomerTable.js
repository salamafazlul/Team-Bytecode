import "./CustomerTable.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CustomerTable() {
  const [ListOfCustomer, setListOfCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/Customer").then((response) => {
      const sortedCustomer = response.data.sort((a, b) => b.id - a.id);
      setListOfCustomer(sortedCustomer);
    });
  }, []);

  const editCustomer = (customer_id) => {
    const customer = ListOfCustomer.find(
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
    setEditedCustomer((prevEditedCustomer) => ({
      ...prevEditedCustomer,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    axios
      .put(
        `http://localhost:3001/Customer/${editedCustomer.id}`,
        editedCustomer
      )
      .then((response) => {
        // Handle successful save
        const updatedCustomerList = ListOfCustomer.map((customer) =>
          customer.id === editedCustomer.id ? editedCustomer : customer
        );
        setListOfCustomer(updatedCustomerList);
        setShowModal(false);
        alert("Changes saved successfully!"); // Display success message
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        alert("Failed to save changes. Please try again."); // Display error message
      });
  };

  const removeCustomer = (customer_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this customer?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/Customer/${customer_id}`)
        .then((response) => {
          // Handle successful removal from the server
          const updatedCustomerList = ListOfCustomer.filter(
            (customer) => customer.id !== customer_id
          );
          setListOfCustomer(updatedCustomerList);
          setShowModal(false);
          alert("Customer removed successfully!"); // Display an alert to notify the user
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          alert("Failed to remove the customer."); // Display an alert for the error
        });
    }
  };

  return (
    <div className="table">
      <div className="container04">
        <div className="CustomerTable">
          <Table responsive style={{ width: "150vh" }}>
            <thead>
              <tr>
                <th className="tableHead">#</th>
                <th className="tableHead">Name</th>
                <th className="tableHead">Contact No</th>
                <th className="tableHead">EmailAddress</th>
                <th className="tableHead"></th>
                <th className="tableHead"></th>
              </tr>
            </thead>
            <tbody>
              {ListOfCustomer.slice(0, 7).map((customer, key) => {
                return (
                  <tr key={key}>
                    <td>{customer.id}</td>
                    <td>{customer.full_name}</td>
                    <td>{customer.mobile_no}</td>
                    <td>{customer.email}</td>
                    <td>
                      <button
                        className="TableButton"
                        onClick={() => {
                          editCustomer(customer.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="TableButton"
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

      {/* Modal for displaying user data */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
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
                  value={editedCustomer.full_name}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </p>
              <p>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editedCustomer.email}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </p>

              <p>
                Mobile Number:
                <input
                  type="text"
                  name="mobile_no"
                  value={editedCustomer.mobile_no}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </p>
              {/* Add other fields as needed */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="closeButton" // Add the closeButton class
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
