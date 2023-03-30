import "./Table.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function UserTable() {
  const [ListOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/Users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);
  const editUser = (user_id) => {
    alert(user_id);
  };
  return (
    <div className="table">
      <div className="Users">
        <div className="UserTable">
          <Table responsive>
            <thead>
              <tr>
                <th className="tableHead">#</th>
                <th className="full_name">Name</th>
                <th className="tableHead">UserRole</th>
                <th className="tableHead">EmailAddress</th>
              </tr>
            </thead>
            <tbody>
              {ListOfUsers.map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.full_name}</td>
                    <td>{value.user_role}</td>
                    <td>{value.email}</td>
                    <td>
                      <button
                        className="editButton"
                        onClick={() => {
                          editUser(value.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="deleteButton">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
