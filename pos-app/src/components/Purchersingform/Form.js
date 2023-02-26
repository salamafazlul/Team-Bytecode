import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Formstyle.css";
import axios from "axios";

const Form = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    quntity: "",
    byingprice: "",
    sellingprice: "",
    category: "",
    min_stock_level: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      axios.post(`http://localhost:8801/product`, product).then((res) => {
        console.log(res);
        // const persons = res.data;
        // setProduct(persons);
      });

      // await axios.post("http://localhost:8801/product", product);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(product);

  return (
    <>
      <div className="addform">
        <form className="Purchers">
          <h3 className="title"> Add New Product</h3>

          <table className="formtable">
            <tbody>
              <tr>
                <td>
                  <label>Product name</label>
                </td>
                <td colSpan="3">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    size={50}
                    placeholder="Enter Product Name"
                    className="input"
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
                    onChange={handleChange}
                    name="id"
                    placeholder="Produt Id"
                    className="inputshort"
                  />
                </td>
                <td>Quntity</td>
                <td>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="quntity"
                    placeholder="Quntity"
                    className="inputshort"
                  />
                </td>
              </tr>
              <tr>
                <td>Buying Price</td>
                <td>
                  <input
                    type="price"
                    onChange={handleChange}
                    name="byingprice"
                    placeholder="Price"
                    className="inputshort"
                  />
                </td>
                <td>Selling price</td>
                <td>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="sellingprice"
                    placeholder="Price"
                    className="inputshort"
                  />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="category"
                    placeholder="Select category"
                    className="inputshort"
                  />
                </td>
                <td>Min.stock level</td>
                <th>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="min_stock_level"
                    placeholder="Enter min stock level"
                    className="inputshort"
                  />
                </th>
              </tr>
              <tr>
                <td>Description</td>
                <td colSpan="3">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="description"
                    placeholder="Enter produt Description"
                    className="input"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div className="button">
          <button className="b1" onClick={handleClick}>
            Add
          </button>
          <button className="b2">Clear</button>
        </div>
      </div>
      <hr className="hrule" />
    </>
  );
};

export default Form;
