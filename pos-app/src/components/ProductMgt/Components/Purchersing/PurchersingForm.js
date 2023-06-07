// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// function PurchersingForm() {
//   const initialValues = {
//     ppid: "",
//     ppname: "",
//     ppprice: "",
//     ppqty: "",
//     ppdescription: "",
//   };

//   return (
//     <div>
//       <Formik initialValues={initialValues}>
//         <Form>
//           <table>
//             <tr>
//               <td>
//                 <Field
//                   type="text"
//                   name="ppid"
//                   placeholder="Produt Id"
//                   // Value= {Purchersing.id}
//                   className=""
//                 />
//               </td>

//               <td>
//                 <Field
//                   type="text"
//                   name="ppname"
//                   placeholder="Produt Name"
//                   className=""
//                 />
//               </td>

//               <td>
//                 <Field
//                   type="text"
//                   name="ppprice"
//                   placeholder="Purchersing price"
//                   className=""
//                 />
//               </td>

//               <td>
//                 <Field
//                   type="text"
//                   name="ppqty"
//                   placeholder="Quntitiy"
//                   className=""
//                 />
//               </td>

//               <td>
//                 <Field
//                   type="text"
//                   name="ppdescription"
//                   placeholder="Descripton"
//                   className=""
//                 />
//               </td>

//               <td>
//                 <button type="submit" className="">
//                   Add
//                 </button>
//               </td>
//               <td>
//                 <button type="submit" className="">
//                   Clear
//                 </button>
//               </td>
//             </tr>
//           </table>
//           <h4>Good Receving Note</h4>
//           <table>
//             <tbody>
//               <tr>
//                 <td>PRODUCT ID</td>
//                 <td>PRODUCT NAME</td>
//                 <td>QTY</td>
//                 <td>PURCH.PRICE</td>
//                 <td>SEL.PRICE</td>
//                 <td>NOTE</td>
//               </tr>
//             </tbody>
//           </table>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default PurchersingForm;


// 

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function PurchersingForm() {
  const initialValues = {
    ppid: "",
    ppname: "",
    ppprice: "",
    ppqty: "",
    ppdescription: "",
  };

  const [formData, setFormData] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    setFormData((prevData) => [...prevData, values]);
    resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <table>
            <tbody>
              <tr>
                <td>
                  <Field
                    type="text"
                    name="ppid"
                    placeholder="Product Id"
                    className=""
                  />
                </td>

                <td>
                  <Field
                    type="text"
                    name="ppname"
                    placeholder="Product Name"
                    className=""
                  />
                </td>

                <td>
                  <Field
                    type="text"
                    name="ppprice"
                    placeholder="Purchasing price"
                    className=""
                  />
                </td>

                <td>
                  <Field
                    type="text"
                    name="ppqty"
                    placeholder="Quantity"
                    className=""
                  />
                </td>

                <td>
                  <Field
                    type="text"
                    name="ppdescription"
                    placeholder="Description"
                    className=""
                  />
                </td>

                <td>
                  <button type="submit" className="">
                    Add
                  </button>
                </td>
                <td>
                  <button type="reset">
                    Clear
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h4>Good Receiving Note</h4>
        </Form>
      </Formik>

      {/* Display the saved form data */}
      {formData.length > 0 && (
        <div>
          <h3>Saved Form Data:</h3>
          <table>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Purchasing Price</th>
                <th>Quantity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.ppid}</td>
                  <td>{data.ppname}</td>
                  <td>{data.ppprice}</td>
                  <td>{data.ppqty}</td>
                  <td>{data.ppdescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PurchersingForm;
