import React from "react";
import "./CustomerForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CustomerForm() {
  const initialValues = {
    full_name: "",
    email: "",
    mobile_no: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required(),
    email: Yup.string().email().required(),
    mobile_no: Yup.number().typeError("Mobile No must be a number").required(),
  });

  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/Customer", data).then((response) => {
      console.log("It works");
      window.alert("Details saved");
      resetForm();
    });
  };

  return (
    <div className="container01">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <div className="formTopic">Add Customer</div>
          <label className="lable">Customer Name</label>
          <Field
            className="input01"
            id="inputCreateCustomer"
            name="full_name"
          />
          <ErrorMessage
            className="Error"
            name="full_name"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">Email</label>
          <Field className="input01" id="inputCreateCustomer" name="email" />
          <ErrorMessage
            className="Error"
            name="email"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">Mobile No</label>
          <Field
            className="input01"
            id="inputCreateCustomer"
            name="mobile_no"
          />
          <ErrorMessage
            className="Error"
            name="mobile_no"
            component="span"
            style={{ display: "block" }}
          />

          <button className="Addbutton" type="submit">
            Add
          </button>
          <button className="Clearbutton" type="reset">
            Clear
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CustomerForm;
