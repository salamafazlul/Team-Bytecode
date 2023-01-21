import React from "react";
import "./Rformstyle.css";

function Rform() {
  return (
    <>
      <div className="rform">
        <form>
          <h3 className="title2"> Return or Damage</h3>
          <table>
            <tr>
              <td>Product code</td>
              <td>
                <input
                  type="text"
                  name="name"
                  size={50}
                  placeholder="select code"
                  class="barshort"
                />
              </td>
              <td>Product name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  size={50}
                  placeholder="Enter product name"
                  class="bar"
                />
              </td>
            </tr>
            <tr>
              <td>QTY</td>
              <td>
                <input
                  type="number"
                  name="name"
                  size={50}
                  placeholder="Quntity"
                  class="barshort "
                />
              </td>
              <td>Reason</td>
              <td>
                <input
                  type="text"
                  name="name"
                  size={50}
                  placeholder="Reason"
                  class="bar"
                />
              </td>
            </tr>
          </table>
        </form>

        <div className="button">
          <button className="bb1">Update</button>
          <button className="bb2">
            <span>Clear</span>
          </button>
        </div>
      </div>
      <hr className="hrule" />
    </>
  );
}

export default Rform;
