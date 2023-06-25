// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import "./PurchersingStyle.css";
// import axios from "axios";

// function PurchersingForm() {
//   const initialValues = {
//     ppid: "",
//     ppname: "",
//     ppprice: "",
//     ppqty: "",
//     ppdescription: "",
//   };

//   const validationSchema = Yup.object().shape({
//     ppid: Yup.string().required("Required"),
//     ppname: Yup.string().required("Required"),
//     ppprice: Yup.number().required("Required"),
//     ppqty: Yup.number().required("Required"),
//   });

//   const [formData, setFormData] = useState([]);
//   const navigate = useNavigate();

//   const handleSave = () => {
//     formData.map((data) =>
//       axios
//         .put(`http://localhost:3001/product`, [
//           { productId: data.ppid, newQuantity: data.ppqty },
//         ])
//         .then((response) => {
//           console.log("Quantity updated successfully.");
//         })
//         .catch((error) => {
//           console.error("Error updating quantity: ", error);
//         })
//     );
//     // navigate("/Purchasing", { replace: true });
//   };

//   const handleSubmit = (values, { resetForm }) => {
//     setFormData((prevData) => [...prevData, values]);
//     resetForm();
//     // PUT request to update the quantity
//     const { ppid, ppqty } = values;
//   };

//   const handleClear = (resetForm) => {
//     setFormData([]);
//     resetForm();
//   };

//   return (
//     <div className="fulldive">
//       <div className="purchersingform">
//         <Formik
//           initialValues={initialValues}
//           onSubmit={handleSubmit}
//           validationSchema={validationSchema}
//         >
//           <Form>
//             <table>
//               <tbody>
//                 <tr>
//                   <td>
//                     <Field
//                       type="text"
//                       name="ppid"
//                       placeholder="Product Id"
//                       className="inputfield"
//                     />
//                     <ErrorMessage
//                       name="ppid"
//                       component="div"
//                       className="error"
//                     />
//                   </td>

//                   <td>
//                     <Field
//                       type="text"
//                       name="ppname"
//                       placeholder="Product Name"
//                       className="inputfield"
//                     />
//                     <ErrorMessage
//                       name="ppname"
//                       component="div"
//                       className="error"
//                     />
//                   </td>

//                   <td>
//                     <Field
//                       type="text"
//                       name="ppprice"
//                       placeholder="Purchasing price"
//                       className="inputfield"
//                     />
//                     <ErrorMessage
//                       name="ppprice"
//                       component="div"
//                       className="error"
//                     />
//                   </td>

//                   <td>
//                     <Field
//                       type="text"
//                       name="ppqty"
//                       placeholder="Quantity"
//                       className="inputfield"
//                     />
//                     <ErrorMessage
//                       name="ppqty"
//                       component="div"
//                       className="error"
//                     />
//                   </td>

//                   <td>
//                     <Field
//                       type="text"
//                       name="ppdescription"
//                       placeholder="Description"
//                       className="inputfield"
//                     />
//                     <ErrorMessage
//                       name="ppdescription"
//                       component="div"
//                       className="error"
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <button type="submit" className="purbutton01">
//               Add
//             </button>
//             <button type="reset" className="purbutton02">
//               Clear
//             </button>
//           </Form>
//         </Formik>
//       </div>

//       <div className="GRN">
//         <h4 className="header">GOOD RECEIVING NOTE (GRN)</h4>
//         <Formik>
//           <Form>
//             <div className="grnTable" >
//               <table>
//                 <thead>
//                   <tr>
//                     <th className="thead">Product Id</th>
//                     <th className="thead">Product Name</th>
//                     <th className="thead">Purchasing Price</th>
//                     <th className="thead">Quantity</th>
//                     <th className="thead">Description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {formData.map((data, index) => (
//                     <tr key={index}>
//                       <td className="tdata">{data.ppid}</td>
//                       <td className="tdata">{data.ppname}</td>
//                       <td className="tdata">{data.ppprice}</td>
//                       <td className="tdata">{data.ppqty}</td>
//                       <td className="tdata">{data.ppdescription}</td>
//                     </tr>
//                   ))}
//                   {Array.from({ length: 6 - formData.length }, (_, index) => (
//                     <tr key={`empty-${index}`}>
//                       <td className="tdata"></td>
//                       <td className="tdata"></td>
//                       <td className="tdata"></td>
//                       <td className="tdata"></td>
//                       <td className="tdata"></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <button onClick={handleSave} className="boru">
//               Save
//             </button>
//             <button
//               type="reset"
//               onClick={() => handleClear(Formik.resetForm)}
//               className="purbutton02"
//             >
//               Clear
//             </button>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default PurchersingForm;

/*
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./PurchersingStyle.css";
import axios from "axios";

function PurchersingForm() {
  const initialValues = {
    ppid: "",
    ppname: "",
    ppprice: "",
    ppqty: "",
    ppdescription: "",
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = (data, { resetForm }) => {
    setShowConfirmation(true);
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    ppid: Yup.string().required("Required"),
    ppname: Yup.string().required("Required"),
    ppprice: Yup.number().required("Required"),
    ppqty: Yup.number().required("Required"),
  });

  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  const handleSave = () => {
    formData.forEach((data) =>
      axios
        .put(`http://localhost:3001/product`, [
          { productId: data.ppid, newQuantity: data.ppqty },
        ])
        .then((response) => {
          console.log("Quantity updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating quantity: ", error);
        })
    );
    setShowConfirmation(false);
    // navigate("/Purchasing", { replace: true });
  };

  const handleSubmit = (values, { resetForm }) => {
    setFormData((prevData) => [...prevData, values]);
    resetForm();
    // PUT request to update the quantity
    const { ppid, ppqty } = values;
  };

  const handleClear = (resetForm) => {
    setFormData([]);
    resetForm();
  };

  return (
    <div className="fulldive">
      <div className="purchersingform">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Field
                      type="text"
                      name="ppid"
                      placeholder="Product Id"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppid"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppname"
                      placeholder="Product Name"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppname"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppprice"
                      placeholder="Purchasing price"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppprice"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppqty"
                      placeholder="Quantity"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppqty"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppdescription"
                      placeholder="Description"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppdescription"
                      component="div"
                      className="error"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="purbutton01">
              Add
            </button>
            <button type="reset" className="purbutton02">
              Clear
            </button>
          </Form>
        </Formik>
      </div>

      <div className="GRN">
        <h4 className="header">GOOD RECEIVING NOTE (GRN)</h4>
        <Formik
          initialValues={{}}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({})}
        >
          <Form>
            <div className="grnTable">
              <table>
                <thead>
                  <tr>
                    <th className="thead">Product Id</th>
                    <th className="thead">Product Name</th>
                    <th className="thead">Purchasing Price</th>
                    <th className="thead">Quantity</th>
                    <th className="thead">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.map((data, index) => (
                    <tr key={index}>
                      <td className="tdata">{data.ppid}</td>
                      <td className="tdata">{data.ppname}</td>
                      <td className="tdata">{data.ppprice}</td>
                      <td className="tdata">{data.ppqty}</td>
                      <td className="tdata">{data.ppdescription}</td>
                    </tr>
                  ))}
                  {Array.from({ length: 6 - formData.length }, (_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="submit" className="boru">
              Save
            </button>
            <button
              type="reset"
              onClick={() => handleClear(Formik.resetForm)}
              className="purbutton02"
            >
              Clear
            </button>
          </Form>
        </Formik>

        {showConfirmation && (
          <div className="modal-overlay">
            <div className="popup">
              <h3>Confirmation</h3>
              <p>Are you sure you want to Save this data?</p>
              <div className="">
                <button className="b1" onClick={handleSave}>
                  Confirm
                </button>
                <button
                  className="b2"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchersingForm;
*/

import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./PurchersingStyle.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function PurchersingForm() {
  const initialValues = {
    ppid: "",
    ppname: "",
    ppprice: "",
    ppqty: "",
    ppdescription: "",
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  const onSubmit = (data, { resetForm }) => {
    setShowConfirmation(true);
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    ppid: Yup.string().required("Required"),
    ppname: Yup.string().required("Required"),
    ppprice: Yup.number().required("Required"),
    ppqty: Yup.number().required("Required"),
  });

 

  const handleSave = () => {
    formData.forEach((data) =>
      axios
        .put(`http://localhost:3001/product`, [
          { productId: data.ppid, newQuantity: data.ppqty },
        ])
        .then((response) => {
          console.log("Quantity updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating quantity: ", error);
        })
    );
    setShowConfirmation(false);
    generatePDF();
    // navigate("/Purchasing", { replace: true });
  };

  const handleSubmit = (values, { resetForm }) => {
    setFormData((prevData) => [...prevData, values]);
    resetForm();
    // PUT request to update the quantity
    const { ppid, ppqty } = values;
  };

  const handleClear = (resetForm) => {
    setFormData([]);
    resetForm();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("GOOD RECEIVING NOTE (GRN)", 10, 10);
    doc.autoTable({
      head: [
        ["Product Id", "Product Name", "Purchasing Price", "Quantity", "Description"],
      ],
      body: formData.map((data) => [
        data.ppid,
        data.ppname,
        data.ppprice,
        data.ppqty,
        data.ppdescription,
      ]),
    });
  
    const pdfData = doc.output("datauristring");
    const newWindow = window.open();
    newWindow.document.write('<iframe src="' + pdfData + '" width="100%" height="100%"></iframe>');
  };
  return (
    <div className="fulldive">
      <div className="purchersingform">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Field
                      type="text"
                      name="ppid"
                      placeholder="Product Id"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppid"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppname"
                      placeholder="Product Name"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppname"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppprice"
                      placeholder="Purchasing price"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppprice"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppqty"
                      placeholder="Quantity"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppqty"
                      component="div"
                      className="error"
                    />
                  </td>

                  <td>
                    <Field
                      type="text"
                      name="ppdescription"
                      placeholder="Description"
                      className="inputfield"
                    />
                    <ErrorMessage
                      name="ppdescription"
                      component="div"
                      className="error"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="purbutton01">
              Add
            </button>
            <button type="reset" className="purbutton02">
              Clear
            </button>
          </Form>
        </Formik>
      </div>

      <div className="GRN">
        <h4 className="header">GOOD RECEIVING NOTE (GRN)</h4>
        <Formik
          initialValues={{}}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({})}
        >
          <Form>
            <div className="grnTable">
              <table>
                <thead>
                  <tr>
                    <th className="thead">Product Id</th>
                    <th className="thead">Product Name</th>
                    <th className="thead">Purchasing Price</th>
                    <th className="thead">Quantity</th>
                    <th className="thead">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.map((data, index) => (
                    <tr key={index}>
                      <td className="tdata">{data.ppid}</td>
                      <td className="tdata">{data.ppname}</td>
                      <td className="tdata">{data.ppprice}</td>
                      <td className="tdata">{data.ppqty}</td>
                      <td className="tdata">{data.ppdescription}</td>
                    </tr>
                  ))}
                  {Array.from({ length: 6 - formData.length }, (_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                      <td className="tdata"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="submit" className="boru">
              Save
            </button>
            <button
              type="reset"
              onClick={() => handleClear(Formik.resetForm)}
              className="purbutton02"
            >
              Clear
            </button>
          </Form>
        </Formik>

        {showConfirmation && (
          <div className="modal-overlay">
            <div className="popup">
              <h3>Confirmation</h3>
              <p>Are you sure you want to Save this data?</p>
              <div className="">
                <button className="b1" onClick={handleSave}>
                  Confirm
                </button>
                <button
                  className="b2"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      {/* PDF Preview */}
      <div>
          <iframe
            ref={pdfRef}
            title="PDF Preview"
            className="pdf-preview"
          />
        </div>


      </div>
    </div>
  );
}

export default PurchersingForm;