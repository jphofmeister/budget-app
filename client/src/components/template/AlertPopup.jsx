import React, { useEffect } from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, isNonEmptyArray, getDateTime, addLog, addErrorLog, parse } from "../../utilities/sharedFunctions";

const AlertPopup = (props) => {

  // * Available props: -- 12/30/2022
  // * Properties: message, alertType, includeResetButton -- 12/30/2022
  // * Functions: setMessage -- 12/30/2022

  const componentName = "AlertPopup";

  // let operationValue = isEmpty(props) === false && isEmpty(props.operationValue) === false ? props.operationValue : "";
  let alertType = isEmpty(props) === false && isEmpty(props.alertType) === false ? props.alertType : "";
  let message = isEmpty(props) === false && isEmpty(props.message) === false ? props.message : "";
  let includeResetButton = isEmpty(props) === false && isEmpty(props.includeResetButton) === false ? props.includeResetButton : false;

  let setMessage = isEmpty(props) === false && isEmpty(props.setMessage) === false ? props.setMessage : noFunctionAvailable;

  let alertClasses = classnames("alert", {
    "alert-success": alertType === "success",
    "alert-warning": alertType === "warning",
    "alert-info": alertType === "info",
    "alert-danger": alertType === "error"
  });


  return (
    <div className="alert-container">

      <div className={alertClasses}>

        <div className="alert__message-text">
          {parse(message)}
        </div>

        {includeResetButton === true ?

          <button type="button" className="refresh" onClick={() => window.location.reload()}>
            Refresh
          </button>

          : null}

        <button type="button" className="alert__close-button" onClick={() => { setMessage(""); }}>
          <i className="fas fa-close"></i>
        </button>

      </div>

    </div>
  );
};

export default AlertPopup;