// import { Axios } from "axios";
// import React from "react";
// import "./Removestyle.css";

// const Removeform = () => {

//   const handleDelete = async (id) => {
//     try {
//       await Axios.delete("http://localhost:8801/product" + id);
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="removeform">
//       <form className="Purchers">
//         <h3 className="title2"> Remove Product</h3>

//         <table>
//           <tbody>
//             <tr>
//               <td>Product code</td>
//               <td>
//                 <input
//                   type="text"
//                   name="name"
//                   size={50}
//                   placeholder="code"
//                   className="barshort"
//                 />
//               </td>
//               <td>Product name</td>
//               <td>
//                 <input
//                   type="text"
//                   name="name"
//                   size={50}
//                   placeholder="Product Name"
//                   className="bar"
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </form>

//       <div className="button">
//         <button className="bb1" onClick={() => handleDelete(produt.id)}>
//           Remove
//         </button>
//         <button className="bb2">
//           <span>Clear</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Removeform;

import React, { useState } from "react";
import axios from "axios";
import "./Removestyle.css";

const Removeform = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(
          `http://localhost:8801/product/${product.id}`
        );
        setProduct({ ...product, name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(
          `http://localhost:8801/product/${product.name}`
        );
        console.log(response);
        setProduct({ ...product, id: response.data.id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call backend API to remove the product
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:8801/products/${product.id}`);
      setProduct({ id: "", name: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    setProduct({ id: "", name: "" });
  };

  return (
    <div className="removeform">
      <form className="Purchers" onSubmit={handleSubmit}>
        <h3 className="title2"> Remove Product</h3>

        <table>
          <tbody>
            <tr>
              <td>Product code</td>
              <td>
                <input
                  type="text"
                  name="id"
                  size={50}
                  placeholder="code"
                  className="barshort"
                  value={product.id}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>Product name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  size={50}
                  placeholder="Product Name"
                  className="bar"
                  value={product.name}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  // disabled
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="button">
          <button type="button" className="bb1" onClick={handleRemove}>
            Remove
          </button>
          <button type="button" className="bb2" onClick={handleClear}>
            <span>Clear</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Removeform;
