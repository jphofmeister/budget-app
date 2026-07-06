import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import classnames from "classnames";

type DialogBoxProps = {
  dialogBoxContent: string;
  dialogBoxOpen: boolean;
  dialogBoxSize: string;
  dialogBoxTitle: string;
  setDialogBoxOpen: Dispatch<SetStateAction<boolean>>;
};

const DialogBox = ({
  dialogBoxContent = "",
  dialogBoxOpen = false,
  dialogBoxSize = "",
  dialogBoxTitle = "",
  setDialogBoxOpen
}: DialogBoxProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const size: string = dialogBoxSize;
  const title: string = dialogBoxTitle;
  const content: string = dialogBoxContent;

  const modalStyles = classnames("modal-dialog", {
    "modal-sm": size === "sm",
    "modal-md": size === "md",
    "modal-lg": size === "lg",
    "modal-xl": size === "xl"
  });

  // * keep dialogRef.current.open and dialogBoxOpen/dialogBoxContinue in sync -- 03/04/2026 JH
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogBoxOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleCloseDialog = (event: Event) => {
      event.preventDefault();
      if (dialogBoxOpen) setDialogBoxOpen(false);
    };

    dialog.addEventListener("close", handleCloseDialog);
    dialog.addEventListener("cancel", handleCloseDialog);

    return () => {
      dialog.removeEventListener("close", handleCloseDialog);
      dialog.removeEventListener("cancel", handleCloseDialog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogBoxOpen]);

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <dialog className={modalStyles} ref={dialogRef} closedby="any">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {title}
          </h5>
          <button
            type="button"
            className="close"
            onClick={() => setDialogBoxOpen(!dialogBoxOpen)}
            title="Close"
          >
            <i className="fa fa-close"></i>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="modal-body">{content}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setDialogBoxOpen(!dialogBoxOpen)}
          >
            OK
          </button>
        </div>
      </dialog>
    </>
  );
};

export default DialogBox;
