import { useEffect, Dispatch, SetStateAction } from "react";
import { isEmpty, noFunctionAvailable } from "../../../utilities/sharedFunctions";
import AlertPopup from "./AlertPopup";

type MessagesProps = {
  informationMessage: string;
  successMessage: string;
  warningMessage: string;
  errorMessage: string;
  informationMessageVisible: boolean;
  successMessageVisible: boolean;
  warningMessageVisible: boolean;
  errorMessageVisible: boolean;
  addInformationMessage: Dispatch<SetStateAction<string>> | ((value: string) => void);
  addSuccessMessage: Dispatch<SetStateAction<string>> | ((value: string) => void);
  addWarningMessage: Dispatch<SetStateAction<string>> | ((value: string) => void);
  addErrorMessage: Dispatch<SetStateAction<string>> | ((value: string) => void);
};

const Messages = ({
  informationMessage = "",
  successMessage = "",
  warningMessage = "",
  errorMessage = "",
  informationMessageVisible = false,
  successMessageVisible = false,
  warningMessageVisible = false,
  errorMessageVisible = false,
  addInformationMessage = noFunctionAvailable,
  addSuccessMessage = noFunctionAvailable,
  addWarningMessage = noFunctionAvailable,
  addErrorMessage = noFunctionAvailable
}: MessagesProps) => {
  // * When the component is mounted, the alert is displayed for 5 seconds. -- 08/30/2021 MF
  // * https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js -- 08/30/2021 MF
  useEffect(() => {
    if (!isEmpty(successMessage) /*&& successMessageStatic !== true*/) {
      setTimeout(() => {
        addSuccessMessage("");
      }, 5000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage]);

  const updateInformationMessage = (alertItemContent: string) => {
    addInformationMessage(alertItemContent);
  };

  const updateSuccessMessage = (alertItemContent: string) => {
    addSuccessMessage(alertItemContent);
  };

  const updateWarningMessage = (alertItemContent: string) => {
    addWarningMessage(alertItemContent);
  };

  const updateErrorMessage = (alertItemContent: string) => {
    addErrorMessage(alertItemContent);
  };

  return (
    <div className="alert-messages-container">
      {informationMessageVisible ? (
        <AlertPopup
          message={informationMessage}
          setMessage={updateInformationMessage}
          alertType="info"
        />
      ) : null}

      {successMessageVisible ? (
        <AlertPopup
          message={successMessage}
          setMessage={updateSuccessMessage}
          alertType="success"
        />
      ) : null}

      {warningMessageVisible ? (
        <AlertPopup
          message={warningMessage}
          setMessage={updateWarningMessage}
          alertType="warning"
        />
      ) : null}

      {errorMessageVisible ? (
        <AlertPopup message={errorMessage} setMessage={updateErrorMessage} alertType="error" />
      ) : null}
    </div>
  );
};

export default Messages;
