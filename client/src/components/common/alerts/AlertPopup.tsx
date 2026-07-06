import { Dispatch, SetStateAction } from "react";
import classnames from "classnames";
import { parse } from "../../../utilities/sharedFunctions";

type AlertType = "error" | "success" | "info" | "warning" | "";

type AlertPopupProps = {
  alertType: AlertType;
  message: string;
  includeResetButton?: boolean;
  setMessage: Dispatch<SetStateAction<string>> | ((value: string) => void);
};

const AlertPopup = ({
  alertType = "",
  message = "",
  includeResetButton = false,
  setMessage
}: AlertPopupProps) => {
  const alertClasses: string = classnames("alert", {
    "alert-success": alertType === "success",
    "alert-warning": alertType === "warning",
    "alert-info": alertType === "info",
    "alert-danger": alertType === "error"
  });

  return (
    <div className="alert-container">
      <div className={alertClasses}>
        <div className="alert__message-text">{parse(message)}</div>

        {includeResetButton ? (
          <button type="button" className="refresh" onClick={() => window.location.reload()}>
            Refresh
          </button>
        ) : null}

        <button type="button" className="alert__close-button" onClick={() => setMessage("")}>
          <i className="fas fa-close"></i>
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;
