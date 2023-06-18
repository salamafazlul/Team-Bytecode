import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./AddProductStyle.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddproductForm = () => {
  // State for popup display
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(null);

  //category dropdown
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch category names from the server
    axios
      .get("http://localhost:3001/Product_Category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const initialValues = {
    product_name: "",
    product_id: "",
    stock: "",
    buying_price: "",
    selling_price: "",
    category_id: "",
    reorder_level: "",
    Description: "",
  };

  const validationSchema = Yup.object().shape({
    product_name: Yup.string().required(" requird"),
    product_id: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required(" requird"),
    stock: Yup.number().required(" requird"),
    buying_price: Yup.number().required(" requird"),
    selling_price: Yup.number().required(" requird"),
    category_id: Yup.string().required(" requrid"),
    reorder_level: Yup.number().required(" requird"),
    // Description: Yup.string().required(" requird"),
  });

  /*
  const onSubmit = async (values) => {
    console.log(values);
    const response = await axios
      .post("http://localhost:3001/Product", values)
      .then((res) => {
        console.log(res);
      });
  };
*/
  /*
const onSubmit = async (values) => {
  console.log(values);
  await axios.post("http://localhost:3001/Product", values);
  setShowPopup(true);
}; */

  const onSubmit = (values, { resetForm }) => {
    setFormData(values);
    setShowPopup(true);
    resetForm();
  };

  const handleConfirm = async () => {
    if (formData) {
      await axios.post("http://localhost:3001/Product", formData);
      setShowPopup(false);
    }
  };

  // const navigate = useNavigate();

  return (
    <>
      <div className="addform">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="Purchers">
            <h3 className="title"> Add New Product</h3>

            <table className="formtable">
              <tbody>
                <tr>
                  <td>
                    <label>Product name</label>
                    <ErrorMessage name="product_name" component="span" />
                  </td>
                  <td colSpan="3">
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="product_name"
                      size={50}
                      placeholder="Enter Product Name"
                      className="input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Product ID</label>
                    <ErrorMessage name="product_id" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="product_id"
                      placeholder="Produt Id"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label> Quantity </label>
                    <ErrorMessage name="stock" component="span" />
                  </td>

                  <td>
                    <Field
                      type="number"
                      // onChange={handleChange}
                      name="stock"
                      placeholder="Quntity"
                      className="inputshort"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Buying Price</label>
                    <ErrorMessage name="buying_price" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="buying_price"
                      placeholder="Price"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label>Selling price</label>
                    <ErrorMessage name="selling_price" component="span" />
                  </td>

                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="selling_price"
                      placeholder="Price"
                      className="inputshort"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Category</label>
                    <ErrorMessage name="category_id" component="span" />
                  </td>

                  <td>
                    <Field
                      as="select"
                      name="category_id"
                      className="inputshort select"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </Field>
                  </td>
                  <td>
                    <label>Min.stock level</label>
                    <ErrorMessage name="reorder_level" component="span" />
                  </td>
                  <th>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="reorder_level"
                      placeholder="Enter min stock level"
                      className="inputshort"
                    />
                  </th>
                </tr>
                <tr>
                  <td>Description</td>
                  <td colSpan="3">
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="Description"
                      placeholder="Enter Produt Description"
                      className="input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="b1" type="onsubmit">
              Add
            </button>
            <button type="reset" className="b2">
              Clear
            </button>
          </Form>
        </Formik>
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="popup">
            <h3>Confirmation</h3>
            <p>Are you sure you want to add the product?</p>
            <div className="">
              <button className="b1" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="b2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <hr className="rule"/> */}
    </>
  );
};

export default AddproductForm;
