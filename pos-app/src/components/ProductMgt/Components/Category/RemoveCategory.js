import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RemoveCategoryStyle.css";
function RemoveCategory() {

  const [categoryName, setCategoryName] = useState('');

  const initialValues = {
    Category_ID: "",
    Category_name: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await axios.delete(
      `http://localhost:3001/category/${values.Category_ID}`
    );
    navigate("/category", { replace: true });
  };

  
  const onCategoryIdChange = async (event) => {
    const { value } = event.target;
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(
          `http://localhost:3001/category/${value}`
        );
        setCategoryName(response.data.name);
      } catch (error) {
        setCategoryName('');
      }
    }
  };




  return (
    <div className="category_remove_table">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <h3>Category Remove</h3>
            <table>
              <tbody>
                <tr>
                  <td>Category ID</td>
                  <td>
                    <Field
                      type="text"
                      name="Category_ID"
                      size={20}
                      placeholder="ProductID"
                      className=""
                      onKeyPress={onCategoryIdChange}
                    />
                    <ErrorMessage name="Category_ID" />
                  </td>
                </tr>
                <tr>
                  <td>Category Name</td>
                  <td>
                    <Field
                      type="text"
                      name="Category_name"
                      placeholder="Category Name"
                      className=""
                      value={categoryName}
                      disabled={!categoryName}
                    />
                    <ErrorMessage name="Category_name" />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Remove</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RemoveCategory;
