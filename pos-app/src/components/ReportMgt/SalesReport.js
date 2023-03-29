import React from 'react'
import './Form.css';

export default function Form() {
  return (
    <div>
      <form>
          <label>Product ID:
            <input type="text" />
          </label>
          <label>Product Name:
            <input type="text" />
          </label>
          <br></br>
          <label>Start Date:
            <input type="date" />
          </label>
          <label>End Date:
            <input type="date" />
          </label>
          <br></br>
          <button>Add </button>
          <button>Clear </button>

          <br></br>
        <br></br>


        <center><table>
            <tr>
                <th>Product ID</th>
                <th>Date</th>
                <th>Purchasing Price</th>
                <th>Selling Price</th>
                <th>Number of sales</th>
                <th>Value</th>
                <th>Cost of Sales</th>
                <th>Discount</th>
                <th>Profit</th>
            </tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>
            <tr>Product ID</tr>

        </table></center>
        <br></br>
          <button>Print Report</button>
          <button>Send mail</button>
          
        </form>
        
    </div>
  )
}
