// @ts-nocheck
import React from "react";
import classnames from "classnames";
import {
  noFunctionAvailable,
  isEmpty,
  getDateTime,
  isNonEmptyArray,
  parse
} from "../../utilities/sharedFunctions";

const FormDropdown = props => {
  // * Available props: -- 06/21/2023
  // * Properties: formInputId, labelText, srOnly, placeholderText,isRequired, inputDisabled, optionData, optionId, optionText, inputValue, inputHint -- 06/21/2023
  // * Functions: updateValue -- 06/21/2023

  const componentName = "FormDropdown";

  const formInputId =
    isEmpty(props) === false && isEmpty(props.formInputId) === false ? props.formInputId : "";
  const labelText =
    isEmpty(props) === false && isEmpty(props.labelText) === false ? props.labelText : "";
  const srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  const placeholderText =
    isEmpty(props) === false && isEmpty(props.placeholderText) === false
      ? props.placeholderText
      : "Select Value";
  const isRequired =
    isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  const inputDisabled =
    isEmpty(props) === false && isEmpty(props.inputDisabled) === false
      ? props.inputDisabled
      : false;
  const useInputAddon =
    isEmpty(props) === false && isEmpty(props.useInputAddon) === false
      ? props.useInputAddon
      : false;

  const emptyOption =
    isEmpty(props) === false && isEmpty(props.emptyOption) === false ? props.emptyOption : false;
  const optionData =
    isEmpty(props) === false && isEmpty(props.optionData) === false ? props.optionData : null;
  const optionId =
    isEmpty(props) === false && isEmpty(props.optionId) === false ? props.optionId : "";
  const optionText =
    isEmpty(props) === false && isEmpty(props.optionText) === false ? props.optionText : [];
  const inputValue =
    isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  const inputHint =
    isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";

  const inlineError =
    isEmpty(props) === false && isEmpty(props.inlineError) === false ? props.inlineError : "";

  const updateValue =
    isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  const labelClasses = classnames("", {
    "sr-only": srOnly === true,
    "input-addon": useInputAddon === true
  });

  const formGroupClasses = classnames("form-group", {
    "with-addon": useInputAddon === true,
    "input-error": isEmpty(inlineError) === false
  });

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

      <select
        className="form-control"
        id={formInputId}
        value={inputValue}
        disabled={inputDisabled}
        onChange={event => {
          updateValue(event.target.value);
        }}
      >
        {emptyOption !== true ? <option value="">{placeholderText}</option> : null}

        {isNonEmptyArray(optionData) === true &&
        isEmpty(optionId) === false &&
        isNonEmptyArray(optionText) === true ? (
          <React.Fragment>
            {optionData.map(optionDataItem => {
              return (
                <option key={optionDataItem[optionId]} value={optionDataItem[optionId]}>
                  {optionText.map((optionTextItem, index) => {
                    let displayOptionText = "";

                    if (optionTextItem.type === "property") {
                      displayOptionText = optionDataItem[optionTextItem.text];
                    } else if (optionTextItem.type === "string") {
                      displayOptionText = optionTextItem.text;
                    }

                    return <React.Fragment key={index}>{displayOptionText}</React.Fragment>;
                  })}
                </option>
              );
            })}
          </React.Fragment>
        ) : null}
      </select>

      {isEmpty(inlineError) === false ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}
    </div>
  );
};

export default FormDropdown;
