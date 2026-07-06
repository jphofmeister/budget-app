// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import {
  noFunctionAvailable,
  isEmpty,
  getDateTime,
  isNonEmptyArray,
  formatToString,
  parse
} from "../../utilities/sharedFunctions";
import { useNativeClickListener } from "../../utilities/useNativeClickListener";

const CheckboxDropdown = props => {
  // * Available props: -- 06/21/2023
  // * Properties: formInputId, legendText, srOnly, isRequired, inputDisabled, isCollapsible, startCollapsed, optionData, optionId, optionText, inputValue, inputHint -- 06/21/2023
  // * Functions: updateValue -- 06/21/2023

  const componentName = "CheckboxDropdown";

  const dropdownRef = useRef(null);

  const formInputId =
    isEmpty(props) === false && isEmpty(props.formInputId) === false ? props.formInputId : "";
  const legendText =
    isEmpty(props) === false && isEmpty(props.legendText) === false ? props.legendText : "";
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

  const optionData =
    isEmpty(props) === false && isEmpty(props.optionData) === false ? props.optionData : null;
  const optionId =
    isEmpty(props) === false && isEmpty(props.optionId) === false ? props.optionId : "";
  const optionText =
    isEmpty(props) === false && isEmpty(props.optionText) === false ? props.optionText : [];
  const inputValue =
    isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : [];
  const inputHint =
    isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";

  const formColumns =
    isEmpty(props) === false && isEmpty(props.formColumns) === false ? props.formColumns : 1;

  const inlineError =
    isEmpty(props) === false && isEmpty(props.inlineError) === false ? props.inlineError : "";

  const updateValue =
    isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  const [isDropdownOpen, setIsDropdownOpen] = useNativeClickListener(dropdownRef, false);

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  const labelClasses = classnames("", {
    "sr-only": srOnly === true
  });

  const checkboxDropdownClasses = classnames("checkbox-dropdown-container", {
    // "show": isDropdownOpen !== true,
    "input-error": isEmpty(inlineError) === false
  });

  const handleOnChange = event => {
    if (event.target.checked === true) {
      const newCheckedList = [...inputValue, event.target.value];

      updateValue(newCheckedList);
    } else {
      const filteredList = inputValue.filter(value => value !== event.target.value);

      updateValue(filteredList);
    }
  };

  return (
    <fieldset className="form-group checkbox-dropdown-group" ref={dropdownRef}>
      <legend className={labelClasses}>
        {legendText}{" "}
        {isRequired === true ? (
          <span className="required">
            {" "}
            * <span className="sr-only">required</span>
          </span>
        ) : null}
      </legend>

      <button
        type="button"
        className="btn btn-transparent open-dropdown-button"
        onClick={event => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {isNonEmptyArray(inputValue) === true ? (
          <React.Fragment>{inputValue.length} selected</React.Fragment>
        ) : (
          placeholderText
        )}

        {isDropdownOpen === true ? (
          <React.Fragment>
            <i className="fa fa-angle-up"></i>
            <span className="sr-only">Close</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <i className="fa fa-angle-down"></i>
            <span className="sr-only">Open</span>
          </React.Fragment>
        )}
      </button>

      {isDropdownOpen === true ? (
        <div className={checkboxDropdownClasses}>
          <ul className="checkbox-dropdown" style={{ columns: formColumns }}>
            {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

            {isNonEmptyArray(optionData) === true &&
            isEmpty(optionId) === false &&
            isNonEmptyArray(optionText) === true ? (
              <React.Fragment>
                {optionData.map((optionDataItem, index) => {
                  if (optionDataItem.active === true || isEmpty(optionDataItem.active) === true) {
                    const filterInputValue = inputValue.filter(
                      value => value === formatToString(optionDataItem[optionId])
                    );

                    const isChecked = isNonEmptyArray(filterInputValue) === true ? true : false;

                    return (
                      <li key={index}>
                        <label>
                          <input
                            type="checkbox"
                            id={formInputId}
                            value={optionDataItem[optionId]}
                            checked={isChecked}
                            disabled={inputDisabled}
                            onChange={event => {
                              handleOnChange(event);
                            }}
                          />

                          <span className="checkbox-label-text">
                            {optionText.map((optionTextItem, index) => {
                              let displayOptionText = "";

                              if (optionTextItem.type === "property") {
                                displayOptionText = optionDataItem[optionTextItem.text];
                              } else if (optionTextItem.type === "string") {
                                displayOptionText = optionTextItem.text;
                              }

                              return (
                                <React.Fragment key={index}>{displayOptionText}</React.Fragment>
                              );
                            })}
                          </span>
                        </label>
                      </li>
                    );
                  }
                })}
              </React.Fragment>
            ) : null}
          </ul>
        </div>
      ) : null}

      {isEmpty(inlineError) === false ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}
    </fieldset>
  );
};

export default CheckboxDropdown;
