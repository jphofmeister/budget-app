import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isEmpty } from "../utilities/sharedFunctions";
import { setComponentToLoad, addSuccessMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";
import FormInput from "./template/FormInput";
import FormDropdown from "./template/FormDropdown";

const StyledIncomeForm = styled.form`
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

const IncomeForm = () => {

  const componentName = "IncomeForm";

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.application.currentUser);
  const currentIncome = useSelector(state => state.application.currentIncome);

  const [txtIncomeName, setTxtIncomeName] = useState("");
  const [txtIncomeAmount, setTxtIncomeAmount] = useState("");

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


  const handleSubmit = (event) => {

    event.preventDefault();

    dispatch(clearMessages());

    if (isEmpty(currentUser?.userId) === false) {

      let url = `${baseUrl}/income/add`;
      let operationValue = "Add Income";

      let frequencyDay = "";

      if (ddFrequencyType === "month") {
        frequencyDay = cbxLast === true ? "last" : txtFrequencyDay;
      };

      if (ddFrequencyType === "week") {
        frequencyDay = ddFrequencyDayOfWeek;
      };

      let recordObject = {
        incomeName: txtIncomeName,
        incomeAmount: txtIncomeAmount,
        frequencyInterval: txtFrequencyInterval,
        frequencyType: ddFrequencyType,
        frequencyDay: frequencyDay,
        frequencyStartDate: txtFrequencyStartDate,
        userId: currentUser.userId
      };

      console.log("recordObject", recordObject);

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

          console.log("results", results);

          if (typeof results === "object") {

            return results.json();

          } else {

            console.error("error");
            dispatch(addErrorMessage(`${operationValue}: No results.`));

          };

        })
        .then((results) => {

          console.log("results", results);

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


  const closeForm = () => {

    dispatch(setComponentToLoad(""));

    setTxtIncomeName("");
    setTxtIncomeAmount("");
    setTxtFrequencyInterval(1);
    setDdFrequencyType("month");
    setTxtFrequencyDay(1);
    setDdFrequencyDayOfWeek("Sunday");
    setCbxLast(false);
    setTxtFrequencyStartDate("");

  };


  return (
    <div>

      {isEmpty(currentIncome) === false ? <h2>Edit Income</h2> : <h2>Add Income</h2>}

      <StyledIncomeForm onSubmit={(event) => { event.preventDefault(); }}>

        <FormInput
          formInputId="txtIncomeName"
          labelText="Name"
          isRequired={true}
          inlineError={inlineErrors.txtIncomeName}
          inputValue={txtIncomeName}
          updateValue={setTxtIncomeName}
        />

        <FormInput
          formInputId="txtIncomeAmount"
          labelText="Amount"
          isRequired={true}
          inlineError={inlineErrors.txtIncomeAmount}
          inputValue={txtIncomeAmount}
          updateValue={setTxtIncomeAmount}
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
                    <input type="checkbox" id="cbxLast" checked={cbxLast} onChange={(event) => { setCbxLast(!cbxLast); }} />
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
          <button type="submit" className="btn btn-primary" onClick={(event) => { handleSubmit(event); }}>Submit</button>
          <button type="button" className="btn btn-light-gray" onClick={() => { closeForm(); }}>Cancel</button>
        </div>

      </StyledIncomeForm>

    </div >
  );
};

export default IncomeForm;