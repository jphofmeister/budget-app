import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, isNonEmptyArray, getDateTime } from "../utilities/sharedFunctions";
import { setComponentToLoad, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";

const BillsList = () => {

  const dispatch = useDispatch();

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";

  const currentUser = useSelector(state => state.application.currentUser);

  const [bills, setBills] = useState([]);


  useEffect(() => {

    if (isEmpty(currentUser) === false) {

      getBills(currentUser.userId);

    };

  }, [currentUser]);


  const getBills = (userId) => {

    let url = `${baseUrl}/bills/${userId}`;
    let operationValue = "Get Bills";

    fetch(url, {
      method: "GET",
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

        // console.log("results", results);

        if (isEmpty(results) === false) {

          if (results.transactionSuccess === true && isEmpty(results.records) === false) {

            setBills(results.records);

          } else {

            console.log(`${operationValue} -- transactionSuccess: ${results.transactionSuccess}. ${results.message}`);
            // dispatch(addErrorMessage(`${operationValue}: ${results.message}`));

          };

        } else {

          dispatch(addErrorMessage(`${operationValue}: No results returned.`));

        };

      })
      .catch((error) => {

        console.error("error", error);

        dispatch(addErrorMessage(`${operationValue}: ${error.message}`));

      });

  };


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
    <div>
      <h2>Bills</h2>
      {isNonEmptyArray(bills) === true ?
        <ul>
          {bills.map((bill) => {

            if (bill.active === true) {

              return (
                <li key={bill.bill_id}>
                  {bill.bill_name} - ${bill.bill_amount} - <button type="button" onClick={(event) => { deleteBill(bill.bill_id); }}>Delete</button>
                </li>
              );
            }

          })}

        </ul>

        : null}

    </div>
  );
};

export default BillsList;