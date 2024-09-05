import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { setCurrentBill } from "../app/applicationSlice";
import FormInput from "./template/FormInput";

const BillForm = () => {

  const componentName = "BillForm";

  const dispatch = useDispatch();

  const currentBill = useSelector(state => state.application.currentBill);

  const [txtBillName, setTxtBillName] = useState("");
  const [txtBillAmount, setTxtBillAmount] = useState("");
  const [txtBillDate, setTxtBillDate] = useState("");
  const [inlineErrors, setInlineErrors] = useState([]);

  return (
    <div>

      {isEmpty(currentBill) === false ? <h2>Edit Bill</h2> : <h2>Add Bill</h2>}

      <form onSubmit={(event) => { event.preventDefault(); }}>

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

      </form>

    </div>
  );
};

export default BillForm;