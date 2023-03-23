import "./Table.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Table() {
  const [ListOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/Users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div className="table">
      <div className="Table">
        <tr>
          <th>Username</th>
          <th>UserRole</th>
          <th>EmailAddress</th>
          <th>Status</th>
        </tr>
        {ListOfUsers.map((value, key) => {
          return (
            <div className="Users">
              <table>
                <tr>
                  <td>
                    <div className="user_name">{value.user_name}</div>
                  </td>
                  <td>
                    <div className="user_role">{value.user_group}</div>
                  </td>
                  <td>
                    <div className="email">{value.email}</div>
                  </td>
                  <td>
                    <div className="user_status">{value.user_status}</div>
                  </td>
                  <td>
                    <div>
                      <button className="editButton">Edit</button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button className="editButton">Delete</button>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Table;
