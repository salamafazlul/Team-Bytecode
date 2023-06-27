import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./RemoveStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Removeform = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
  });

  const initialValues = {
    id: "",
    name: "",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleClear = (event) => {
    event.preventDefault();
    setProduct({ id: "", name: "" });
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .matches(/^[a-zA-Z]{2}[0-9]{4}$/, "ID must be in format XX1234")
      .required("required"),
    name: Yup.string().required("required"),
  });

  //delete product
  {/*const handleConfirm = async (values, { setSubmitting }) => {
    console.log(product);
    await axios.delete(`http://localhost:3001/Product/${product.id}`);
    // navigate("/category", { replace: true });
  };*/}

  const handleConfirm = async () => {
    setShowPopup(false);
    try {
      await axios.delete(`http://localhost:3001/Product/${product.id}`);
      setProduct({ id: "", name: "" });
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  //get product name
  const [productName, setProductName] = useState("");
  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/Product/${id}`);
      const productData = response.data;
      if (productData) {
        setProduct({ ...product, name: productData.Product_name });
        setProductName(productData.Product_name); // Set the fetched product name
      }
    } catch (error) {
      console.log("Error retrieving product details:", error);
    }
  };

  const handleProductIdBlur = (event) => {
    const { value } = event.target;
    getProductDetails(value);
  };

  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data, { resetForm }) => {
    setShowPopup(true);
    resetForm();
  };

  return (
    <>
    <div className="removeform">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="Purchers">
          <h3 className="title2"> Remove Product</h3>

          <table>
            <tbody>
              <tr>
                <td>Product ID</td>
                <ErrorMessage name="id" component="span" />
                <td>
                  <Field
                    type="text"
                    name="id"
                    size={50}
                    placeholder="code"
                    className="barshort"
                    value={product.id}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission
                        getProductDetails(e.target.value);
                      }
                    }}
                    
                  />
                </td>
                <td>Product name</td>
                <ErrorMessage name="name" component="span" />
                <td>
                  <Field
                    type="text"
                    name="name"
                    size={50}
                    placeholder="Product Name"
                    className="bar"
                    value={product.name}
                    onChange={(event) => {
                      handleInputChange(event);
                      setProductName(event.target.value);
                    }}                 
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button  type="submit" className="b1">
            Remove
          </button>
          <button type="reset" className="bb2" onClick={handleClear}>
            Clear
          </button>
        </Form>
      </Formik>
      
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
};

export default Removeform;
