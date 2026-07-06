import { useState, useEffect } from "react";
import { isEmpty } from "../utilities/sharedFunctions";

type DialogBox = {
  dialogBoxSize?: string;
  dialogBoxTitle?: string;
  dialogBoxContent?: string;
  dialogBoxType?: string;
};

export const useDialogBoxConfirmation = () => {
  const [confirmationDialogBoxType, setConfirmationDialogBoxType] = useState<string>(""); // * dialogBoxTypes: confirmDelete, confirmDeleteCascade, deleteRemoteData, deleteLocalData, confirmRemove, confirmRemoveAll, changePagePrompt, resetCount, resetTable, logOut, closeProgram -- 10/23/2023 JH
  const [confirmationDialogBoxSize, setConfirmationDialogBoxSize] = useState<string>(""); // * sm, md, lg, xl -- 07/15/2021 MF
  const [confirmationDialogBoxTitle, setConfirmationDialogBoxTitle] = useState<string>("");
  const [confirmationDialogBoxContent, setConfirmationDialogBoxContent] = useState<string>("");

  const [confirmationDialogBoxOpen, setConfirmationDialogBoxOpen] = useState<boolean>(false);
  const [confirmationDialogBoxContinue, setConfirmationDialogBoxContinue] = useState<
    boolean | null
  >(null);
  const [deletingRecord, setDeletingRecord] = useState<boolean>(false);
  const [hardDeletingRecord, setHardDeletingRecord] = useState<boolean>(false);

  const [processTransactionValue, setProcessTransactionValue] = useState<string>("");

  const reset = () => {
    setConfirmationDialogBoxSize("");
    setConfirmationDialogBoxTitle("");
    setConfirmationDialogBoxContent("");
    setConfirmationDialogBoxType("");
    setConfirmationDialogBoxOpen(false);
    setConfirmationDialogBoxContinue(null);
    setDeletingRecord(false);
    setHardDeletingRecord(false);
  };

  useEffect(() => {
    if (confirmationDialogBoxContinue === null) return;

    if (deletingRecord) {
      if (confirmationDialogBoxContinue) {
        setProcessTransactionValue("D");
        reset();
      } else {
        reset();
        setProcessTransactionValue("");
      }
    } else if (hardDeletingRecord) {
      if (confirmationDialogBoxContinue) {
        setProcessTransactionValue("HD");
        reset();
      } else {
        reset();
        setProcessTransactionValue("");
      }
    } else {
      // * If the modal has nothing to do with deleting, then close the modal when confirmationDialogBoxContinue goes from null to true or false -- 02/05/2024 JH
      // ? I feel like something should be changed in DialogBoxConfirmation for modals that don't need to confirm -- 02/05/2024 JH

      reset();
    }
  }, [deletingRecord, hardDeletingRecord, confirmationDialogBoxContinue]);

  const confirmAction = (data: DialogBox) => {
    if (!isEmpty(data)) {
      openConfirmationDialogBox(data);
    }
  };

  const deleteRecord = (data?: DialogBox) => {
    const newDialogBoxType = !isEmpty(data?.dialogBoxType) ? data?.dialogBoxType : "confirmRemove";

    setDeletingRecord(true);

    openConfirmationDialogBox({ dialogBoxType: newDialogBoxType });
  };

  const hardDeleteRecord = (data: DialogBox) => {
    const newDialogBoxType = !isEmpty(data?.dialogBoxType) ? data.dialogBoxType : "confirmRemove";

    setHardDeletingRecord(true);

    openConfirmationDialogBox({ dialogBoxType: newDialogBoxType });
  };

  const openConfirmationDialogBox = (data: DialogBox) => {
    // * Not sure why, but openConfirmationDialogBox sometimes gets called again after closeDeleteDialogBox. However, the data is null so it shows an empty dialog box -- 10/18/2023 JH
    if (!isEmpty(data)) {
      setConfirmationDialogBoxOpen(true);

      setConfirmationDialogBoxSize(data.dialogBoxSize || "");
      setConfirmationDialogBoxTitle(data.dialogBoxTitle || "");
      setConfirmationDialogBoxContent(data.dialogBoxContent || "");
      setConfirmationDialogBoxType(data.dialogBoxType || "");

      setConfirmationDialogBoxContinue(null);
    }
  };

  const closeDeleteDialogBox = () => {
    setConfirmationDialogBoxOpen(false);

    setConfirmationDialogBoxType("");
  };

  return {
    processTransactionValue,
    confirmationDialogBoxOpen,
    confirmationDialogBoxSize,
    confirmationDialogBoxTitle,
    confirmationDialogBoxContent,
    confirmationDialogBoxType,
    confirmationDialogBoxContinue,
    confirmAction,
    deleteRecord,
    hardDeleteRecord,
    closeDeleteDialogBox,
    setConfirmationDialogBoxContinue,
    setProcessTransactionValue
  };
};

export default useDialogBoxConfirmation;
