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
    full_name: Yup.string().required("Customer Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile_no: Yup.number()
      .typeError("Mobile No must be a number")
      .required("Mobile No is required"),
  });

  const onSubmit = async (data, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/customers",
        data
      );
      console.log("Customer saved successfully");
      window.alert("Details saved");

      // Clear validation errors
      resetForm({ values: initialValues });
    } catch (error) {
      console.error("Failed to save customer:", error);
      window.alert("Failed to save customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="CustomerFcontainer01">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className=".Customerform ">
            <div className="formTopic">Add Customer</div>
            <label className="Customerlabel" htmlFor="full_name">
              Customer Name
            </label>
            <Field
              className="Customerinput01"
              id="full_name"
              name="full_name"
            />

            <ErrorMessage
              className="CustomerError"
              name="full_name"
              component="span"
              style={{ display: "block" }}
            />

            <label className="Customerlabel" htmlFor="email">
              Email
            </label>
            <Field className="Customerinput01" id="email" name="email" />

            <ErrorMessage
              className="CustomerError"
              name="email"
              component="span"
              style={{ display: "block" }}
            />

            <label className="Customerlabel" htmlFor="mobile_no">
              Mobile No
            </label>
            <Field
              className="Customerinput01"
              id="mobile_no"
              name="mobile_no"
            />

            <ErrorMessage
              className="CustomerError"
              name="mobile_no"
              component="span"
              style={{ display: "block" }}
            />

            <button
              className="CustomerAddbutton "
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </button>
            <button className="CustomerClearbutton" type="reset">
              Clear
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CustomerForm;
