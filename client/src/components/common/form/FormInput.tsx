import {
  useState,
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  KeyboardEventHandler,
  Dispatch,
  SetStateAction
} from "react";
import classnames from "classnames";
import { isEmpty, parse } from "../../../utilities/sharedFunctions";
import RequiredFieldAsterisk from "../common/RequiredFieldAsterisk";

type FieldValue = string | number | readonly string[] | undefined;

type FormInputProps<TValue extends FieldValue = string> = {
  id: string;
  label: string;
  value: TValue;
  autoFocus?: boolean;
  disabled?: boolean;
  hint?: string;
  inlineError?: string;
  isRequired?: boolean;
  list?: string;
  max?: number | null;
  maxLength?: number | null;
  min?: number | null;
  placeholder?: string;
  rows?: number;
  srOnly?: boolean;
  step?: number | null;
  type?: HTMLInputTypeAttribute | "textarea";
  useInputAddon?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  updateValue: Dispatch<SetStateAction<TValue>> | ((value: TValue) => void);
};

const FormInput = <TValue extends FieldValue = string>({
  id = "",
  label = "",
  value,
  autoFocus = false,
  disabled = false,
  hint = "",
  inlineError = "",
  isRequired = false,
  list = "",
  max = null,
  maxLength = null,
  min = null,
  placeholder = "",
  rows = 10,
  step = null,
  srOnly = false,
  type = "text",
  useInputAddon = false,
  onKeyDown = () => {}, // * Used an empty function instead of noFunctionAvailable so that console logs don't appear on every key down -- 09/02/2025 JH
  updateValue = (_: TValue) => {}
}: FormInputProps<TValue>) => {
  // * For number, range, date, datetime-local, month, time and week -- 07/25/2023 JH
  // * Default value is null to prevent other input types from having the attribute. -- 07/25/2023 JH
  // * onKeyDown is used exclusively for being able to press enter to submit in a textarea. -- 04/22/2025 JH

  const [showPassword, setShowPassword] = useState<"password" | "text">("password");

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

  const numberAttributes: Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "min" | "max" | "step" | "maxLength"
  > = {};

  // * condition is true only if the property is not null and not undefined. != instead of !== is intentional -- 02/18/2026 JW
  if (min != null) numberAttributes.min = min;
  if (max != null) numberAttributes.max = max;
  if (step != null) numberAttributes.step = step;
  if (maxLength != null) numberAttributes.maxLength = maxLength;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = event.target.value;

    if (type === "number") {
      const next = raw === "" ? ("" as unknown) : Number(raw);
      updateValue((Number.isNaN(next as number) ? raw : next) as unknown as TValue);
      return;
    }

    let next = raw;
    if (maxLength != null && next.length > maxLength) next = next.slice(0, maxLength);

    updateValue(next as unknown as TValue);
  };

  return (
    <div className={formGroupClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}

        {isRequired ? <RequiredFieldAsterisk /> : null}
      </label>

      {!isEmpty(hint) ? <p className="input-hint">{parse(hint)}</p> : null}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          rows={rows}
          value={value == null ? "" : String(value)}
          disabled={disabled}
          onChange={handleOnChange}
          onKeyDown={onKeyDown}
        />
      ) : null}

      {type === "color" ? (
        <div className="color-input-container">
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={handleOnChange}
            autoFocus={autoFocus}
          />
          {value}
        </div>
      ) : null}

      {type === "password" ? (
        <div className="form-group__password-input-group">
          <input
            type={showPassword}
            id={id}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={handleOnChange}
            autoFocus={autoFocus}
          />

          <div
            className="form-group__password-input-group__password-addon"
            onMouseOver={() => setShowPassword("text")}
            onMouseOut={() => setShowPassword("password")}
            title="Hover to show password."
          >
            <i className="fas fa-eye"></i>
            <span className="sr-only">Hover to show password.</span>
          </div>
        </div>
      ) : null}

      {type !== "textarea" && type !== "toggle" && type !== "password" && type !== "color" ? (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleOnChange}
          list={list}
          autoFocus={autoFocus}
          {...numberAttributes}
        />
      ) : null}

      {!isEmpty(inlineError) ? (
        <div className="inline-alert inline-alert-danger">{parse(inlineError)}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
