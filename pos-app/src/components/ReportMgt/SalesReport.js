import React, {useEffect, useState} from 'react';
import './Form.css';
import {Form, Field, ErrorMessage, Formik} from "formik";
import * as Yup from 'yup';

export default function SalesReport() {
    const [invoices, setInvoices] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchInvoices = (invoiceId, from, to) => {
        let url;
        if (invoiceId) {
            url = 'invoice_id=' + invoiceId;
        } else if (from && to) {
            url = 'from=' + from + '&to=' + to;
        }

        fetch('http://localhost:3001/invoices/api/getInvoiceList?' + url).then(async res => {
            // setLoading(false);
            const response = await res.json();
            setInvoices(response);
            const t = response.map(invoice => invoice.amount).reduce((ps, s) => ps + (+s), 0);
            setTotal(t);
        })
    }

    const initialValues = {
        invoice_id: "", 
        start_date: "",
        end_date: "",
    };

    const validationSchema = Yup.object().shape({
        // invoice_id: Yup.number().integer().min(1).max(200).required("  Please input a valid product ID."),
        // start_date: Yup.date().required("  Please input a valid date."),
        // end_date: Yup.date()
        //     .required("  Please input a valid total amount.")
        //     .when("start_date", (start_date, schema) => {
        //         return start_date
        //             ? schema.min(start_date, "End date must be after start date")
        //             : schema;
        //     }),
    });


    const onSubmit = (data, {resetForm}) => {
        fetchInvoices(data?.invoice_id, data?.start_date, data?.end_date);
        // resetForm();
    }

    return (
        
        <div className='form'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form>

                        <h3> Sales Report</h3>
                        <label>Invoice ID</label>
                        <ErrorMessage name="invoice_id" component="span" onBlur={handleBlur}
                                      onFocus={handleChange}/><br></br>
                        <Field
                            type="number"
                            name="invoice_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.invoice_id}
                            placeholder="Enter invoice ID"
                        /><br/>


                        <label>Start Date</label>
                        <ErrorMessage name="start_date" component="span" onBlur={handleBlur}
                                      onFocus={handleChange}/><br></br>
                        <Field
                            type="date"
                            name="start_date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.start_date}
                            placeholder="Enter start date"
                        /><br/>

                        <label>End Date</label>
                        <ErrorMessage name="end_date" component="span" onBlur={handleBlur}
                                      onFocus={handleChange}/><br></br>
                        <Field
                            type="date"
                            name="end_date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.end_date}
                            placeholder="Enter end date"
                        /><br/>

                        <button type="submit">Add</button>
                        <button type="reset">Clear</button>
                    </Form>
                )}
            </Formik>

            <center>
                <table>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Amount</th>
                    </tr>
                    {invoices?.map(invoice => {
                        return (<tr>
                            <td>{invoice?.invoice_id}</td>
                            <td>{invoice?.product_id}</td>
                            <td>{invoice?.quantity}</td>
                            <td>{invoice?.price}</td>
                            <td>{invoice?.discount}</td>
                            <td>{invoice?.amount}</td>
                        </tr>)
                    })}
                    <tr>total Amount : {total} LKR</tr>
                </table>
                <br></br>
                <button>Print Report</button>
                <button>Send mail</button>
            </center>
        </div>
        
    )
}
