import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { noFunctionAvailable, isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, setCurrentBill, setComponentToLoad, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";
import FormInput from "./template/FormInput";

const StyledBillForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  width: 560px;
  max-width: 100%;

  h2 {
    margin: 0;
  }
`;

const BillForm = (props) => {

  const componentName = "BillForm";

  const dispatch = useDispatch();

  const currentBill = useSelector(state => state.application.currentBill);

  const [txtBillName, setTxtBillName] = useState("");
  const [txtBillAmount, setTxtBillAmount] = useState("");
  const [txtBillDate, setTxtBillDate] = useState("");
  const [txtBillUrl, setTxtBillUrl] = useState("");
  const [txtBillDescription, setTxtBillDescription] = useState("");
  const [inlineErrors, setInlineErrors] = useState([]);

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  const handleSubmit = (event) => {

    event.preventDefault();

    dispatch(clearMessages());

    let url = `${baseUrl}/bills/add`;
    let operationValue = "Add Bill";

    let recordObject = {
      billName: txtBillName,
      billAmount: txtBillAmount,
      billDate: txtBillDate,
      billUrl: txtBillUrl,
      billDescription: txtBillDescription,
    };

    fetch(url, {
      method: "POST",
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...recordObject })
    })
      .then((results) => {

        if (typeof results === "object") {

          return results.json();

        } else {

          console.error("error");
          dispatch(addErrorMessage(`${operationValue}: No results.`));

        };

      })
      .then((results) => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {



        }

      })
      .catch((error) => {

        console.error("error", error);
        dispatch(addErrorMessage(`${operationValue}: No results.`));

      });

  };

  const closeForm = () => {

    dispatch(setComponentToLoad(""));

    // setTxtUsername("");
    // setTxtPassword("");

  };

  return (
    <div>

      {isEmpty(currentBill) === false ? <h2>Edit Bill</h2> : <h2>Add Bill</h2>}

      <StyledBillForm onSubmit={(event) => { event.preventDefault(); }}>

        <FormInput
          formInputID="txtBillName"
          labelText="Name"
          isRequired={true}
          inlineError={inlineErrors.txtBillName}
          inputValue={txtBillName}
          updateValue={setTxtBillName} />

        <FormInput
          formInputID="txtBillAmount"
          labelText="Amount"
          isRequired={true}
          inlineError={inlineErrors.txtBillAmount}
          inputValue={txtBillAmount}
          updateValue={setTxtBillAmount} />

        <FormInput
          formInputID="txtBillDate"
          inputType="date"
          labelText="Date"
          isRequired={true}
          inlineError={inlineErrors.txtBillDate}
          inputValue={txtBillDate}
          updateValue={setTxtBillDate} />

        <FormInput
          formInputID="txtBillUrl"
          labelText="URL"
          inlineError={inlineErrors.txtBillUrl}
          inputValue={txtBillUrl}
          updateValue={setTxtBillUrl} />

        <FormInput
          formInputID="txtBillDescription"
          inputType="textarea"
          textareaRows="5"
          labelText="Description"
          inlineError={inlineErrors.txtBillDescription}
          inputValue={txtBillDescription}
          updateValue={setTxtBillDescription} />

        <div className="flex-row">
          <button type="submit" className="btn btn-primary" onClick={(event) => { handleSubmit(event); }}>Submit</button>
          <button type="button" className="btn btn-light-gray" onClick={() => { closeForm(); }}>Cancel</button>
        </div>

      </StyledBillForm>

    </div>
  );
};

export default BillForm;