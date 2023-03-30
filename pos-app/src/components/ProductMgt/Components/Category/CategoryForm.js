import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CategoryForm() {
  const [name, setName] = useState([]);
  const initialValues = {
    Category_ID: "",
    Category_name: "",
  };

  const handleSubmit = async (values) => {
    const response = await axios
      .post("http://localhost:3001/Category", values)
      .then(() => {
        axios.get("http://localhost:3001/Category").then((response) => {
          setName(response.data);
        });
      });
  };

  return (
    <div>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={null}
        initialValues={initialValues}
      >
        <Form>
          <h3>Category Create</h3>
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
                    // value={Category.ID}
                  />
                </td>
              </tr>

              <tr>
                <td>Product Name</td>
                <td>
                  <Field
                    type="text"
                    name="Category_name"
                    size={20}
                    placeholder="Category Name"
                    className=""
                    // value={Categor.ID}
                  />
                  {/* <span>{name}</span> */}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <button>submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CategoryForm;
