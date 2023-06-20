import "./Table.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserTable() {
  const [ListOfUsers, setListOfUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [searchIdInput, setSearchIdInput] = useState("");
  const [searchNameInput, setSearchNameInput] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3001/Users")
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => b.id - a.id);
        setListOfUsers(sortedUsers);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch users. Please try again.");
      });
  };

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
        const updatedUserList = ListOfUsers.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setListOfUsers(updatedUserList);
        setShowModal(false);
        alert("Changes saved successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to save changes. Please try again.");
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
          const updatedUserList = ListOfUsers.filter(
            (user) => user.id !== user_id
          );
          setListOfUsers(updatedUserList);
          alert("User removed successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to remove the user.");
        });
    }
  };

  const filteredUsers = ListOfUsers.filter(
    (user) =>
      user.id.toString().includes(searchIdInput) &&
      user.full_name.toLowerCase().includes(searchNameInput.toLowerCase())
  );

  return (
    <div className="Usertable01">
      <div className="UserTcontainer01">
        <div className="UserTable"></div>
        <button
          className="UserTablebutton02"
          onClick={() => {
            window.location.href = "/AddUsers";
          }}
        >
          Add User
        </button>

        <div className="UserSearchBar">
          <input
            type="text"
            placeholder="Search by user name"
            value={searchNameInput}
            onClick={() => setSearchIdInput("")}
            onChange={(e) => setSearchNameInput(e.target.value)}
          />

          <Table responsive style={{ width: "150vh" }}>
            <thead>
              <tr>
                <th className="UsertableHead">Name</th>
                <th className="UsertableHead">UserRole</th>
                <th className="UsertableHead">EmailAddress</th>
                <th className="UsertableHead"></th>
                <th className="UsertableHead"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice(0, 7).map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{value.full_name}</td>
                    <td>{value.user_role}</td>
                    <td>{value.email}</td>
                    <td>
                      <button
                        className="UserTableButton01"
                        onClick={() => {
                          editUser(value.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="UserTableButton01"
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
        {selectedUser && (
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            className="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "darkblue" }}>
                Edit Customer
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  value={editedUser.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile_no"
                  value={editedUser.mobile_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>User Role</label>
                <select
                  className="form-control"
                  name="user_role"
                  value={editedUser.user_role}
                  onChange={handleInputChange}
                >
                  <option value="storekeeper">Storekeeper</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={saveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default UserTable;
