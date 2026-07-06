import { Dispatch, SetStateAction } from "react";
import classnames from "classnames";
import { isEmpty, isNonEmptyArray, parse } from "../../../utilities/sharedFunctions";
import RequiredFieldAsterisk from "../common/RequiredFieldAsterisk";
import type { OptionText } from "@/types/Form";

type FormDropdownProps<TOption extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  label: string;
  optionData: TOption[];
  optionID: keyof TOption & string;
  optionText: OptionText[];
  value: string;
  disabled?: boolean;
  emptyOption?: boolean;
  hint?: string;
  inlineError?: string;
  isRequired?: boolean;
  placeholder?: string;
  srOnly?: boolean;
  useInputAddon?: boolean;
  updateValue: Dispatch<SetStateAction<string>> | ((value: string) => void);
};

const FormDropdown = <TOption extends Record<string, unknown> = Record<string, unknown>>({
  id = "",
  label = "",
  optionData = [],
  optionID = "" as keyof TOption & string,
  optionText = [],
  value = "",
  disabled = false,
  emptyOption = false,
  hint = "",
  inlineError = "",
  isRequired = false,
  placeholder = "Select Value",
  srOnly = false,
  useInputAddon = false,
  updateValue
}: FormDropdownProps<TOption>) => {
  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023 MF
  const labelClasses: string = classnames("", {
    "sr-only": srOnly,
    "input-addon": useInputAddon
  });

  const formGroupClasses: string = classnames("form-group", {
    "with-addon": useInputAddon,
    "input-error": !isEmpty(inlineError),
    "input-disabled": disabled
  });

  const getOptionDisplayText = (optionDataItem: TOption, optionText: OptionText[]) =>
    optionText
      .map(optionTextItem =>
        optionTextItem.type === "property"
          ? String(optionDataItem[optionTextItem.text as keyof TOption] ?? "")
          : optionTextItem.text
      )
      .join(" ");

  return (
    <div className={formGroupClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}

        {isRequired === true ? <RequiredFieldAsterisk /> : null}
      </label>

      {!isEmpty(hint) ? <p className="input-hint">{parse(hint)}</p> : null}

      <select
        className="form-control"
        id={id}
        value={value}
        disabled={disabled}
        onChange={event => updateValue(event.target.value)}
      >
        {!emptyOption ? <option value="">{placeholder}</option> : null}

        {isNonEmptyArray(optionData) && !isEmpty(optionID) && isNonEmptyArray(optionText)
          ? optionData.map((optionDataItem, index) => {
              const optionValue = String(optionDataItem[optionID] ?? "");
              return (
                <option key={optionValue || index} value={optionValue}>
                  {getOptionDisplayText(optionDataItem, optionText)}
                </option>
              );
            })
          : null}
      </select>

      {!isEmpty(inlineError) ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}
    </div>
  );
};

export default FormDropdown;
