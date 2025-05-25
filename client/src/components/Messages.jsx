import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, getDateTime } from "../utilities/sharedFunctions";
import { parse } from "../utilities/applicationFunctions";
import { addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";
import AlertPopup from "./common/AlertPopup";

const Messages = () => {

  const componentName = "Messages";

  const dispatch = useDispatch();

  const informationMessage = useSelector(state => state.application.informationMessage);
  const informationMessageVisible = useSelector(state => state.application.informationMessageVisible);
  // const informationMessageStatic = useSelector(state => state.application.informationMessageStatic);
  const successMessage = useSelector(state => state.application.successMessage);
  const successMessageVisible = useSelector(state => state.application.successMessageVisible);
  // const successMessageStatic = useSelector(state => state.application.successMessageStatic);
  const warningMessage = useSelector(state => state.application.warningMessage);
  const warningMessageVisible = useSelector(state => state.application.warningMessageVisible);
  // const warningMessageStatic = useSelector(state => state.application.warningMessageStatic);
  const errorMessage = useSelector(state => state.application.errorMessage);
  const errorMessageVisible = useSelector(state => state.application.errorMessageVisible);
  // const errorMessageStatic = useSelector(state => state.application.errorMessageStatic);


  // useEffect(() => {
  //   // * Displays all the alerts.

  //   dispatch(addInformationMessage("Test Message"));
  //   dispatch(addSuccessMessage("Test Message"));
  //   dispatch(addWarningMessage("Test Message"));
  //   dispatch(addErrorMessage("Test Message"));

  // }, []);


  // // * https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js
  // useEffect(() => {
  //   // * When the component is mounted, the alert is displayed for 5 seconds.

  //   if (isEmpty(informationMessage) === false && informationMessageStatic !== true) {

  //     setTimeout(() => {

  //       dispatch(addInformationMessage(""));

  //     }, 5000);

  //   };

  // }, [informationMessage]);


  // * https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js
  useEffect(() => {
    // * When the component is mounted, the alert is displayed for 5 seconds.

    if (isEmpty(successMessage) === false /*&& successMessageStatic !== true*/) {

      setTimeout(() => {

        dispatch(addSuccessMessage(""));

      }, 5000);

    };

  }, [successMessage]);


  // // * https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js
  // useEffect(() => {
  //   // * When the component is mounted, the alert is displayed for 5 seconds.

  //   if (isEmpty(warningMessage) === false && warningMessageStatic !== true) {

  //     setTimeout(() => {

  //       dispatch(addWarningMessage(""));

  //     }, 5000);

  //   };

  // }, [warningMessage]);


  const updateInformationMessage = (alertItemContent) => {

    dispatch(addInformationMessage(alertItemContent));

  };

  const updateSuccessMessage = (alertItemContent) => {

    dispatch(addSuccessMessage(alertItemContent));

  };

  const updateWarningMessage = (alertItemContent) => {

    dispatch(addWarningMessage(alertItemContent));

  };

  const updateErrorMessage = (alertItemContent) => {

    dispatch(addErrorMessage(alertItemContent));

  };


  return (
    <div className="alert-container">

      {informationMessageVisible === true ?

        <AlertPopup message={informationMessage} setMessage={updateInformationMessage} alertType="info" />

        : null}

      {successMessageVisible === true ?

        <AlertPopup message={successMessage} setMessage={updateSuccessMessage} alertType="success" />

        : null}

      {warningMessageVisible === true ?

        <AlertPopup message={warningMessage} setMessage={updateWarningMessage} alertType="warning" />

        : null}

      {errorMessageVisible === true ?

        <AlertPopup message={errorMessage} setMessage={updateErrorMessage} alertType="error" />

        : null}

    </div>
  );
};

export default Messages;

