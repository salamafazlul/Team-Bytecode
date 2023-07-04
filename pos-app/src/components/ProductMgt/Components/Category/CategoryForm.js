import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CategoryStyle.css";

function CategoryForm() {
  const [name, setName] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState();

  const onSubmit = (data, { resetForm }) => {
    setData(data);
    setShowPopup(true);
    resetForm();
  };

  const initialValues = {
    category_id: categoryId,
    category_name: "",
  };

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required(" requird"),
    category_id: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required(" requird"),
  });


  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:3001/Product_Category",
      data
    );
    // axios.get("http://localhost:3001/Product_Category").then((response) => {
    //   setName(response.data);
    // });
    setData("");
    setShowPopup(false);
    window.location.reload();
  };

  const handleCategoryNameChange = (event, setFieldValue) => {
    const { value } = event.target;
    const categoryId =
      value.slice(0, 2).toUpperCase() +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    setCategoryId(categoryId);
    setFieldValue("category_id", categoryId);
    setFieldValue("category_name", value);
  };

  return (
    <>
      <div className="categorycreate">
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {({ setFieldValue }) => (
            <Form>
              <h3>Category Create</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                    <label>Category Name</label>
                    <ErrorMessage name="category_name" component="span" />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="category_name"
                        size={20}
                        placeholder="Category Name"
                        className="input"
                        onChange={(event) =>
                          handleCategoryNameChange(event, setFieldValue)
                        }
                      />
                    </td>
                    <td><button className="b1" type="submit">Submit</button></td>
                  </tr>

                  <tr>
                    <td>
                      <label>Category ID</label>
                    <ErrorMessage name="category_id" component="span" />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="category_id"
                        size={20}
                        placeholder="Category ID"
                        className="input"
                        readOnly
                      />
                    </td>
                    <td><button className="b2" type="reset"> Clear </button></td>
                  </tr>
                </tbody>
              </table>
            </Form>
          )}
        </Formik>
        <hr className="hrule"/>
      </div>
      {showPopup && (
        <div className="modal-overlay">
          <div className="popup">
            <h3>Confirmation</h3>
            <p>Are you sure you want to Delete this product?</p>
            <div className="">
              <button className="b1" onClick={handleSubmit}>
                Confirm
              </button>
              <button className="b2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryForm;
