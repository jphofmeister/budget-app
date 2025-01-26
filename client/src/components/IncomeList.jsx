import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, isNonEmptyArray } from "../utilities/sharedFunctions";
import { setComponentToLoad, addSuccessMessage, addErrorMessage } from "../app/applicationSlice";

const IncomeList = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.application.currentUser);
  const allIncome = useSelector(state => state.application.allIncome);

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  const deleteIncome = (incomeId) => {

    let url = `${baseUrl}/income/softDelete/${incomeId}`;
    let operationValue = "Delete Income";

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

        dispatch(addSuccessMessage("Successfully deleted income."));

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
    <div className="income-list-container">

      <div className="flex-row space-between">
        <h2 className="mb-0">Income</h2>
        <button type="button" className="btn btn-success" onClick={(event) => { dispatch(setComponentToLoad("IncomeForm")); }}><i className="fa fa-plus"></i> Add Income</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Income</th>
              <th>Amount</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>

          {isNonEmptyArray(allIncome) === true ?

            <tbody>

              {allIncome.map((income) => {

                if (income.active === true) {

                  return (
                    <tr key={income.income_id}>
                      <td>
                        {income.income_name}
                      </td>

                      <td>
                        ${income.income_amount}
                      </td>

                      <td>
                        <button type="button" className="btn btn-transparent" onClick={(event) => { deleteIncome(income.income_id); }}>
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

export default IncomeList;