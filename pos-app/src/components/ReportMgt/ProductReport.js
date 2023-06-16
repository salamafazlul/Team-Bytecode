import React, { useEffect, useState } from "react";
import "./product_report_style.css";
import POSHeader from "../Common/POSHeader";
import Select from "react-select";
import SideNavBar from "../Common/SideNavBar";

const ProductReport = () => {
  const [productList, setproductList] = useState(null);
  const [productListFilterSupport, setProductListFilterSupport] =
    useState(null);
  const [statusMessage, setStatusMessage] = useState();
  const [category, setcategory] = useState(0);
  const [reorderLevel, setReOrderLevel] = useState(0);
  const [expiryDate, setExpiryDate] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [ImmediateRequestList, setImmediateRequestList] = useState([]);
  const [reorderLevelLimite, setreorderLevelLimite] = useState(5);
  const [productCategoryList, setProductCategoryList] = useState([]);

  useEffect(() => {
    getProductData();
    getProductCategoryData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatusMessage();
    }, 5000);
  }, [statusMessage]);

  const getProductData = () => {
    fetch("http://localhost:3001/Invoice/api/getProduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("successfully data fetched");
          return response.json();
        } else {
          console.log("Failed to load data");
        }
      })
      .then((data) => {
        setproductList(data);
        setProductListFilterSupport(data);

        let temp = data.filter((item) => item.stock <= item.reorder_level);
        setImmediateRequestList(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const genaratePDF = async () => {
    const response = await fetch(
      "http://localhost:3001/Product_Category/api/getProductReOrderReport",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productList),
      }
    ); // Replace with your Node.js server URL
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Do something with the PDF URL, e.g., open it in a new tab
    window.open(url);
  };

  const getPDFEmail = async () => {
    let tempData = { data: productList, email: "gamathigeh@gmail.com" };
    const response = await fetch(
      "http://localhost:3001/Product_Category/api/getProductReOrderByEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempData),
      }
    );
    // Replace with your Node.js server URL
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Do something with the PDF URL, e.g., open it in a new tab
    // window.open(url);
  };

  const getProductCategoryData = () => {
    fetch("http://localhost:3001/Product_Category/api/getProductCategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("successfully data fetched");
          return response.json();
        } else {
          console.log("Failed to load data");
        }
      })
      .then((data) => {
        let temp = data.map((item) => {
          return { value: item.category_id, label: item.category_name };
        });
        setProductCategoryList(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let tempCategory = productListFilterSupport?.filter((item) => {
      if (!category) {
        return true;
      } else {
        return item.category_id == category;
      }
    });
    let tempReOrderLevel = tempCategory?.filter((item) => {
      if (reorderLevel == 0 || !reorderLevel || reorderLevel == undefined) {
        return true;
      } else {
        return item.reorder_level == reorderLevel;
      }
    });

    let tempExpiryDate = tempReOrderLevel?.filter((item) => {
      if (!expiryDate || expiryDate == undefined) {
        return true;
      } else {
        return item.expiry_date == expiryDate;
      }
    });
    setproductList(tempExpiryDate);
  }, [expiryDate, reorderLevel, category]);
  const showImmediateRequestAlert = () => {
    setcategory(null);
    // setReOrderLevel(reorderLevelLimite);
    let tempReOrderLevel = productListFilterSupport?.filter(
      (item) => item.stock <= item.reorder_level
    );
    setproductList(tempReOrderLevel);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideNavBar style={{ flexBasis: "20%" }} />

        <div style={{ flexBasis: "80%" }}>
          <POSHeader
            showImmediateRequestAlert={showImmediateRequestAlert}
            ImmediateRequestAlert={ImmediateRequestList.length}
            title={"Product Report"}
          />
          <div className="discount-container">
            <div className="add-discount-form">
              <div className="pd-add-form">
                <div className="pd-row">
                  <div className="form-group">
                    <label htmlFor="exampleInputProductId1">Category</label>
                    <Select
                      isClearable={true}
                      name="colors"
                      options={productCategoryList}
                      className="basic-multi-select"
                      onChange={(e) => setcategory(e ? e.value : null)}
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputReOrderLevel1">
                      Re-OrderLevel
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setReOrderLevel(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputend_date1">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="end_date"
                    />
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="loading_screen">
                <img
                  src={require("../images/loading.gif")}
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
            ) : (
              <>
                <div className="pd-table-container ">
                  <h4> Product Details</h4>
                  <div
                    className="table-wrapper-scroll-y border"
                    style={{ width: "100%", minHeight: "280px" }}
                  >
                    <table className="table table-striped pd-table ">
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          color: "black",
                        }}
                      >
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Category Id </th>
                          <th scope="col">Buying Price</th>
                          <th scope="col">Selling Price</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Reorder Level</th>
                          <th scope="col">Reorder Status</th>
                          <th scope="col">Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList?.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item.product_id}</th>
                            <td>{item.product_name}</td>
                            <td>{item.category_id}</td>
                            <td>{item.buying_price}</td>
                            <td>{item.selling_price}</td>
                            <td>{item.stock}</td>
                            <td>{item.reorder_level}</td>
                            <td>{item.reorder_status}</td>
                            <td>{item.expiry_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      genaratePDF();
                    }}
                  >
                    {" "}
                    Genarate PDF{" "}
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      getPDFEmail();
                    }}
                  >
                    {" "}
                    Email PDF{" "}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReport;
