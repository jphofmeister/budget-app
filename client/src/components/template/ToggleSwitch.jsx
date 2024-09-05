import React from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime, parse } from "../../utilities/sharedFunctions";

const FormInput = (props) => {

  // * Available props: -- 06/21/2023
  // * Properties: formInputID, labelText, srOnly, isRequired, inputValue, inputDisabled, inputHint, trueValue, falseValue -- 06/21/2023
  // * Functions: updateValue -- 06/21/2023

  const componentName = "FormInput";

  let formInputID = isEmpty(props) === false && isEmpty(props.formInputID) === false ? props.formInputID : "";
  let labelText = isEmpty(props) === false && isEmpty(props.labelText) === false ? props.labelText : "";
  let srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  let isRequired = isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  let inputValue = isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  let inputDisabled = isEmpty(props) === false && isEmpty(props.inputDisabled) === false ? props.inputDisabled : false;
  let inputHint = isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";
  let trueValue = isEmpty(props) === false && isEmpty(props.trueValue) === false ? props.trueValue : "Yes";
  let falseValue = isEmpty(props) === false && isEmpty(props.falseValue) === false ? props.falseValue : "No";

  let updateValue = isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  let labelClasses = classnames("", {
    "sr-only": srOnly === true
  });


  return (
    <fieldset className="form-group toggle-switch-container">

      <legend htmlFor={formInputID} className={labelClasses}>

        {labelText}

        {isRequired === true ? <span className="required"> * <span className="sr-only">required</span></span> : null}

      </legend>

      {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

      <div className="toggle-switch" onClick={() => { updateValue(!inputValue); }}>

        <div className={`toggle-switch__button ${inputValue === true ? "active" : ""}`}></div>

        <div className="toggle-switch__text">{inputValue === true ? <React.Fragment>{trueValue}</React.Fragment> : <React.Fragment>{falseValue}</React.Fragment>}</div>

        <label className="sr-only">

          <input type="radio" id={formInputID} checked={inputValue !== true} value="false" disabled={inputDisabled} onChange={(event) => { updateValue(event.target.value); }} />

          {falseValue}

        </label>

        <label className="sr-only">

          <input type="radio" id={formInputID} checked={inputValue === true} value="true" disabled={inputDisabled} onChange={(event) => { updateValue(event.target.value); }} />

          {trueValue}

        </label>

      </div>

    </fieldset>
  );
};

export default FormInput;