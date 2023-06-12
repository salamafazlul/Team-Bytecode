import React, { useState } from "react";
import axios from "axios";
import "./RemoveStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Removeform = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
  });

  const initialValues = {
    id: "",
    name: "",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleClear = (event) => {
    event.preventDefault();
    setProduct({ id: "", name: "" });
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required("required"),
    name: Yup.string().required("required"),
  });

  const onSubmit = async (values) => {
    console.log(product);
    await axios.delete(`http://localhost:3001/Product/${product.id}`);
    // navigate("/category", { replace: true });
  };

  return (
    <div className="removeform">
      {/* <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="Purchers">
          <h3 className="title2"> Remove Product</h3>

          <table>
            <tbody>
              <tr>
                <td>Product ID</td>
                <ErrorMessage name="id" component="span" />
                <td>
                  <Field
                    type="text"
                    name="id"
                    size={50}
                    placeholder="code"
                    className="barshort"
                    value={product.id}
                    onChange={handleInputChange}
                    // onKeyDown={handleKeyDown}
                    // onSubmit={onSubmit}
                  />
                </td>
                <td>Product name</td>
                <ErrorMessage name="name" component="span" />
                <td>
                  <Field
                    type="text"
                    name="name"
                    size={50}
                    placeholder="Product Name"
                    className="bar"
                    value={product.name}
                    onChange={handleInputChange}
                    // onKeyDown={handleKeyPress}
                    // onSubmit={onSubmit}
                    // disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="button">
            <button type="submit" className="bb1">
              Remove
            </button>
            <button type="button" className="bb2" onClick={handleClear}>
              <span>Clear</span>
            </button>
          </div>
        </Form>
      </Formik> */}

      <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}>
        

          <Form className="Purchers">
            <h3 className="title2"> Remove Product</h3>

            <table>
              <tbody>
                <tr>
                  <td>Product ID</td>
                  <ErrorMessage name="id" component="span" />
                  <td>
                    <Field
                      type="text"
                      name="id"
                      size={50}
                      placeholder="code"
                      className="barshort"
                      value={product.id}
                      onChange={handleInputChange}
                      // onKeyDown={handleKeyDown}
                      // onSubmit={onSubmit}
                    />
                  </td>
                  <td>Product name</td>
                  <ErrorMessage name="name" component="span" />
                  <td>
                    <Field
                      type="text"
                      name="name"
                      size={50}
                      placeholder="Product Name"
                      className="bar"
                      value={product.name}
                      onChange={handleInputChange}
                      // onKeyDown={handleKeyPress}
                      // onSubmit={onSubmit}
                      // disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            
              <button type="submit" className="bb1">
                Remove
              </button>
              <button type="button" className="bb2" onClick={handleClear}>
                Clear
              </button>
            
          </Form>
        
      </Formik>
    </div>
  );
};

export default Removeform;
