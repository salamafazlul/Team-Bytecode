import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./discountTable.css"

 function DiscountTable() {
  const [listOfDiscount, setListofDiscount] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/Discount").then((response)=>{
     setListofDiscount(response.data);
    });
  }, []);
  return (
    <div className="formContainer">
      {listOfDiscount.map((value, key)=>{
        return(
          <div className="rate">
            {value.rate}

          </div>
        );
      })}
    </div>
  );
}

export default DiscountTable;