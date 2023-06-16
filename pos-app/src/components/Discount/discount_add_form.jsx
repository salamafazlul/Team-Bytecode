import { useEffect, useState } from 'react'
import Select from 'react-select'

const DiscountAddForm = (props) => {
  // const [discountType, setDiscountType] = useState() // 'rate' for rate , 'amount' for amount
  const [productId, setProductId] = useState(null)
  const [rate_amount, setRateAmount] = useState(null)
  // const [qty, setQty] = useState(null)
  const [startDate, setstartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [productIdError, setProductIdError] = useState(null)
  const [rate_amountError, setRateAmountError] = useState(null)
  // const [qtyError, setQtyError] = useState(null)
  const [startDateError, setstartDateError] = useState(null)
  const [endDateError, setEndDateError] = useState(null)
  const [dateValidation, setdateValidation] = useState(null)
  const OnSubmitHandler = () => {
    // console.log(`pid ${productId} , discounttype ${discountType} , rate ${rate}, amount ${amount}, qty ${qty}, start data ${startDate} , end date ${endDate} `)
    props.addNewDiscount({
      "product_id": props.updateData ? productId : productId.value,
      "rate_amount": rate_amount,
      // "type": discountType,
      // "qty": qty,
      "startDate": startDate,
      "endDate": endDate
    })
   
  }
  const OnUpdateHandler = (data) => {
    props.updateDiscount({
      "product_id": props.updateData ? productId : productId.value,
      "rate_amount": rate_amount,
      // "type": discountType,
      // "qty": qty,
      "startDate": startDate,
      "endDate": endDate
    })
  }
  const checkValidation = () => {
    (!productId || productId.length <= 0) ? setProductIdError("Product Id is required !") : setProductIdError()
    // !qty ? setQtyError("Quantity is required !") : setQtyError()
    !startDate ? setstartDateError("Start Date is required !") : setstartDateError()
    !endDate ? setEndDateError("End Data is required") : setEndDateError()
    !rate_amount ? setRateAmountError("Discount amount is required !") : setRateAmountError() 

    const today = new Date();
    if ( (new Date(startDate)) > new Date(endDate)){
      setdateValidation("Start Date and Expiry Date are Invalid")
    } else if (new Date(startDate) < today) {
      setdateValidation("Start Date cannot be before today")
      
    }else{
      setdateValidation()

    }
  }
  const OnResetHandler = () => {
    setRateAmount()
    // setQty(0)
    setEndDate()
    setstartDate()
    setProductId()
  }

  useEffect(() => {

    checkValidation()
  }, [productId, rate_amount, startDate, endDate])


  

  useEffect(() => {
    OnResetHandler()
  }, [props.isClear])

  useEffect(() => {
    if (!props.updateData) return   
   
    setRateAmount(props.updateData.rate_amount)
    setEndDate(props.updateData.endDate)
    setstartDate(props.updateData.startDate)
    // setQty(parseInt(props.updateData.qty))
    // setDiscountType(props.updateData.type)
    setProductId(props.updateData.product_id)
    
  }, [props])

 

  return (
    <div className="add-discount-form">
      <div className="pd-add-form">
        {/* <div className="pd-row">
          
          <div className="form-group">
            <label htmlFor="exampleInputProductId1">Type</label>
            <Select
              defaultValue={props?.updateData?.type }
              options={dtype}
              onChange={(e) => { setDiscountType(e) }} />
          </div>
        </div> */}
        <div className='pd-row'>
          {/* <div className="form-group">
            <label htmlFor="exampleInputquntity1">Quntity</label>
            <input type="number" className="form-control" id="exampleInputquntity1" onChange={(e) => { setQty(e.target.value) }} value={qty} />
          </div> */}
         <div className="form-group">
            <label htmlFor="exampleInputProductId1">Product Id -{props.product_id}-</label>
            {
              !props.updateData ? <Select options={props?.productList} onChange={(e) => { setProductId(e) }} 
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select" /> : <Select options={props?.productList} defaultValue={props?.updateData?.product_id} onChange={(e) => { setProductId(e) }} 
             
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select" />
            }
          {/* {props.updateData.product_id ? props.updateData.product_id : "no"} */}
          </div>
          
             <div className="form-group">
              <label htmlFor="exampleInputdiscount_rate1">  Rate %</label>
              <input type="number" className="form-control" id="exampleInputdiscount_rate1" onChange={(e) => { setRateAmount(e.target.value) }} value={parseInt(rate_amount)}  />
            </div> 
          
          <div className="form-group">
            <label htmlFor="exampleInputstart_date1">Start Date</label>
            <input type="date" className="form-control" id="exampleInputstart_date1" placeholder="start_date" onChange={(e) => { setstartDate(e.target.value) }} value={startDate} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputend_date1">End Date</label>
            <input type="date" className="form-control" id="exampleInputend_date1" placeholder="end_date" onChange={(e) => { setEndDate(e.target.value) }} value={endDate} />
          </div>
        </div>

        {
          props.statusMessage ? <div>{props.statusMessage?.status == "error" ? <div className='pd-erro-logger'>{props?.statusMessage?.message}</div> : <div className='pd-success-logger'>{props?.statusMessage?.message}</div>} </div> : <></>}
        {
          productIdError || rate_amountError|| startDateError || endDateError || dateValidation ? <div className='pd-erro-logger'>
            {productIdError}{productIdError ? <br /> : null}
            
            {rate_amountError}{rate_amountError ? <br /> : null}
            {startDateError}{startDateError ? <br /> : null}
            {endDateError}{endDateError ? <br /> : null}
            {dateValidation}{dateValidation ? <br /> : null}
          </div> : <></>
        }
        <div className="pd-row " >

          <button className="btn btn-sm btn-primary " disabled={dateValidation || productIdError  || rate_amountError || startDateError || endDateError} onClick={() => { props.updateData ? OnUpdateHandler() : OnSubmitHandler() }} >{props?.updateData ? "Update" : "Save"}</button>
          {/* {
            props.updateData ? <button className="btn btn-sm btn-primary " onClick={OnResetHandler} >Rest</button> : <></>
          } */}
        </div>
      </div>
    </div>
  )
}

export default DiscountAddForm