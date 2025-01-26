import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, isNonEmptyArray } from "../utilities/sharedFunctions";
import { setComponentToLoad, addSuccessMessage, addErrorMessage } from "../app/applicationSlice";

const BillsList = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.application.currentUser);
  const bills = useSelector(state => state.application.bills);

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  const deleteBill = (billId) => {

    let url = `${baseUrl}/bills/softDelete/${billId}`;
    let operationValue = "Delete Bill";

    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((results) => {

        if (results.ok !== true) {

          // throw Error(`${results.status} ${results.statusText} ${results.url}`)

        } else {

          if (results.status === 200) {

            return results.json();

          } else {

            return results.status;

          };

        };

      })
      .then((results) => {

        console.log("results", results);

        dispatch(addSuccessMessage("Successfully deleted bill."));

        if (isEmpty(results) === false) {

          // if (results.transactionSuccess === true && isEmpty(results.records) === false) {

          //   dispatch(addErrorMessage(`${operationValue}: ${results.message}`));

          // } else {

          //   dispatch(addErrorMessage(`${operationValue}: ${results.message}`));

          // };

        } else {

          dispatch(addErrorMessage(`${operationValue}: No results returned.`));

        };

      })
      .catch((error) => {

        console.error("error", error);

        dispatch(addErrorMessage(`${operationValue}: ${error.message}`));

      });

  };


  return (
    <div className="bills-list-container">

      <div className="flex-row space-between">
        <h2 className="mb-0">Bills</h2>
        <button type="button" className="btn btn-success" onClick={(event) => { dispatch(setComponentToLoad("BillForm")); }}><i className="fa fa-plus"></i> Add Bill</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Bill</th>
              <th>Amount</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>

          {isNonEmptyArray(bills) === true ?

            <tbody>

              {bills.map((bill) => {

                if (bill.active === true) {

                  return (
                    <tr key={bill.bill_id}>
                      <td>
                        {bill.bill_name}
                      </td>

                      <td>
                        ${bill.bill_amount}
                      </td>

                      <td>
                        <button type="button" className="btn btn-transparent" onClick={(event) => { deleteBill(bill.bill_id); }}>
                          <i className="fa fa-trash red-text"></i>
                          <span className="sr-only">Delete</span>
                        </button>
                      </td>

                    </tr>
                  );
                }

              })}

            </tbody>

            : <tbody><tr><td colSpan={3}>No results.</td></tr></tbody>}

        </table>
      </div>

    </div>
  );
};

export default BillsList;