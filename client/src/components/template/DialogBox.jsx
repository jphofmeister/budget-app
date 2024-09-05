import React, { useEffect } from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, getDateTime } from "../../utilities/sharedFunctions";

const DialogBox = (props) => {

  // * Available props: -- 11/17/2023
  // * Properties: dialogBoxOpen, dialogBoxType, dialogBoxSize, dialogBoxTitle, dialogBoxContent -- 11/17/2023
  // * Functions: setDialogBoxOpen -- 07/20/2023

  const componentName = "DialogBox";

  let dialogBoxOpen = isEmpty(props) === false && isEmpty(props.dialogBoxOpen) === false ? props.dialogBoxOpen : "";
  let dialogBoxSize = isEmpty(props) === false && isEmpty(props.dialogBoxSize) === false ? props.dialogBoxSize : ""; // * sm, md, lg, xl -- 07/15/2021
  let dialogBoxTitle = isEmpty(props) === false && isEmpty(props.dialogBoxTitle) === false ? props.dialogBoxTitle : "";
  let dialogBoxContent = isEmpty(props) === false && isEmpty(props.dialogBoxContent) === false ? props.dialogBoxContent : "";

  let setDialogBoxOpen = isEmpty(props) === false && isEmpty(props.setModalOpen) === false ? props.setModalOpen : noFunctionAvailable;

  let size = dialogBoxSize;
  let title = dialogBoxTitle;
  let content = dialogBoxContent;

  const modalStyles = classnames("modal-dialog", {
    "modal-sm": size === "sm",
    "modal-md": size === "md",
    "modal-lg": size === "lg",
    "modal-xl": size === "xl"
  });


  // * Close modal on ESC key. -- 02/13/2024 JH
  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key === "Escape") {

        setDialogBoxOpen(false);

      };

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, []);


  return (
    <React.Fragment>

      {dialogBoxOpen === true ?

        <div className="modal" tabIndex="-1" aria-hidden="true">
          <div className={modalStyles}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title}
                </h5>
                <button type="button" className="close" onClick={(event) => { setDialogBoxOpen(!dialogBoxOpen); }} title="Close">
                  <i className="fa fa-close"></i><span className="sr-only">Close</span>
                </button>
              </div>
              <div className="modal-body">
                {content}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={(event) => { setDialogBoxOpen(!dialogBoxOpen); }}>OK</button>
                {/* <button type="button" className="btn btn-cancel" onClick={(event) => { dispatch(clearMessages()); setDialogBoxOpen(!dialogBoxOpen); }}>Cancel</button> */}
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={(event) => { setDialogBoxOpen(!dialogBoxOpen); }}></div>
        </div>

        : null}

    </React.Fragment>
  );
};

export default DialogBox;
