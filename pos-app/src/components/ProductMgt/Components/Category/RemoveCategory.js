// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./RemoveCategoryStyle.css";

// function RemoveCategory() {
//   const [categoryName, setCategoryName] = useState('');
//   const initialValues = {
//     Category_ID: "",
//     Category_name: "",
//   };

//   const navigate = useNavigate();

//   const onSubmit = async (values) => {
//     await axios.delete(
//       `http://localhost:3001/category/${values.Category_ID}`
//     );
//     navigate("/category", { replace: true });
//   };

//   //get category name
//   const [category, setCategory]=useState({
//     Category_ID: "",
//     Category_name: "",
//   });
//   const getCategoryDetails = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:3001/category/${id}`);
//       const categoryData = response.data;
//       if (categoryData) {
//         setCategory({ ...category, name: categoryData.Category_name });
//         setCategoryName(categoryData.category_name); // Set the fetched product name
//       }
//     } catch (error) {
//       console.log("Error retrieving category details:", error);
//     }
//   };

//   const handleCategoryIdBlur = (event) => {
//     const { value } = event.target;
//     getCategoryDetails(value);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCategory({ ...category, [name]: value });
//   };

//   // const onCategoryIdChange = async (event) => {
//   //   const { value } = event.target;
//   //   if (event.key === 'Enter') {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:3001/category/${value}`
//   //       );
//   //       setCategoryName(response.data.name);
//   //     } catch (error) {
//   //       setCategoryName('');
//   //     }
//   //   }
//   // };

//   return (
//     <div className="category_remove_table">
//       <Formik initialValues={initialValues} onSubmit={onSubmit}>
//         {({ errors, touched }) => (
//           <Form>
//             <h3>Category Remove</h3>
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Category ID</td>
//                   <td>
//                     <Field
//                       type="text"
//                       name="Category_ID"
//                       size={20}
//                       placeholder="Category ID"
//                       className=""
//                       onKeyPress={(e) => {
//                         if (e.key === "Enter") {
//                           e.preventDefault(); // Prevent form submission
//                           getCategoryDetails(e.target.value);
//                         }
//                       }}
//                     />
//                     <ErrorMessage name="Category_ID" />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Category Name</td>
//                   <td>
//                     <Field
//                       type="text"
//                       name="Category_name"
//                       placeholder="Category Name"
//                       className=""
//                       value={category.name}
//                       // disabled={!categoryName}
//                       onChange={(event) => {
//                         handleInputChange(event);
//                         setCategoryName(event.target.value);
//                       }}
//                     />
//                     <ErrorMessage name="Category_name" />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <button type="submit">Remove</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default RemoveCategory;

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
    await axios.delete(`http://localhost:3001/category/${categoryID}`);
    setShowPopup(false);
    setCategoryName("");
    navigate("/category", { replace: true });
  };

  const getCategoryName = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/category/${id}`);
      const categoryData = response.data;
      if (categoryData) {
        setCategoryName(categoryData.Category_name);
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
                        className=""
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
                        onChange={(e) => setCategoryName(e.target.value)}
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
