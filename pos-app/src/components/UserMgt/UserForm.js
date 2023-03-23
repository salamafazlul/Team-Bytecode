import React from "react";
import "./UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm() {
  const initialValues = {
    employee_name: "",
    address: "",
    email: "",
    mobile_no: "",
    user_group: "",
    user_status: "",
    user_name: "",
    user_password: "",
  };

  const validationSchema = Yup.object().shape({
    employee_name: Yup.string().required(),
    email: Yup.string().email().required(),
    address: Yup.string().required(),
    mobile_no: Yup.number().required(),
    user_group: Yup.string().required(),
    user_status: Yup.string().required(),
    user_name: Yup.string().required(),
    user_password: Yup.string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one symbol"
      )
      .required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/Users", data).then((response) => {
      console.log("It works");
    });
  };

  return (
    <div className="container01">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="container02">
          <label>Employee Name</label>
          <ErrorMessage name="employee_name" component="span" />
          <Field
            className="input01"
            id="inputCreateUsers"
            name="employee_name"
          />

          <label>Address</label>
          <ErrorMessage name="address" component="span" />
          <Field className="input01" id="inputCreateUsers" name="address" />

          <label>Email</label>
          <ErrorMessage name="email" component="span" />
          <Field className="input02" id="inputCreateUsers" name="email" />

          <label>Mobile No</label>
          <ErrorMessage name="mobile_no" component="span" />
          <Field className="input02" id="inputCreateUsers" name="mobile_no" />

          <label>User Group</label>
          <ErrorMessage name="user_group" component="span" />
          <Field className="input02" id="inputCreateUsers" name="user_group" />

          <label>Status</label>
          <ErrorMessage name="user_status" component="span" />
          <Field className="input02" id="inputCreateUsers" name="user_status" />

          <label>User Name</label>
          <ErrorMessage name="user_name" component="span" />
          <Field className="input02" id="inputCreateUsers" name="user_name" />

          <label>Password</label>
          <ErrorMessage name="user_password" component="span" />
          <Field
            className="input02"
            id="inputCreateUsers"
            name="user_password"
          />

          <button className="button" type="submit">
            Add
          </button>
          <button className="button" type="submit">
            Clear
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default UserForm;
