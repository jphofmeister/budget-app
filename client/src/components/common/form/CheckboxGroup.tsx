import { Fragment, useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
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

type CheckboxGroupProps = {
  id: string;
  legend: string;
  value: string[];
  optionData: Record<string, unknown>[];
  optionID: string;
  optionText: OptionText[];
  collapseList?: boolean;
  columns?: number;
  disabled?: boolean;
  hint?: string;
  inlineError?: string;
  isCollapsible?: boolean;
  isRequired?: boolean;
  srOnly?: boolean;
  startCollapsed?: boolean;
  setCollapseList?: (value: boolean) => void;
  updateValue: Dispatch<SetStateAction<string[]>> | ((value: string[]) => void);
};

const CheckboxGroup = ({
  id = "",
  legend = "",
  value = [],
  optionData = [],
  optionID = "",
  optionText = [],
  collapseList = false,
  columns = 1,
  disabled = false,
  hint = "",
  inlineError = "",
  isCollapsible = false,
  isRequired = false,
  srOnly = false,
  startCollapsed = true,
  setCollapseList,
  updateValue
}: CheckboxGroupProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const fieldsetClasses: string = classnames("form-group", {
    "input-disabled": disabled
  });

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023 MF
  const labelClasses: string = classnames("", {
    "sr-only": srOnly
  });

  const checkboxGroupClasses: string = classnames("checkbox-group", {
    "is-collapsible": isCollapsible,
    show: !isCollapsed,
    "input-error": !isEmpty(inlineError)
  });

  useEffect(() => {
    // * If isCollapsible is false, then isCollapsed is always false. -- 10/10/2023 MF
    if (isCollapsible) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isCollapsible]);

  useEffect(() => {
    if (startCollapsed === false) {
      setIsCollapsed(false);
    }
  }, [startCollapsed]);

  useEffect(() => {
    if (collapseList) {
      setIsCollapsed(true);

      // * ?. is ai suggested fix for the below error: -- 01/22/2026 JH
      // * Cannot invoke an object which is possibly 'undefined'.
      setCollapseList?.(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseList]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.value;

    updateValue(
      event.target.checked ? [...value, checkedValue] : value.filter(v => v !== checkedValue)
    );
  };

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

            {isNonEmptyArray(value) ? (
              <div className="search-filter-count">{value.length}</div>
            ) : null}

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

      <ul className={checkboxGroupClasses} style={{ columns }}>
        {!isEmpty(hint) ? <p className="input-hint">{parse(hint)}</p> : null}

        {isNonEmptyArray(optionData) && !isEmpty(optionID) && isNonEmptyArray(optionText) ? (
          <>
            {optionData.map((optionDataItem, index) => {
              if (optionDataItem.active === true || isEmpty(optionDataItem.active)) {
                const optionIdAsString = formatToString(optionDataItem[optionID]);
                const isChecked = value.includes(optionIdAsString);

                return (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        id={`${id}${optionIdAsString}`}
                        value={optionIdAsString}
                        checked={isChecked}
                        disabled={disabled}
                        onChange={handleOnChange}
                      />

                      <span className="checkbox-label-text">
                        {optionText.map((optionTextItem: OptionText, index: number) => (
                          <Fragment key={index}>
                            {createOptionDisplayText(optionDataItem, optionTextItem)}
                          </Fragment>
                        ))}
                      </span>
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

export default CheckboxGroup;
