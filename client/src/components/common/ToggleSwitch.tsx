// @ts-nocheck
import React from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime, parse } from "../../utilities/sharedFunctions";

const FormInput = props => {
  // * Available props: -- 06/21/2023
  // * Properties: formInputId, labelText, srOnly, isRequired, inputValue, inputDisabled, inputHint, trueValue, falseValue -- 06/21/2023
  // * Functions: updateValue -- 06/21/2023

  const componentName = "FormInput";

  const formInputId =
    isEmpty(props) === false && isEmpty(props.formInputId) === false ? props.formInputId : "";
  const labelText =
    isEmpty(props) === false && isEmpty(props.labelText) === false ? props.labelText : "";
  const srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  const isRequired =
    isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  const inputValue =
    isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  const inputDisabled =
    isEmpty(props) === false && isEmpty(props.inputDisabled) === false
      ? props.inputDisabled
      : false;
  const inputHint =
    isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";
  const trueValue =
    isEmpty(props) === false && isEmpty(props.trueValue) === false ? props.trueValue : "Yes";
  const falseValue =
    isEmpty(props) === false && isEmpty(props.falseValue) === false ? props.falseValue : "No";

  const updateValue =
    isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  const labelClasses = classnames("", {
    "sr-only": srOnly === true
  });

  return (
    <fieldset className="form-group toggle-switch-container">
      <legend htmlFor={formInputId} className={labelClasses}>
        {labelText}

        {isRequired === true ? (
          <span className="required">
            {" "}
            * <span className="sr-only">required</span>
          </span>
        ) : null}
      </legend>

      {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

      <div
        className="toggle-switch"
        onClick={() => {
          updateValue(!inputValue);
        }}
      >
        <div className={`toggle-switch__button ${inputValue === true ? "active" : ""}`}></div>

        <div className="toggle-switch__text">
          {inputValue === true ? (
            <React.Fragment>{trueValue}</React.Fragment>
          ) : (
            <React.Fragment>{falseValue}</React.Fragment>
          )}
        </div>

        <label className="sr-only">
          <input
            type="radio"
            id={formInputId}
            checked={inputValue !== true}
            value="false"
            disabled={inputDisabled}
            onChange={event => {
              updateValue(event.target.value);
            }}
          />

          {falseValue}
        </label>

        <label className="sr-only">
          <input
            type="radio"
            id={formInputId}
            checked={inputValue === true}
            value="true"
            disabled={inputDisabled}
            onChange={event => {
              updateValue(event.target.value);
            }}
          />

          {trueValue}
        </label>
      </div>
    </fieldset>
  );
};

export default FormInput;
