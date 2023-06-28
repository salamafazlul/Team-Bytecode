import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RemoveCategoryStyle.css";

function RemoveCategory() {
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data, { resetForm }) => {
    setShowPopup(true);
    resetForm();
  };

  const [categoryName, setCategoryName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const initialValues = {
    Category_ID: "",
    Category_name: "",
  };
  const navigate = useNavigate();

  const handleConfirm = async (values) => {
    await axios.delete(`http://localhost:3001/Product_Category/${categoryID}`);
    setShowPopup(false);
    setCategoryName("");
    navigate("/category", { replace: true });
    window.location.reload();
  };

  const getCategoryName = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Product_Category/${id}`
      );
      const categoryData = response.data;
      if (categoryData) {
        setCategoryName(categoryData.category_name);
      }
    } catch (error) {
      console.log("Error retrieving category name:", error);
      setCategoryName("");
    }
  };

  return (
    <>
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
                        placeholder="Category ID"
                        className="input"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setCategoryID(e.target.value);
                            getCategoryName(e.target.value);
                          }
                        }}
                      />
                      <ErrorMessage name="Category_ID" />
                    </td>
                    <td><button className="b1" type="submit">
                Remove
              </button></td>
                  </tr>
                  <tr>
                    <td>Category Name</td>
                    <td>
                      <Field
                        type="text"
                        name="Category_name"
                        placeholder="Category Name"
                        className="input"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                      <ErrorMessage name="Category_name" />
                    </td>
                    <td><button className="b2" type="reset">
                clear
              </button></td>
                  </tr>
                </tbody>
              </table>
            </Form>
          )}
        </Formik>
        <hr className="hrule" />
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="popup">
            <h3>Confirmation</h3>
            <p>Are you sure you want to Delete this product?</p>
            <div className="">
              <button className="b1" onClick={handleConfirm}>
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

export default RemoveCategory;
