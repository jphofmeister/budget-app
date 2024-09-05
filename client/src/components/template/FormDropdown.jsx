import React from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, parse } from "../../utilities/sharedFunctions";

const FormDropdown = (props) => {

  // * Available props: -- 06/21/2023
  // * Properties: formInputID, labelText, srOnly, placeholderText,isRequired, inputDisabled, optionData, optionID, optionText, inputValue, inputHint -- 06/21/2023
  // * Functions: updateValue -- 06/21/2023

  const componentName = "FormDropdown";

  let formInputID = isEmpty(props) === false && isEmpty(props.formInputID) === false ? props.formInputID : "";
  let labelText = isEmpty(props) === false && isEmpty(props.labelText) === false ? props.labelText : "";
  let srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  let placeholderText = isEmpty(props) === false && isEmpty(props.placeholderText) === false ? props.placeholderText : "Select Value";
  let isRequired = isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  let inputDisabled = isEmpty(props) === false && isEmpty(props.inputDisabled) === false ? props.inputDisabled : false;
  let useInputAddon = isEmpty(props) === false && isEmpty(props.useInputAddon) === false ? props.useInputAddon : false;

  let emptyOption = isEmpty(props) === false && isEmpty(props.emptyOption) === false ? props.emptyOption : false;
  let optionData = isEmpty(props) === false && isEmpty(props.optionData) === false ? props.optionData : null;
  let optionID = isEmpty(props) === false && isEmpty(props.optionID) === false ? props.optionID : "";
  let optionText = isEmpty(props) === false && isEmpty(props.optionText) === false ? props.optionText : [];
  let inputValue = isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  let inputHint = isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";

  let inlineError = isEmpty(props) === false && isEmpty(props.inlineError) === false ? props.inlineError : "";

  let updateValue = isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  let labelClasses = classnames("", {
    "sr-only": srOnly === true,
    "input-addon": useInputAddon === true
  });

  let formGroupClasses = classnames("form-group", {
    "with-addon": useInputAddon === true,
    "input-error": isEmpty(inlineError) === false
  });


  return (
    <div className={formGroupClasses}>

      <label htmlFor={formInputID} className={labelClasses}>

        {labelText}

        {isRequired === true ? <span className="required"> * <span className="sr-only">required</span></span> : null}

      </label>

      {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

      <select className="form-control" id={formInputID} value={inputValue} disabled={inputDisabled} onChange={(event) => { updateValue(event.target.value); }}>

        {emptyOption !== true ? <option value="">{placeholderText}</option> : null}

        {isNonEmptyArray(optionData) === true && isEmpty(optionID) === false && isNonEmptyArray(optionText) === true ?

          <React.Fragment>

            {optionData.map((optionDataItem) => {

              return (
                <option key={optionDataItem[optionID]} value={optionDataItem[optionID]}>

                  {optionText.map((optionTextItem, index) => {

                    let displayOptionText = "";

                    if (optionTextItem.type === "property") {

                      displayOptionText = optionDataItem[optionTextItem.text];

                    } else if (optionTextItem.type === "string") {

                      displayOptionText = optionTextItem.text;

                    };

                    return (
                      <React.Fragment key={index}>{displayOptionText}</React.Fragment>
                    );

                  })}

                </option>
              );
            })}

          </React.Fragment>

          : null}

      </select>

      {isEmpty(inlineError) === false ?

        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>

        : null}

    </div>
  );
};

export default FormDropdown;