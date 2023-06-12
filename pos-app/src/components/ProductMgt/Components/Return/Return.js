import React from "react";
import "./ReturnStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Rform = () => {
  const initialValues = {
    ProductID: "",
    ProductName: "",
    QTY: "",
    Reason: "",
  };

  const validationSchema = Yup.object().shape({
    ProductID: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required(" requird"),
    ProductName: Yup.string().required(" requird"),
    QTY: Yup.number().required(" requird"),
    Reason: Yup.string().required(" requird"),
  });

  const onSubmit = (data, { resetForm } ) => {
    console.log(data);
    resetForm();
  };

  return (
    <>
      <div className="rform">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="Purchers">
            <h3 className="title2"> Return or Damage</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Product code</label>
                    <ErrorMessage name="ProductID" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      name="ProductID"
                      size={50}
                      placeholder="select code"
                      className="barshort"
                    />
                  </td>
                  <td>
                    <label>Product name</label>
                    <ErrorMessage name="ProductName" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      name="ProductName"
                      size={50}
                      placeholder="Enter product name"
                      className="bar"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>QTY</label>
                    <ErrorMessage name="QTY" component="span" />
                  </td>
                  <td>
                    <Field
                      type="number"
                      name="QTY"
                      size={50}
                      placeholder="Quntity"
                      className="barshort "
                    />
                  </td>
                  <td>
                    <label>Reason</label>
                    <ErrorMessage name="Reason" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      name="Reason"
                      size={50}
                      placeholder="Reason"
                      className="bar"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="bb1">Update</button>
            <button type="reset" className="bb2">Clear</button>
          </Form>
        </Formik>
      </div>
      {/* <hr className="hrule" /> */}
    </>
  );
};

export default Rform;
