// @ts-nocheck
import React, { useState } from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime, parse } from "../../utilities/sharedFunctions";

const FormInput = props => {
  // * Available props: -- 06/21/2023
  // * Properties: formInputId, labelText, srOnly, isRequired, inputType, placeholderText, inputValue, inputDisabled, inputHint, textareaRows, textareaColumns, inputMin, inputMax, inputStep -- 06/21/2023
  // * Functions: onChange -- 06/21/2023

  const componentName = "FormInput";

  const formInputId =
    isEmpty(props) === false && isEmpty(props.formInputId) === false ? props.formInputId : "";
  const labelText =
    isEmpty(props) === false && isEmpty(props.labelText) === false ? props.labelText : "";
  const srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  const isRequired =
    isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  const inputType =
    isEmpty(props) === false && isEmpty(props.inputType) === false ? props.inputType : "text";
  const placeholderText =
    isEmpty(props) === false && isEmpty(props.placeholderText) === false
      ? props.placeholderText
      : "";
  const inputValue =
    isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  const inputDisabled =
    isEmpty(props) === false && isEmpty(props.inputDisabled) === false
      ? props.inputDisabled
      : false;
  const inputHint =
    isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";
  const textareaRows =
    isEmpty(props) === false && isEmpty(props.textareaRows) === false ? props.textareaRows : 10;
  // let textareaColumns = isEmpty(props) === false && isEmpty(props.textareaColumns) === false ? props.textareaColumns : "";
  const useInputAddon =
    isEmpty(props) === false && isEmpty(props.useInputAddon) === false
      ? props.useInputAddon
      : false;
  const datalistName =
    isEmpty(props) === false && isEmpty(props.datalistName) === false ? props.datalistName : [];

  // * For number, range, date, datetime-local, month, time and week -- 07/25/2023 JH
  // * Default value is null to prevent other input types from having the attribute -- 07/25/2023 JH
  const inputMin =
    isEmpty(props) === false && isEmpty(props.inputMin) === false ? props.inputMin : null;
  const inputMax =
    isEmpty(props) === false && isEmpty(props.inputMax) === false ? props.inputMax : null;
  const inputStep =
    isEmpty(props) === false && isEmpty(props.inputStep) === false ? props.inputStep : null;

  const inlineError =
    isEmpty(props) === false && isEmpty(props.inlineError) === false ? props.inlineError : "";

  const updateValue =
    isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  const [showPassword, setShowPassword] = useState("password");

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  const labelClasses = classnames("", {
    "sr-only": srOnly === true,
    "input-addon": useInputAddon === true
  });

  const formGroupClasses = classnames("form-group", {
    "with-addon": useInputAddon === true,
    "input-error": isEmpty(inlineError) === false
  });

  const handleOnChange = event => {
    if (inputType === "number") {
      if (isEmpty(event.target.value) === false && isNaN(event.target.value) === false) {
        updateValue(Number.parseFloat(event.target.value));
      } else {
        updateValue(event.target.value);
      }
    } else {
      updateValue(event.target.value);
    }
  };

  return (
    <div className={formGroupClasses}>
      <label htmlFor={formInputId} className={labelClasses}>
        {labelText}

        {isRequired === true ? (
          <span className="required">
            {" "}
            * <span className="sr-only">required</span>
          </span>
        ) : null}
      </label>

      {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

      {inputType === "textarea" ? (
        <textarea
          id={formInputId}
          name={formInputId}
          placeholder={placeholderText}
          rows={textareaRows}
          /* cols={textareaColumns} */ value={inputValue}
          disabled={inputDisabled}
          onChange={event => handleOnChange(event)}
        />
      ) : null}

      {/* // TODO add other input types -- 08/07/2023 JH */}
      {inputType !== "textarea" &&
      inputType !== "toggle" &&
      inputType !== "password" &&
      inputType !== "color" ? (
        <input
          type={inputType}
          id={formInputId}
          placeholder={placeholderText}
          value={inputValue}
          disabled={inputDisabled}
          onChange={event => handleOnChange(event)}
          min={inputMin}
          max={inputMax}
          step={inputStep}
          list={datalistName}
        />
      ) : null}

      {inputType === "color" ? (
        <div className="color-input-container">
          <input
            type={inputType}
            id={formInputId}
            placeholder={placeholderText}
            value={inputValue}
            disabled={inputDisabled}
            onChange={event => handleOnChange(event)}
          />
          {inputValue}
        </div>
      ) : null}

      {inputType === "password" ? (
        <div className="form-group__password-input-group">
          <input
            type={showPassword}
            id={formInputId}
            placeholder={placeholderText}
            value={inputValue}
            disabled={inputDisabled}
            onChange={event => handleOnChange(event)}
            min={inputMin}
            max={inputMax}
            step={inputStep}
          />

          <div
            className="form-group__password-input-group__password-addon"
            onMouseOver={event => {
              setShowPassword("text");
            }}
            onMouseOut={event => {
              setShowPassword("password");
            }}
            title="Hover to show password."
          >
            <i className="fas fa-eye"></i>
            <span className="sr-only">Hover to show password.</span>
          </div>
        </div>
      ) : null}

      {isEmpty(inlineError) === false ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
