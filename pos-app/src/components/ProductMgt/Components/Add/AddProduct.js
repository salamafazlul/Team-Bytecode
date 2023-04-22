import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AddProductStyle.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddproductForm = () => {
  const initialValues = {
    Product_name: "",
    Product_id: "",
    Quantity: "",
    Buying_price: "",
    Selling_price: "",
    CategoryId: "",
    Min_stock_level: "",
    Description: "",
  };

  const validationSchema = Yup.object().shape({
    Product_name: Yup.string().required(" requird"),
    Product_id: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required(" requird"),
    Quantity: Yup.number().required(" requird"),
    Buying_price: Yup.number().required(" requird"),
    Selling_price: Yup.number().required(" requird"),
    CategoryId: Yup.string().required(" requrid"),
    Min_stock_level: Yup.number().required(" requird"),
    Description: Yup.string().required(" requird"),
  });

  // const onSubmit = async (values) => {
  //   const response = await axios
  //     .post("http://localhost:3001/Product", values)
  //     .then(() => {
  //       axios.get("http://localhost:3001/Product").then((response) => {
  //         setName(response.data);
  //       });
  //     });
  // };

  const onSubmit = async (values) => {
    console.log(values);
    const response = await axios
      .post("http://localhost:3001/Product", values)
      .then((res) => {
        console.log(res);
      });
  };

  // const onSubmit = (data) => {
  //   axios.post(`http://localhost:3001/product`, data).then((res) => {
  //     console.log(res);
  //   });
  //   console.log(data);
  // };

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
                    <ErrorMessage name="Product_name" component="span" />
                  </td>
                  <td colSpan="3">
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="Product_name"
                      size={50}
                      placeholder="Enter Product Name"
                      className="input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Product ID</label>
                    <ErrorMessage name="Product_id" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="Product_id"
                      placeholder="Produt Id"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label> Quantity </label>
                    <ErrorMessage name="Quantity" component="span" />
                  </td>

                  <td>
                    <Field
                      type="number"
                      // onChange={handleChange}
                      name="Quantity"
                      placeholder="Quntity"
                      className="inputshort"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Buying Price</label>
                    <ErrorMessage name="Buying_price" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="Buying_price"
                      placeholder="Price"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label>Selling price</label>
                    <ErrorMessage name="Selling_price" component="span" />
                  </td>

                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="Selling_price"
                      placeholder="Price"
                      className="inputshort"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Category</label>
                    <ErrorMessage name="CategoryId" component="span" />
                  </td>

                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="CategoryId"
                      placeholder="Select category"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label>Min.stock level</label>
                    <ErrorMessage name="Min_stock_level" component="span" />
                  </td>
                  <th>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="Min_stock_level"
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
            {/* <div className="button">
              <button className="b1" type="submit">
                Add
              </button>
              <button className="b2">Clear</button>
            </div> */}
          </Form>
        </Formik>
      </div>
      <hr className="hrule" />
    </>
  );
};

export default AddproductForm;
