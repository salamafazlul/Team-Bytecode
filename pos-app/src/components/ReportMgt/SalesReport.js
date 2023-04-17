import React, { useState } from 'react';
import './Form.css';
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from 'yup';

export default function SalesReport() {
  const [productDetails, setProductDetails] = useState([]);

  const initialValues = {
    product_id: "",
    product_name: "",
    start_date: "",
    end_date: "",
  };

  const validationSchema = Yup.object().shape({
    product_id: Yup.number().integer().min(1).max(200).required("  Please input a valid product ID."),
    product_name: Yup.string().required("  Please input a product name."),
    start_date: Yup.date().required("  Please input a valid date."),
    end_date: Yup.date()
      .required("  Please input a valid total amount.")
      .when("start_date", (start_date, schema) => {
        return start_date
          ? schema.min(start_date, "End date must be after start date")
          : schema;
      }),
  });
  

  const onSubmit = (data, { resetForm }) => {
    setProductDetails([...productDetails, data]);
    resetForm();
  }

  return (
    <div className='form'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>

            <h3> Report</h3>
            <label>Product ID</label>
            <ErrorMessage name="product_id" component="span" onBlur={handleBlur} onFocus={handleChange} /><br></br>
            <Field
              type="number"
              name="product_id"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.product_id}
              placeholder="Enter product ID"
            /><br />

            <label>Product Name</label>
            <ErrorMessage name="product_name" component="span" onBlur={handleBlur} onFocus={handleChange} /><br></br>
            <Field
              type="string"
              name="product_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.product_name}
              placeholder="Enter product name"
            /><br />

            <label>Start Date</label>
            <ErrorMessage name="start_date" component="span" onBlur={handleBlur} onFocus={handleChange} /><br></br>
            <Field
              type="date"
              name="start_date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.start_date}
              placeholder="Enter start date"
            /><br />

            <label>End Date</label>
            <ErrorMessage name="end_date" component="span" onBlur={handleBlur} onFocus={handleChange} /><br></br>
            <Field
              type="date"
              name="end_date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.end_date}
              placeholder="Enter end date"
            /><br />

            <button type="submit" disabled={isSubmitting}>Add</button><button type="reset" disabled={isSubmitting}>Clear</button>
          </Form>
        )}
      </Formik>

      <center><table>
            <tr>
                <th>Product ID</th>
                <th>Date</th>
                <th>Purchasing Price</th>
                <th>Selling Price</th>
                <th>Number of sales</th>
                <th>Value</th>
                <th>Cost of Sales</th>
                <th>Discount</th>
                <th>Profit</th>
            </tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>

        </table>
        <br></br>
          <button>Print Report</button>
          <button>Send mail</button></center>




    </div>
  )
}
