import { Dispatch, SetStateAction } from "react";
import classnames from "classnames";
import { isEmpty, parse } from "../../../utilities/sharedFunctions";
import RequiredFieldAsterisk from "../common/RequiredFieldAsterisk";

type ToggleSwitchProps = {
  id: string;
  label: string;
  value: boolean;
  disabled?: boolean;
  falseValue?: string;
  hint?: string;
  isRequired?: boolean;
  srOnly?: boolean;
  trueValue?: string;
  updateValue: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void);
};

const ToggleSwitch = ({
  id = "",
  label = "",
  value = false,
  disabled = false,
  falseValue = "No",
  hint = "",
  isRequired = false,
  srOnly = false,
  trueValue = "Yes",
  updateValue
}: ToggleSwitchProps) => {
  // * If srOnly is set to true, then the form item label is only visible to screen readers. -- 06/21/2023 MF
  const labelClasses: string = classnames("", {
    "sr-only": srOnly
  });

  const fieldsetClasses: string = classnames("form-group toggle-switch-container", {
    "input-disabled": disabled
  });

  return (
    <fieldset className={fieldsetClasses}>
      <legend className={labelClasses}>
        {label}

        {isRequired ? <RequiredFieldAsterisk /> : null}
      </legend>

      {!isEmpty(hint) ? <p className="input-hint">{parse(hint)}</p> : null}

      <div className="toggle-switch" onClick={() => !disabled && updateValue(!value)}>
        <div className={`toggle-switch__button ${value ? "active" : ""}`}></div>

        <div className="toggle-switch__text">{value ? <>{trueValue}</> : <>{falseValue}</>}</div>

        <label className="sr-only">
          <input
            type="radio"
            id={`${id}false`}
            checked={!value}
            value="false"
            disabled={disabled}
            onChange={() => updateValue(false)}
          />

          {falseValue}
        </label>

        <label className="sr-only">
          <input
            type="radio"
            id={`${id}true`}
            checked={value}
            value="true"
            disabled={disabled}
            onChange={() => updateValue(true)}
          />

          {trueValue}
        </label>
      </div>
    </fieldset>
  );
};

export default ToggleSwitch;
