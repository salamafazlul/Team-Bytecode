import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CategoryStyle.css";

function CategoryForm() {
  const [name, setName] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const initialValues = {
    Category_ID: categoryId,
    Category_name: "",
  };

  const handleSubmit = async (values) => {
    const response = await axios.post("http://localhost:3001/Category", values);
    axios.get("http://localhost:3001/Category").then((response) => {
      setName(response.data);
    });
  };

  const handleCategoryNameChange = (event, setFieldValue) => {
    const { value } = event.target;
    const categoryId =
      value.slice(0, 2).toUpperCase() +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    setCategoryId(categoryId);
    setFieldValue("Category_ID", categoryId);
    setFieldValue("Category_name", value);
  };

  return (
    <div className="categorycreate">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={null}
        initialValues={initialValues}
      >
        {({ setFieldValue }) => (
          <Form>
            <h3>Category Create</h3>
            <table>
              <tbody>
                <tr>
                  <td>Category Name</td>
                  <td>
                    <Field
                      type="text"
                      name="Category_name"
                      size={20}
                      placeholder="Category Name"
                      className=""
                      onChange={(event) =>
                        handleCategoryNameChange(event, setFieldValue)
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <td>Category ID</td>
                  <td>
                    <Field
                      type="text"
                      name="Category_ID"
                      size={20}
                      placeholder="Category ID"
                      className=""
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <button type="submit">Submit</button>
              <button type="reset"> Clear </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CategoryForm;
