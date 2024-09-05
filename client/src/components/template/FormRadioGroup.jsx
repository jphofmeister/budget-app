import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, formatToString, parse } from "../../utilities/sharedFunctions";

const FormRadioGroup = (props) => {

  // * Available props: -- 06/21/2023
  // * Properties: formInputID, legendText, srOnly, placeholderText,isRequired, inputDisabled, optionData, optionID, optionText, inputValue, inputHint, formColumns -- 06/21/2023
  // * Functions: updateValue -- 06/21/2023

  const componentName = "FormRadioGroup";

  let formInputID = isEmpty(props) === false && isEmpty(props.formInputID) === false ? props.formInputID : "";
  let legendText = isEmpty(props) === false && isEmpty(props.legendText) === false ? props.legendText : "";
  let srOnly = isEmpty(props) === false && isEmpty(props.srOnly) === false ? props.srOnly : "";
  let isRequired = isEmpty(props) === false && isEmpty(props.isRequired) === false ? props.isRequired : false;
  let inputDisabled = isEmpty(props) === false && isEmpty(props.inputDisabled) === false ? props.inputDisabled : false;
  let isCollapsible = isEmpty(props) === false && isEmpty(props.isCollapsible) === false ? props.isCollapsible : false;
  let startCollapsed = isEmpty(props) === false && isEmpty(props.startCollapsed) === false ? props.startCollapsed : true;

  let optionData = isEmpty(props) === false && isEmpty(props.optionData) === false ? props.optionData : null;
  let optionID = isEmpty(props) === false && isEmpty(props.optionID) === false ? props.optionID : "";
  let optionText = isEmpty(props) === false && isEmpty(props.optionText) === false ? props.optionText : [];
  let inputValue = isEmpty(props) === false && isEmpty(props.inputValue) === false ? props.inputValue : "";
  let inputHint = isEmpty(props) === false && isEmpty(props.inputHint) === false ? props.inputHint : "";

  let formColumns = isEmpty(props) === false && isEmpty(props.formColumns) === false ? props.formColumns : 1;

  let inlineError = isEmpty(props) === false && isEmpty(props.inlineError) === false ? props.inlineError : "";

  let updateValue = isEmpty(props.updateValue) === false ? props.updateValue : noFunctionAvailable;

  const [isCollapsed, setIsCollapsed] = useState(true);

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023
  let labelClasses = classnames("", {
    "sr-only": srOnly === true
  });

  let radioGroupClasses = classnames("radio-group", {
    "is-collapsible": isCollapsible === true,
    "show": isCollapsed !== true,
    "input-error": isEmpty(inlineError) === false
  });


  useEffect(() => {

    // * If isCollapsible is false, then isCollapsed is always false. -- 10/10/2023
    if (isCollapsible === true) {

      setIsCollapsed(true);

    } else {

      setIsCollapsed(false);

    };

  }, [isCollapsible]);


  useEffect(() => {

    if (startCollapsed === false) {

      setIsCollapsed(false);

    };

  }, [startCollapsed]);


  return (
    <fieldset className="form-group">

      <legend className={labelClasses}>

        {isCollapsible === true ?

          <button type="button" className="btn btn-transparent collapse-checkboxes-button" onClick={(event) => { setIsCollapsed(!isCollapsed); }}>

            {legendText}

            {isRequired === true ? <span className="required"> * <span className="sr-only">required</span></span> : null}

            {isEmpty(inputValue) === false ? <div className="search-filter-count">1</div> : null}

            {isCollapsed === true ?

              <React.Fragment>

                <i className="fa fa-chevron-down"></i><span className="sr-only">Open</span>

              </React.Fragment>

              :

              <React.Fragment>

                <i className="fa fa-chevron-up"></i><span className="sr-only">Close</span>

              </React.Fragment>

            }

          </button>

          :

          <React.Fragment>

            {legendText}

            {isRequired === true ? <span className="required"> * <span className="sr-only">required</span></span> : null}

          </React.Fragment>

        }

      </legend>

      <ul className={radioGroupClasses} style={{ columns: formColumns }}>

        {isEmpty(inputHint) === false ? <p className="input-hint">{parse(inputHint)}</p> : null}

        {isNonEmptyArray(optionData) === true && isEmpty(optionID) === false && isNonEmptyArray(optionText) === true ?

          <React.Fragment>

            {optionData.map((optionDataItem) => {

              if (optionDataItem.active === true || isEmpty(optionDataItem.active) === true) {

                // TODO: Temporary fix to convert true/false to 1/2. -- 09/13/2023 JH
                let newInputValue = inputValue;

                if (typeof newInputValue == "boolean") {

                  newInputValue = newInputValue === true ? 1 : 2;

                };

                return (
                  <li key={optionDataItem[optionID]}>
                    <label>

                      <input type="radio" id={formInputID} value={optionDataItem[optionID]} checked={formatToString(optionDataItem[optionID]) === formatToString(newInputValue)} disabled={inputDisabled} onChange={(event) => { updateValue(event.target.value); }} />

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

                    </label>
                  </li>
                );

              };

            })}

          </React.Fragment>

          : null}

      </ul>

      {isEmpty(inlineError) === false ?

        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>

        : null}

      {isCollapsible === true ?

        <hr />

        : null}

    </fieldset>
  );
};

export default FormRadioGroup;