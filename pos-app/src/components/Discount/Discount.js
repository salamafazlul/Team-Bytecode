
import React, { useState } from "react";
// import DiscountTable from "./DiscountTable";
import DiscountForm from "./DiscountForm";
import "./discount.css"


 function Discount({closeDiscountForm}) {
    const [openDiscountForm, setOpenDiscountForm]= useState(false);
  return (
    <> 
      
        <div className="contain">
          <h5>Add Discount And Promotion </h5>
          <br></br>
            <button className="modalButton" onClick={()=>{
              setOpenDiscountForm(true);
            }}
            >Product Discount</button>
            {openDiscountForm && <DiscountForm closeDiscountForm={setOpenDiscountForm}/>}
            {/* <DiscountTable /> */}

            
        </div>
    </>
  );
}
export default Discount;









// import {Formik, Form, Field, ErrorMessage} from "formik";
// import * as Yup from 'yup'
// import axios from "axios";
// import { useEffect } from "react";
// import "./discount.css"

// function Discount() {

//     useEffect(()=>{
//         axios.get("http://localhost:3001/posts")
//     },[])
//     const initialValues={
//         pid: "",
//         rate: "",
//         startDate: "",
//         endDate: "",
    
//     };
//     const validationSchema = Yup.object().shape({
//          pid: Yup.string().required(),
         
//          //rate: Yup.float().required(),
//          startDate: Yup.date().required(),
//          endDate: Yup.date().required(),
    

//     });

//     const onSubmit =(data) => {
//         console.log(data);
//     }
//     return(
//         <div className="disAndpro">
//             <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema = {validationSchema}>
//                 <Form className="formContainer">
//                     <h5><label>Add discount And Promotion</label></h5>
//                         <tr>
                           
                            

                          
//                                    <td className='fn'>
//                                    <label >Product ID</label>
//                                    </td>
//                                    <td className='fn'>
//                                    <label>Discount Category</label>
//                                    </td>
//                                    <td className='fn'>
//                                    <label>Discount Rate</label>
//                                    </td>
//                                    <td className='fn'>
//                                    <label>Start Date</label>
//                                    </td>
//                                    <td className='fn'>
//                                    <label>End Date</label>
//                                    </td>
//                                </tr>
//                                <tr>
//                                    <td>
//                                    <ErrorMessage name = "pid" component= "span" />                           
//                                    <Field id ="text"
//                                    name="pid"
//                                    size={25}
//                                    placeholder="Enter Product ID"
//                                    class ="inputshort"
//                                    />
//                                    </td>

//                                    <td>
                                  
//                                    <ErrorMessage name = "option" component= "span" /> 
//                                    <select className="drop" id="option">
//                                    <option value=""></option>
//                                     <option value="option1">One-buy-get-one</option>
                                    
//                                     <option value="option2">%</option>
//                                     <option value="option3">Season</option>
                                            
//                                    </select>
                                  
//                                    </td>
//                                    <td>
//                                    <ErrorMessage name = "rate" component= "span" />   
//                                    <Field type="float"
//                                    name="rate"
//                                    size={4}
//                                    placeholder="rate"
//                                    class="inputshort"
//                                    />
                                    
//                                  </td>
                                 
//                                    <td>
//                                    <ErrorMessage name = "startDate" component= "span" />   
//                                    <Field type="date"
//                                    name="startDate"
//                                    size={4}
//                                    placeholder="Start Date"
//                                    class="inputshort"
//                                    />
                                   
//                                    </td>
//                                    <td>
//                                    <ErrorMessage name = "endDate" component= "span" />
//                                    <Field type="date"
//                                    name="endDate"
//                                    size={4}
//                                    placeholder="End Date"
//                                    class="inputshort"
//                                    />
//                                    </td>
                                   
                                   
                           
                       
//                                <button class="button2">Add</button>

                               
//                         </tr>
                        
//                         <tr className="view">
//                             <td>Product2</td>
//                             <td>6%</td>
//                             <td>12/3/2022</td>
//                             <td>4/09/2023</td>
//                             <div class="btn-group">
//                             <button className="button3">Edit</button>
//                             <button className="button3">Delete</button>
                
                
//                             </div>
                                                                        
//                         </tr> 
//                         <tr className="view">
//                             <td>Product2</td>
//                             <td>6%</td>
//                             <td>12/3/2022</td>
//                             <td>4/09/2023</td>
//                             <div class="btn-group">
//                             <button className="button3">Edit</button>
//                             <button className="button3">Delete</button>
                
                
//                             </div>
                                                                        
//                         </tr> 
//                         <tr className="view">
//                             <td>Product2</td>
//                             <td>6%</td>
//                             <td>12/3/2022</td>
//                             <td>4/09/2023</td>
//                             <div class="btn-group">
//                             <button className="button3">Edit</button>
//                             <button className="button3">Delete</button>
                
                
//                             </div>
                                                                        
//                         </tr> 
//                         <tr className="view">
//                             <td>Product2</td>
//                             <td>6%</td>
//                             <td>12/3/2022</td>
//                             <td>4/09/2023</td>
//                             <div class="btn-group">
//                             <button className="button3">Edit</button>
//                             <button className="button3">Delete</button>
                
                
//                             </div>
                                                                        
//                         </tr> 
                         
//                 </Form>

               
            
//             </Formik>
            
           
//         </div>
        
//     );
    
// }

// export default Discount;
