import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CategoryForm() {
  return (
    <div>
      <Formik>
        <Form>
          <h3>Category Create</h3>
          <table>
            <tbody>
              <tr>
                <td>Category ID</td>
                <td>
                  <Field
                    type="text"
                    name="PID"
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
                    name="CName"
                    size={20}
                    placeholder="Category Name"
                    className=""
                    // value={Categor.ID}
                  />
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
