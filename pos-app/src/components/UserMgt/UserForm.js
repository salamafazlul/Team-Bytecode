import React from "react";
import "./UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm() {
  const initialValues = {
    full_name: "",
    address: "",
    email: "",
    mobile_no: "",
    user_role: "",
    user_password: "",
  };

  const validationSchema = Yup.object().shape({
    // full_name: Yup.string().required(),
    // email: Yup.string().email().required(),
    // address: Yup.string().required(),
    // mobile_no: Yup.number().required(),
    // user_role: Yup.string().required(),
    // user_password: Yup.string().min(4).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/Users", data).then((response) => {
      console.log("It works");
      window.alert("Details saved");
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
          <div className="formTopic">Add user</div>
          <label>Employee Name</label>
          <ErrorMessage name="full_name" component="span" />
          <Field className="input01" id="inputCreateUsers" name="full_name" />

          <label>Address</label>
          <ErrorMessage name="address" component="span" />
          <Field className="input01" id="inputCreateUsers" name="address" />

          <label>Email</label>
          <ErrorMessage name="email" component="span" />
          <Field className="input02" id="inputCreateUsers" name="email" />

          <label>Mobile No</label>
          <ErrorMessage name="mobile_no" component="span" />
          <Field className="input02" id="inputCreateUsers" name="mobile_no" />

          <label>User Role</label>
          <Field
            as="select"
            className="dropDown01"
            id="inputCreateUsers"
            name="user_role"
          >
            <option value="">Select a User Role</option>
            <option value="storekeeper">Storekeeper</option>
            <option value="cashier">Cashier</option>
          </Field>

          <label>Password</label>
          <ErrorMessage name="user_password" component="span" />
          <Field
            className="input02"
            id="inputCreateUsers"
            name="user_password"
            type="password"
          />

          <button className="Clearbutton" type="submit">
            Add
          </button>
          <button className="Addbutton" type="reset">
            Clear
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default UserForm;
