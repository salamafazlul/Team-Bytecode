import React, { useEffect, useState } from "react";
import axios from "axios";

function Showcattegory() {
  const [name, setName] = useState([]);

  const fetchName = async () => {
    const response = await axios.get("http://localhost:3001/Category");
    setName(response.data);
  };
  useEffect(() => {
    fetchName();
    console.log(name);
  }, []);

  return (
    <div>
      {name.map((item) => (
        <>
          <span>{item.Category_name}</span>
          <span>{item.Category_ID}</span>
          <br></br>
        </>
      ))}
    </div>
  );
}

export default Showcattegory;
