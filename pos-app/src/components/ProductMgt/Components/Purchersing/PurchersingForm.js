import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function PurchersingForm() {
  const initialValues = {
    ppid: "",
    ppname: "",
    ppprice: "",
    ppqty: "",
    ppdescription: "",
  };

  return (
    <div>
      <Formik initialValues={initialValues}>
        <Form>
          <table>
            <tr>
              <td>
                <Field
                  type="text"
                  name="ppid"
                  placeholder="Produt Id"
                  // Value= {Purchersing.id}
                  className=""
                />
              </td>

              <td>
                <Field
                  type="text"
                  name="ppname"
                  placeholder="Produt Name"
                  className=""
                />
              </td>

              <td>
                <Field
                  type="text"
                  name="ppprice"
                  placeholder="Purchersing price"
                  className=""
                />
              </td>

              <td>
                <Field
                  type="text"
                  name="ppqty"
                  placeholder="Quntitiy"
                  className=""
                />
              </td>

              <td>
                <Field
                  type="text"
                  name="ppdescription"
                  placeholder="Descripton"
                  className=""
                />
              </td>

              <td>
                <button type="submit" className="">
                  Add
                </button>
              </td>
              <td>
                <button type="submit" className="">
                  Clear
                </button>
              </td>
            </tr>
          </table>
          <h4>Good Receving Note</h4>
          <table>
            <tbody>
              <tr>
                <td>PRODUCT ID</td>
                <td>PRODUCT NAME</td>
                <td>QTY</td>
                <td>PURCH.PRICE</td>
                <td>SEL.PRICE</td>
                <td>NOTE</td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Formik>
    </div>
  );
}

export default PurchersingForm;
