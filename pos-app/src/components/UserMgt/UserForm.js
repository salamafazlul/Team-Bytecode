import React, { useState } from "react";
import "./UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function UserForm() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("error");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          full_name: values.full_name,
          address: values.address,
          email: values.email,
          mobile_no: values.mobile_no,
          user_password: values.user_password,
          user_role: values.user_role,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "User added Successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "250px",
        }).then(() => {
          resetForm();
          window.location.href = "/ViewUsers";
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
        Swal.fire({
          position: "center",
          icon: "error",
          text: error.response.data.error,
          showConfirmButton: false,
          timer: 1200,
          width: "250px",
        });
      } else {
        setError("An error occurred");
      }
      console.log("email error: ", error);
    }
  };

  const initialValues = {
    full_name: "",
    address: "",
    email: "",
    mobile_no: "",
    user_role: "",
    user_password: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required(),
    email: Yup.string().email().required(),
    address: Yup.string().required(),
    mobile_no: Yup.number().typeError("Mobile No must be a number").required(),
    user_role: Yup.string().required(),
    user_password: Yup.string().min(4).max(6).required(),
  });

  return (
    <div className="UserFcontainer01">
      <button
        className="UserFormButton"
        onClick={() => (window.location.href = "/ViewUsers")}
      >
        View User
      </button>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="Userform">
          <div className="UserformTopic">Add user</div>
          <label className="Userlable01">Employee Name</label>
          <Field
            className="UserFinput01"
            id="inputCreateUsers"
            name="full_name"
          />
          <ErrorMessage
            className="Error"
            name="full_name"
            component="span"
            style={{ display: "block" }}
          />

          <label className="Userlable01">Address</label>
          <Field
            className="UserFinput01"
            id="inputCreateUsers"
            name="address"
          />
          <ErrorMessage
            className="Error"
            name="address"
            component="span"
            style={{ display: "block" }}
          />

          <label className="Userlable01">Email</label>
          <Field className="UserFinput01" id="inputCreateUsers" name="email" />
          <ErrorMessage
            className="Error"
            name="email"
            component="span"
            style={{ display: "block" }}
          />

          <label className="Userlable01">Mobile No</label>
          <Field
            className="UserFinput01"
            id="inputCreateUsers"
            name="mobile_no"
          />
          <ErrorMessage
            className="Error"
            name="mobile_no"
            component="span"
            style={{ display: "block" }}
          />

          <label className="Userlable01">User Role</label>
          <Field
            as="select"
            className="UserFdropDown01 "
            id="inputCreateUsers"
            name="user_role"
          >
            <option value="">Select User Role</option>
            <option value="cashier">Cashier</option>
            <option value="storekeeper">Storekeeper</option>
          </Field>
          <ErrorMessage
            className="Error"
            name="user_role"
            component="span"
            style={{ display: "block" }}
          />

          <label className="Userlable01">Password</label>
          <Field
            className="UserFinput01"
            id="inputCreateUsers"
            name="user_password"
            type="password"
          />
          <ErrorMessage
            className="UserFError"
            name="user_password"
            component="span"
            style={{ display: "block" }}
          />

          <button className="UserAddbutton01" type="submit">
            Add
          </button>
          <button className="UserClearbutton01" type="reset">
            Clear
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default UserForm;
