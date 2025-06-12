import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isEmpty } from "../../utilities/sharedFunctions";
import { setComponentToLoad, addSuccessMessage, addErrorMessage, clearMessages, setCurrentBill } from "../../app/applicationSlice";
import FormInput from "../common/FormInput";
import FormDropdown from "../common/FormDropdown";
import { format } from "date-fns";

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

const StyledFrequencyRow = styled.fieldset`
  display: flex;
  flex-direction: row;
  align-items: center;
  justfiy-content: flex-start;
  gap: .5rem;

  border: none;
  padding: .5rem 0 0 0;
  margin-bottom: .5rem;

  legend {
    font-weight: 700;
    padding: 0;
  }

  .form-group {
    width: auto;

    input, select {
      width: auto;
    }

    input[type="number"] {
      max-width: 75px;
    }
  }

  .specific-or-last-day {
    /* margin-bottom: 1rem; */
    .form-group {
      position: relative;
    }

    .checkbox-addon {
      position: absolute;
    }
  }
`;

const BillForm = () => {

  const componentName = "BillForm";

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.application.currentUser);
  const currentBill = useSelector(state => state.application.currentBill);

  const [txtBillName, setTxtBillName] = useState("");
  const [txtBillAmount, setTxtBillAmount] = useState("");
  const [txtBillUrl, setTxtBillUrl] = useState("");
  const [txtBillDescription, setTxtBillDescription] = useState("");

  const [txtFrequencyInterval, setTxtFrequencyInterval] = useState(1);
  const [ddFrequencyType, setDdFrequencyType] = useState("month");
  const [txtFrequencyDay, setTxtFrequencyDay] = useState(1);
  const [ddFrequencyDayOfWeek, setDdFrequencyDayOfWeek] = useState("Sunday");
  const [cbxLast, setCbxLast] = useState(false);
  const [txtFrequencyStartDate, setTxtFrequencyStartDate] = useState("");

  const [inlineErrors, setInlineErrors] = useState([]);

  let frequencyTypeOptions = [{ optionId: "day", optionName: "Day(s)" }, { optionId: "week", optionName: "Week(s)" }, { optionId: "month", optionName: "Month(s)" }];

  let dayOfWeekOptions = [{ optionName: "Sunday" }, { optionName: "Monday" }, { optionName: "Tuesday" }, { optionName: "Wednesday" }, { optionName: "Thursday" }, { optionName: "Friday" }, { optionName: "Saturday" }];

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  // * set data in form if editing -- 05/25/2025 JH
  useEffect(() => {

    resetBillForm(currentBill);

  }, [currentBill]);


  const resetBillForm = (bill) => {

    if (!isEmpty(bill)) {

      setTxtBillName(bill.bill_name);
      setTxtBillAmount(bill.bill_amount);
      setTxtBillUrl(bill.bill_url);
      setTxtBillDescription(bill.bill_description);
      setTxtFrequencyInterval(bill.frequency_interval);
      setDdFrequencyType(bill.frequency_type);

      if (bill.frequency_type === "month") {

        setTxtFrequencyDay(bill.frequency_day);

        if (bill.frequency_day === "last") {
          setCbxLast(true);
        };

      };

      if (bill.frequency_type === "week") {
        setDdFrequencyDayOfWeek(bill.frequency_day);
      };

      setTxtFrequencyStartDate(format(bill.frequency_start_date, "yyyy-dd-MM"));

    } else {

      setTxtBillName("");
      setTxtBillAmount("");
      setTxtBillUrl("");
      setTxtBillDescription("");
      setTxtFrequencyInterval(1);
      setDdFrequencyType("month");
      setTxtFrequencyDay(1);
      setDdFrequencyDayOfWeek("Sunday");
      setCbxLast(false);
      setTxtFrequencyStartDate("");

    };

  };


  const closeForm = () => {

    dispatch(setComponentToLoad(""));
    dispatch(setCurrentBill({}));

    resetBillForm();

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    dispatch(clearMessages());

    if (!isEmpty(currentUser?.userId)) {

      let url = "";
      let operationValue = "";
      let method = "";

      // ? check currentUser.userId === currentBill.user_id earlier in the process? -- 05/25/2025 JH
      if (!isEmpty(currentBill) && currentUser.userId === currentBill.user_id) {

        url = `${baseUrl}/bills/update/${currentBill.bill_id}/${currentUser.userId}`;
        operationValue = "Edit Bill";
        method = "PUT";

      } else {

        url = `${baseUrl}/bills/add`;
        operationValue = "Add Bill";
        method = "POST";

      };

      let frequencyDay = "";

      if (ddFrequencyType === "month") {
        frequencyDay = cbxLast === true ? "last" : txtFrequencyDay;
      };

      if (ddFrequencyType === "week") {
        frequencyDay = ddFrequencyDayOfWeek;
      };

      let recordObject = {
        billName: txtBillName,
        billAmount: txtBillAmount,
        billUrl: txtBillUrl,
        billDescription: txtBillDescription,
        frequencyInterval: txtFrequencyInterval,
        frequencyType: ddFrequencyType,
        frequencyDay: frequencyDay,
        frequencyStartDate: txtFrequencyStartDate,
        userId: currentUser.userId
      };

      fetch(url, {
        method: method,
        credentials: 'include',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...recordObject })
      })
        .then((results) => {

          console.log("results", results);

          if (typeof results === "object") {

            return results.json();

          } else {

            console.error("error");
            dispatch(addErrorMessage(`${operationValue}: No results.`));

          };

        })
        .then((results) => {

          // console.log("results", results);

          if (isEmpty(results) === false && results.transactionSuccess === true) {

            closeForm();

            dispatch(addSuccessMessage(`${operationValue}: ${results.message}`));

          };

        })
        .catch((error) => {

          console.error("error", error);
          dispatch(addErrorMessage(`${operationValue}: No results.`));

        });

    } else {

      dispatch(addErrorMessage("Please login first."));

    };

  };


  return (
    <div>

      {!isEmpty(currentBill) ? <h2>Edit Bill</h2> : <h2>Add Bill</h2>}

      <StyledBillForm onSubmit={(event) => { handleSubmit(event); }}>

        <FormInput
          formInputId="txtBillName"
          labelText="Name"
          isRequired={true}
          inlineError={inlineErrors.txtBillName}
          inputValue={txtBillName}
          updateValue={setTxtBillName}
        />

        <FormInput
          formInputId="txtBillAmount"
          labelText="Amount"
          isRequired={true}
          inlineError={inlineErrors.txtBillAmount}
          inputValue={txtBillAmount}
          updateValue={setTxtBillAmount}
        />

        <FormInput
          formInputId="txtBillUrl"
          labelText="URL"
          inlineError={inlineErrors.txtBillUrl}
          inputValue={txtBillUrl}
          updateValue={setTxtBillUrl}
        />

        <FormInput
          formInputId="txtBillDescription"
          inputType="textarea"
          textareaRows="5"
          labelText="Description"
          inlineError={inlineErrors.txtBillDescription}
          inputValue={txtBillDescription}
          updateValue={setTxtBillDescription}
        />

        <StyledFrequencyRow>
          <legend>Frequency</legend>

          <span>Every</span>

          <FormInput
            formInputId="txtFrequencyInterval"
            inputType="number"
            labelText="Frequency Interval"
            srOnly={true}
            inlineError={inlineErrors.txtFrequencyInterval}
            inputValue={txtFrequencyInterval}
            updateValue={setTxtFrequencyInterval}
          />

          <FormDropdown
            formInputId="ddFrequencyType"
            labelText="Frequency Type"
            srOnly={true}
            emptyOption={true}
            optionData={frequencyTypeOptions}
            optionId="optionId"
            optionText={[{ type: "property", text: "optionName" }]}
            inputValue={ddFrequencyType}
            updateValue={setDdFrequencyType}
          />

          {ddFrequencyType === "month" ?
            <>
              <span>on the</span>

              <div className="specific-or-last-day">

                <FormInput
                  formInputId="txtFrequencyDay"
                  inputType="number"
                  labelText="Frequency Day"
                  srOnly={true}
                  disabled={cbxLast}
                  inlineError={inlineErrors.txtFrequencyDay}
                  inputValue={txtFrequencyDay}
                  updateValue={setTxtFrequencyDay}
                />

                <div className="checkbox-addon">

                  <span>or</span>

                  <label htmlFor="cbxLast">
                    <input
                      type="checkbox"
                      id="cbxLast"
                      checked={cbxLast}
                      onChange={() => { setCbxLast(!cbxLast); }}
                    />
                    Last
                  </label>

                </div>

              </div>

              <span>day.</span>
            </>

            : null}

          {ddFrequencyType === "week" ?

            <>
              <span>on</span>

              <FormDropdown
                formInputId="ddFrequencyDayOfWeek"
                labelText="Frequency Type"
                srOnly={true}
                emptyOption={true}
                optionData={dayOfWeekOptions}
                optionId="optionName"
                optionText={[{ type: "property", text: "optionName" }]}
                inputValue={ddFrequencyDayOfWeek}
                updateValue={setDdFrequencyDayOfWeek}
              />
            </>

            : null}

        </StyledFrequencyRow>

        <FormInput
          formInputId="txtFrequencyStartDate"
          inputType="date"
          labelText="Frequency Start Date"
          inputHint="The frequency will start calculating from this date."
          inlineError={inlineErrors.txtFrequencyStartDate}
          inputValue={txtFrequencyStartDate}
          updateValue={setTxtFrequencyStartDate} />

        <div className="flex-row justify-center mt-3">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-light-gray" onClick={() => { closeForm(); }}>Cancel</button>
        </div>

      </StyledBillForm>

    </div >
  );
};

export default BillForm;