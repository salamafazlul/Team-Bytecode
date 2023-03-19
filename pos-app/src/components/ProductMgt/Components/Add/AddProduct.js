import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AddProductStyle.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddproductForm = () => {
  const initialValues = {
    name: "",
    id: "",
    quntity: "",
    byingprice: "",
    sellingprice: "",
    category: "",
    min_stock_level: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" requird"),
    id: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required(" requird"),
    quntity: Yup.number().required(" requird"),
    byingprice: Yup.number().required(" requird"),
    sellingprice: Yup.number().required(" requird"),
    category: Yup.string().required(" requrid"),
    min_stock_level: Yup.number().required(" requird"),
    description: Yup.string().required(" requird"),
  });

  const onSubmit = (data) => {
    axios.post(`http://localhost:8801/product`, data).then((res) => {
      console.log(res);
    });
    console.log(data);
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
                    <ErrorMessage name="name" component="span" />
                  </td>
                  <td colSpan="3">
                    <Field
                      type="text"
                      // onChange={handleChange}
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
                    <ErrorMessage name="id" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="id"
                      placeholder="Produt Id"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label> Quantity </label>
                    <ErrorMessage name="quntity" component="span" />
                  </td>

                  <td>
                    <Field
                      type="number"
                      // onChange={handleChange}
                      name="quntity"
                      placeholder="Quntity"
                      className="inputshort"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Buying Price</label>
                    <ErrorMessage name="byingprice" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="byingprice"
                      placeholder="Price"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label>Selling price</label>
                    <ErrorMessage name="sellingprice" component="span" />
                  </td>

                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="sellingprice"
                      placeholder="Price"
                      className="inputshort"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Category</label>
                    <ErrorMessage name="category" component="span" />
                  </td>

                  <td>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="category"
                      placeholder="Select category"
                      className="inputshort"
                    />
                  </td>
                  <td>
                    <label>Min.stock level</label>
                    <ErrorMessage name="min_stock_level" component="span" />
                  </td>
                  <th>
                    <Field
                      type="text"
                      // onChange={handleChange}
                      name="min_stock_level"
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
                      name="description"
                      placeholder="Enter produt Description"
                      className="input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="b1">Add</button>
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
