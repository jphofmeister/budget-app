import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray, hasNonEmptyProperty, sortObjectArrayByProperty, sortObjectArrayByTwoProperties } from "../utilities/sharedFunctions";

const componentName = "applicationSlice";

const initialState = {
  accessToken: null,
  currentUser: {},
  informationMessage: "",
  successMessage: "",
  warningMessage: "",
  errorMessage: "",
  informationMessageVisible: false,
  successMessageVisible: false,
  warningMessageVisible: false,
  errorMessageVisible: false
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    addInformationMessage(state, action) {

      if (isEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing information message. 
        // if (state.informationMessage !== action.payload) {
        if (state.informationMessage.includes(action.payload) === false) {

          if (isEmpty(state.informationMessage) === false) {

            state.informationMessage = state.informationMessage + "<br />";
          };

          state.informationMessage = state.informationMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.informationMessageVisible = true;

          } else {

            state.informationMessageVisible = false;

          };

        };

      } else {

        state.informationMessage = action.payload;
        state.informationMessageVisible = false;

      };

    },
    addSuccessMessage(state, action) {

      if (isEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing success message. 
        // if (state.successMessage !== action.payload) {
        if (state.successMessage.includes(action.payload) === false) {

          if (isEmpty(state.successMessage) === false) {

            state.successMessage = state.successMessage + "<br />";

          };

          state.successMessage = state.successMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.successMessageVisible = true;

          } else {

            state.successMessageVisible = false;

          };

        };

      } else {

        state.successMessage = action.payload;
        state.successMessageVisible = false;

      };

    },
    addWarningMessage(state, action) {

      if (isEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing warning message. 
        // if (state.warningMessage !== action.payload) {
        if (state.warningMessage.includes(action.payload) === false) {

          if (isEmpty(state.warningMessage) === false) {

            state.warningMessage = state.warningMessage + "<br />";

          };

          state.warningMessage = state.warningMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.warningMessageVisible = true;

          } else {

            state.warningMessageVisible = false;

          };

        };

      } else {

        state.warningMessage = action.payload;
        state.warningMessageVisible = false;

      };

    },
    addErrorMessage(state, action) {

      if (isEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing error message. 
        // if (state.errorMessage !== action.payload) {
        if (state.errorMessage.includes(action.payload) === false) {

          if (isEmpty(state.errorMessage) === false) {

            state.errorMessage = state.errorMessage + "<br />";

          };

          state.errorMessage = state.errorMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.errorMessageVisible = true;

          } else {

            state.errorMessageVisible = false;

          };

        };

      } else {

        state.errorMessage = action.payload;
        state.errorMessageVisible = false;

      };

    },
    clearMessages(state, action) {

      state.informationMessage = "";
      state.successMessage = "";
      state.warningMessage = "";
      state.errorMessage = "";

      state.informationMessageVisible = false;
      state.successMessageVisible = false;
      state.warningMessageVisible = false;
      state.errorMessageVisible = false;

    }

  }
});

export const { setAccessToken, setCurrentUser, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } = applicationSlice.actions;

export default applicationSlice.reducer;