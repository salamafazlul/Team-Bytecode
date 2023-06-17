import React, { useState } from "react";
import "./ReturnStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Rform = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(null);

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

  //update part
  // const [formData, setFormData] = useState([]);
  // const handleSave = (form) => {
  //   axios.put(`http://localhost:3001/product/return`, form).then((res) => {
  //     console.log(res.data);

  //   });
  // };

  const handleSave = async (form) => {
    setShowPopup(false);
    try {
      const [putResponse, postResponse] = await axios.all([
        axios.put(`http://localhost:3001/product/return`, form),
        axios.post(`http://localhost:3001/Return`, form),
      ]);

      console.log(putResponse.data); // Response from PUT request
      console.log(postResponse.data); // Response from POST request
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data, { resetForm }) => {
    // console.log(data);
    setShowPopup(true);
    setFormData(data);
    // setFormData((prevData) => [...prevData, data]);
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
                    <label>Product ID</label>
                    <ErrorMessage name="ProductID" component="span" />
                  </td>
                  <td>
                    <Field
                      type="text"
                      name="ProductID"
                      size={50}
                      placeholder="Enter Product ID"
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

            <button className="bb1" typ="button">
              Update
            </button>
            <button type="reset" className="bb2">
              Clear
            </button>
          </Form>
        </Formik>
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="popup">
            <h3>Confirmation</h3>
            <p>Are you sure you want to retern this item?</p>
            <div className="">
              <button className="b1" onClick={() => handleSave(formData)}>
                Confirm
              </button>
              <button className="b2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <hr className="hrule" /> */}
    </>
  );
};

export default Rform;
