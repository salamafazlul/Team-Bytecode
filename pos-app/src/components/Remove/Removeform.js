import React from "react";
import "./Removestyle.css";

function Removeform() {
  return (
    <div className="removeform">
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
                placeholder="code"
                class="barshort"
              />
            </td>
            <td>Product name</td>
            <td>
              <input
                type="text"
                name="name"
                size={50}
                placeholder="Product Name"
                class="bar"
              />
            </td>
          </tr>
        </table>
      </form>

      <div className="button">
        <button className="bb1">Remove</button>
        <button className="bb2">
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}

export default Removeform;
