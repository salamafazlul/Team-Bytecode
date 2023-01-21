import React from "react";
import "./Formstyle.css";

function Form() {
  return (
    <>
      <div className="addform">
        <form className="Purchers">
          <h3 className="title"> Add New Product</h3>

          <table className="formtable">
            <tr>
              <td>
                <label>Product name</label>
              </td>
              <td colspan="3">
                <input
                  type="text"
                  name="name"
                  size={50}
                  placeholder="Enter Product Name"
                  class="input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Product ID</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Produt Id"
                  class="inputshort"
                />
              </td>
              <td>Quntity</td>
              <td>
                <input
                  type="number"
                  name="name"
                  placeholder="Quntity"
                  class="inputshort"
                />
              </td>
            </tr>
            <tr>
              <td>Buying Price</td>
              <td>
                <input
                  type="price"
                  name="name"
                  placeholder="Price"
                  class="inputshort"
                />
              </td>
              <td>Selling price</td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Price"
                  class="inputshort"
                />
              </td>
            </tr>
            <tr>
              <td>Category</td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Select category"
                  class="inputshort"
                />
              </td>
              <td>Min.stock level</td>
              <th>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter min stock level"
                  class="inputshort"
                />
              </th>
            </tr>
            <tr>
              <td>Description</td>
              <td colspan="3">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter produt Description"
                  class="input"
                />
              </td>
            </tr>
          </table>
        </form>

        <div className="button">
          <button className="b1">Add</button>
          <button className="b2">Clear</button>
        </div>
      </div>
      <hr className="hrule" />
    </>
  );
}

export default Form;
