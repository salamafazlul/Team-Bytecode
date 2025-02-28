import React, { useState } from "react";
import "./EditStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Rform = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(null);

  const initialValues = {
    ProductID: "",
    ProductName: "",
    Reorder: "",
    New_price: "",
  };

  // const validationSchema = Yup.object().shape({
  //   ProductID: Yup.string()
  //     .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
  //     .required(" requird"),
  //   ProductName: Yup.string().required(" requird"),
  //   Reorder: Yup.number()
  //     .required(" requird")
  //     .min(0, "Stock must be a positive value"),
  //   New_price: Yup.number().required(" requird"),
  // });

  //get product name
  const [productName, setProductName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Product/edit/${id}`
      );
      const productData = response.data;
      if (productData) {
        setProductName(productData.Product_name); // Set the fetched product name
        setSellingPrice(productData.selling_price); // Set the fetched product name
        setSelectedOption(productData.reorder_status);
      }
    } catch (error) {
      console.log("Error retrieving product details:", error);
    }
  };

  const handleSave = async (form) => {
    const editing = {
      ProductID: form.ProductID,
      ProductName: productName,
      Reorder: selectedOption,
      New_price: sellingPrice,
    };
    resetForm();
    // form = {ProductID: "PO0369", ProductName: "", Reorder: "", New_price: ""}
    setShowPopup(false);
    try {
      const [putResponse] = await axios.all([
        axios.put(`http://localhost:3001/product/edit`, editing),
      ]);

      console.log(putResponse.data); // Response from PUT request
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handleSellingPrice = (event) => {
    setSellingPrice(event.target.value);
  };

  const resetForm = () => {
    setProductName("");
    setSellingPrice(0);
    setSelectedOption("");
  };

  return (
    <>
      <div className="rform">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={""}
        >
          <Form className="Purchers">
            <h3 className="title2"> Edit Product</h3>
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
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Prevent form submission
                          getProductDetails(e.target.value);
                        }
                      }}
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
                      value={productName}
                      onChange={handleProductNameChange}
                    />
                  </td>
                  <td>
                    <button className="bb1" typ="button">
                      Update
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Reorder Status</label>
                    <ErrorMessage name="Reorder" component="span" />{" "}
                  </td>
                  {/* </td>
                  <td>
                    <Field
                      type="number"
                      name="Reorder"
                      size={50}
                      placeholder="Quntity"
                      className="barshort "
                    /> */}
                  <td>
                    <Field
                      as="select"
                      name="Reorder"
                      className="barshort "
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <option value="">--select option--</option>
                      <option value="Order in progres">Order in progres</option>
                      <option value="No Status">No Status</option>
                      <option value="Not Orded">Not Orded</option>
                      <option value="No Status">No Status</option>
                    </Field>    
                  </td>
                  <td>
                    <label>Selling Price</label>
                    <ErrorMessage name="New_price" component="span" />
                  </td>
                  <td>
                    <Field
                      type="number"
                      name="New_price"
                      size={50}
                      placeholder="Enter New price"
                      className="bar"
                      value={sellingPrice}
                      onChange={handleSellingPrice}
                    />
                  </td>
                  <td>
                    <button type="reset" className="bb2" onClick={resetForm}>
                      Clear
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </Formik>
        <hr className="hrule" />
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
