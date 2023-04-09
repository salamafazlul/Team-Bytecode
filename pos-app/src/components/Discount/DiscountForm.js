import React, { useState } from "react";
import "./discountForm.css"
import Axios from "axios"

function DiscountForm({closeDiscountForm}) {
  const [code, setCode] = useState("")
  const [rate, setRate] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [startError, setStartError] = useState("")
  const [fieldsError, setFieldsError] = useState("")

  const createDiscount = () => {
    // Validate start date is not before end date
    if (new Date(start) > new Date(end)) {
      setStartError("Start date cannot be before end date.")
      return
    }
    // Validate start date is after today
  if (new Date(start) < new Date()) {
    setStartError("Start date must be after today.")
    return
  }
    // Validate all fields are filled
    if (!code || !rate || !start || !end) {
      setFieldsError("All fields are required.")
      return
    }
    Axios.post("http://localhost:3001/Discount", {
      discount_code: code,
      rate: rate,
      startDate: start,
      endDate: end
    })
    closeDiscountForm(false)
  }

  return (
    <div className="ModalBack">
      <div className="modalContain">
        <button onClick={() => closeDiscountForm(false)}>x</button>
        <div className="title">
          <label className="form-label text-white m-0">Discount Code</label>
          <input
            type="text"
            className="form-control px-1"
            placeholder="Discount code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="error-message">{fieldsError}</div>
          <label className="form-label text-white m-0">Discount Rate</label>
          <input
            type="number"
            className="form-control px-1"
            placeholder="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <div className="error-message">{fieldsError}</div>
          <label className="form-label text-white m-0">Start Date</label>
          <input
            type="date"
            className="form-control px-1"
            placeholder="Date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <div className="error-message">{startError}</div>
          <label className="form-label text-white m-0">End Date</label>
          <input
            type="date"
            className="form-control px-1"
            placeholder="Date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <div className="error-message">{fieldsError}</div>
        </div>
        <div className="body"><h5></h5></div>
        <div className="footer"><h5></h5></div>
        <button type="submit" onClick={createDiscount}>save</button>
        <button onClick={() => closeDiscountForm(false)}>cancel</button>
      </div>
    </div>
  );
}

export default DiscountForm;
