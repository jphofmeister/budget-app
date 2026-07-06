import { Fragment, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import classnames from "classnames";
import {
  isEmpty,
  isNonEmptyArray,
  formatToString,
  parse
} from "../../../utilities/sharedFunctions";
import { useNativeClickListener } from "../../../hooks/useNativeClickListener";
import RequiredFieldAsterisk from "../common/RequiredFieldAsterisk";
import { createOptionDisplayText } from "./formFunctions";
import type { OptionText } from "@/types/Form";

type CheckboxDropdownOption = Record<string, unknown>;

type CheckboxDropdownProps = {
  id: string;
  legend: string;
  optionData: CheckboxDropdownOption[];
  optionID: string;
  optionText: OptionText[];
  value: string[];
  columns?: number;
  disabled?: boolean;
  hint?: string;
  inlineError?: string;
  isRequired?: boolean;
  placeholder?: string;
  srOnly?: boolean;
  updateValue: Dispatch<SetStateAction<string[]>> | ((value: string[]) => void);
};

const CheckboxDropdown = ({
  id = "",
  legend = "",
  optionData = [],
  optionID = "",
  optionText = [],
  value = [],
  columns = 1,
  disabled = false,
  hint = "",
  inlineError = "",
  isRequired = false,
  placeholder = "Select Value",
  srOnly = false,
  updateValue
}: CheckboxDropdownProps) => {
  const dropdownRef = useRef<HTMLFieldSetElement | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useNativeClickListener(dropdownRef, false);

  const fieldsetClasses: string = classnames("form-group checkbox-dropdown-group", {
    "input-disabled": disabled
  });

  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023 MF
  const labelClasses: string = classnames("", {
    "sr-only": srOnly
  });

  const checkboxDropdownClasses: string = classnames("checkbox-dropdown-container", {
    // "show": !isDropdownOpen,
    "input-error": !isEmpty(inlineError)
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.value; // string

    if (event.target.checked) {
      updateValue([...value, checkedValue]);
    } else {
      updateValue(value.filter(v => v !== checkedValue));
    }
  };

  return (
    <fieldset className={fieldsetClasses} ref={dropdownRef}>
      <legend className={labelClasses}>
        {legend} {isRequired ? <RequiredFieldAsterisk /> : null}
      </legend>

      <button
        type="button"
        className="btn btn-transparent open-dropdown-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {isNonEmptyArray(value) ? <>{value.length} selected</> : placeholder}

        {isDropdownOpen ? (
          <>
            <i className="fa fa-angle-up"></i>
            <span className="sr-only">Close</span>
          </>
        ) : (
          <>
            <i className="fa fa-angle-down"></i>
            <span className="sr-only">Open</span>
          </>
        )}
      </button>

      {isDropdownOpen ? (
        <div className={checkboxDropdownClasses}>
          <ul className="checkbox-dropdown" style={{ columns }}>
            {!isEmpty(hint) ? <p className="input-hint">{parse(hint)}</p> : null}

            {isNonEmptyArray(optionData) && !isEmpty(optionID) && isNonEmptyArray(optionText) ? (
              <>
                {optionData.map(optionDataItem => {
                  if (optionDataItem.active === true || isEmpty(optionDataItem.active)) {
                    const optionIdAsString = formatToString(optionDataItem[optionID]);
                    const isChecked = value.includes(optionIdAsString);

                    return (
                      <li key={optionIdAsString}>
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
        </div>
      ) : null}

      {!isEmpty(inlineError) ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}
    </fieldset>
  );
};

export default CheckboxDropdown;
