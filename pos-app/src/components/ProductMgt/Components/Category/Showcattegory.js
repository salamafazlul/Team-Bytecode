import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowcattegoryStyle.css";

function Showcattegory() {
  const [name, setName] = useState([]);

  const fetchName = async () => {
    const response = await axios.get("http://localhost:3001/Product_Category");
    setName(response.data);
  };
  useEffect(() => {
    fetchName();
    console.log(name);
  }, []);

  return (
    <div className="showcategory">
      <h3>Show Category</h3>
      {name.map((item) => (
        <>
          <p className="Cidfield"> ID - {item.category_id} Name - {item.category_name} </p>

        </>
      ))}
    </div>
  );
}

export default Showcattegory;
