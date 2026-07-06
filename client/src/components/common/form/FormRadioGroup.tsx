import { Fragment, useState, useEffect, Dispatch, SetStateAction } from "react";
import classnames from "classnames";
import {
  isEmpty,
  isNonEmptyArray,
  formatToString,
  parse
} from "../../../utilities/sharedFunctions";
import RequiredFieldAsterisk from "../common/RequiredFieldAsterisk";
import { createOptionDisplayText } from "./formFunctions";
import type { OptionText } from "@/types/Form";

type RadioOption = Record<string, unknown> & { active?: boolean };

type FormRadioGroupProps = {
  id: string;
  optionData: RadioOption[];
  optionID: string;
  optionText: OptionText[];
  value: string;
  collapseList?: boolean;
  columns?: number;
  disabled?: boolean;
  hint?: string;
  inlineError?: string;
  isCollapsible?: boolean;
  isRequired?: boolean;
  legend?: string;
  srOnly?: boolean;
  startCollapsed?: boolean;
  setCollapseList?: Dispatch<SetStateAction<boolean>>;
  updateValue: Dispatch<SetStateAction<string>> | ((value: string) => void);
};

const FormRadioGroup = ({
  id = "",
  optionData = [],
  optionID = "",
  optionText = [],
  value = "",
  collapseList = false,
  columns = 1,
  disabled = false,
  hint = "",
  inlineError = "",
  isCollapsible = false,
  isRequired = false,
  legend = "",
  srOnly = false,
  startCollapsed = true,
  setCollapseList,
  updateValue
}: FormRadioGroupProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const fieldsetClasses: string = classnames("form-group", {
    "input-disabled": disabled
  });

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023 MF
  const labelClasses: string = classnames("", {
    "sr-only": srOnly
  });

  const radioGroupClasses: string = classnames("radio-group", {
    "is-collapsible": isCollapsible,
    show: !isCollapsed,
    "input-error": !isEmpty(inlineError)
  });

  useEffect(() => {
    setIsCollapsed(isCollapsible ? startCollapsed : false);
  }, [isCollapsible, startCollapsed]);

  useEffect(() => {
    if (!collapseList) return;
    setIsCollapsed(true);
    setCollapseList?.(false);
  }, [collapseList, setCollapseList]);

  return (
    <fieldset className={fieldsetClasses}>
      <legend className={labelClasses}>
        {isCollapsible ? (
          <button
            type="button"
            className="btn btn-transparent collapse-checkboxes-button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {legend}

            {isRequired ? <RequiredFieldAsterisk /> : null}

            {!isEmpty(value) ? <div className="search-filter-count">1</div> : null}

            {isCollapsed ? (
              <>
                <i className="fa fa-chevron-down"></i>
                <span className="sr-only">Open</span>
              </>
            ) : (
              <>
                <i className="fa fa-chevron-up"></i>
                <span className="sr-only">Close</span>
              </>
            )}
          </button>
        ) : (
          <>
            {legend}

            {isRequired ? <RequiredFieldAsterisk /> : null}
          </>
        )}
      </legend>

      <ul className={radioGroupClasses} style={{ columns }}>
        {!isEmpty(hint) ? <p className="input-hint">{parse(hint)}</p> : null}

        {isNonEmptyArray(optionData) && !isEmpty(optionID) && isNonEmptyArray(optionText) ? (
          <>
            {optionData.map(optionDataItem => {
              if (optionDataItem.active === true || isEmpty(optionDataItem.active)) {
                const optionValue = formatToString(optionDataItem[optionID]);
                const isChecked = optionValue === value;

                return (
                  <li key={optionValue}>
                    <label className={isChecked ? "active" : ""}>
                      <input
                        type="radio"
                        id={`${id}${optionValue}`}
                        name={id}
                        value={optionValue}
                        checked={isChecked}
                        disabled={disabled}
                        onChange={event => updateValue(event.target.value)}
                      />

                      {optionText.map((optionTextItem: OptionText, index: number) => (
                        <Fragment key={index}>
                          {createOptionDisplayText(optionDataItem, optionTextItem)}
                        </Fragment>
                      ))}
                    </label>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </>
        ) : null}
      </ul>

      {!isEmpty(inlineError) ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}

      {isCollapsible ? <hr /> : null}
    </fieldset>
  );
};

export default FormRadioGroup;
