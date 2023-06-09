import "./ViewCustomer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserTable() {
  const [ListOfUsers, setListOfUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/Users").then((response) => {
      const sortedUsers = response.data.sort((a, b) => b.id - a.id);
      setListOfUsers(sortedUsers);
    });
  }, []);

  const editUser = (user_id) => {
    const user = ListOfUsers.find((user) => user.id === user_id);
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    axios
      .put(`http://localhost:3001/Users/${editedUser.id}`, editedUser)
      .then((response) => {
        // Handle successful save
        const updatedUserList = ListOfUsers.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setListOfUsers(updatedUserList);
        setShowModal(false);
        alert("Changes saved successfully!"); // Display success message
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        alert("Failed to save changes. Please try again."); // Display error message
      });
  };

  const removeUser = (user_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/Users/${user_id}`)
        .then((response) => {
          // Handle successful removal from the server
          const updatedUserList = ListOfUsers.filter(
            (user) => user.id !== user_id
          );
          setListOfUsers(updatedUserList);
          setShowModal(false);
          alert("User removed successfully!"); // Display an alert to notify the user
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          alert("Failed to remove the user."); // Display an alert for the error
        });
    }
  };

  return (
    <div className="table">
      <div className="container04">
        <div className="UserTable">
          <Link to="\UserForm.js" className="btn btn-primary">
            Add User
          </Link>
          <Table responsive style={{ width: "150vh" }}>
            <thead>
              <tr>
                <th className="tableHead">#</th>
                <th className="tableHead">Name</th>
                <th className="tableHead">UserRole</th>
                <th className="tableHead">EmailAddress</th>
                <th className="tableHead"></th>
                <th className="tableHead"></th>
              </tr>
            </thead>
            <tbody>
              {ListOfUsers.slice(0, 7).map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.full_name}</td>
                    <td>{value.user_role}</td>
                    <td>{value.email}</td>
                    <td>
                      <button
                        className="TableButton"
                        onClick={() => {
                          editUser(value.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="TableButton"
                        onClick={() => {
                          removeUser(value.id);
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
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedUser && (
            <div>
              <p>ID: {editedUser.id}</p>
              <p>
                Name:
                <input
                  type="text"
                  name="full_name"
                  value={editedUser.full_name}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </p>
              <p>
                User Role:
                <select
                  name="user_role"
                  value={editedUser.user_role}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                >
                  <option value="storekeeper">Storekeeper</option>
                  <option value="cashier">Cashier</option>
                </select>
              </p>
              <p>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </p>
              <p>
                Address:
                <input
                  type="text"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </p>
              <p>
                Mobile Number:
                <input
                  type="text"
                  name="mobile_no"
                  value={editedUser.mobile_no}
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

export default UserTable;
