import React, { useEffect, useState } from "react";
import "./dashboard.css";
import TextExample from "./TextExample";
import CChartBar from "./CChartBar";
import Piecharts from "./Piecharts";
import Linechart from "./Linechart";
import Topselling from "./Topselling";
import Purchaseqty from "./Purchaseqty";
import SideNavBar from "../Common/SideNavBar"

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/stats/api/dailySales").then(async (res) => {
      setLoading(false);
      const response = await res.json();
      console.log(response);
      setStats(response);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideNavBar />

      <div>
        <div>
          <TextExample data={stats} loading={loading} />

          <div>
            <h1></h1>
            <h4>Top Selling items</h4>
            <Topselling data={stats?.topSellingProducts} />
          </div>

          <h1></h1>
          <div className="section">
            <div className="leftcol">
              <h5>Monthly Sales</h5>
              <CChartBar data={stats?.monthlyIncome} />
            </div>
            <div className="rightcol">
              <h5>Total Revenue</h5>
              <Linechart data={stats?.monthlyProfit} />
            </div>
          </div>

          <div className="section">
            <div className="leftcol">
              <h5>Purachse Quantity By Product Category</h5>
              <Purchaseqty data={stats?.quantityByCategory} />
            </div>
            <div className="rightcol">
              <div className="piecol">
                <h5>Sales by product Category</h5>
                <Piecharts data={stats?.quantityByCategory} />
              </div>
              <div className="donghutcol">
                <h5>Inventory by Category</h5>
                <Piecharts data={stats?.inventoryByCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
