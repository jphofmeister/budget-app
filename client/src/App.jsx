import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isEmpty } from "./utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "./app/applicationSlice";
import { useNativeClickListener } from "./hooks/useNativeClickListener";
import Login from "./components/Login";
import Messages from "./components/Messages";
import FormInput from "./components/common/FormInput";

const App = () => {

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  const [formType, setFormType] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  const getRefreshToken = (event) => {

    event.preventDefault();

    let url = `${baseUrl}/auth/refresh_token`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      credentials: "include"
    })
      .then(results => {
        if (typeof results === "object") {
          return results.json();
        } else {

        };
      })
      .then(results => {
        if (isEmpty(results) === false && isEmpty(results.accessToken) === false) {

          let newAccessToken = results.accessToken;
          dispatch(setAccessToken(newAccessToken));

          let jwtDecoded = jwtDecode(newAccessToken);

          if (isEmpty(jwtDecoded.user_id) === false && isEmpty(jwtDecoded.user_name) === false) {

            let newCurrentUser = {
              userID: jwtDecoded.user_id,
              userName: jwtDecoded.user_name
            };

            dispatch(setCurrentUser(newCurrentUser));

          };

        };
      });

  };


  const deleteRefreshToken = (event) => {

    event.preventDefault();

    let url = `${baseUrl}/auth/refresh_token`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      credentials: "include"
    })
      .then(results => {
        if (typeof results === "object") {
          return results.json();
        } else {

        };
      })
      .then(results => {
        if (isEmpty(results) === false) {

          console.log("results", results);

          dispatch(setAccessToken(null));
          dispatch(setCurrentUser({}));

          dispatch(addSuccessMessage("Logged Out"));

        };
      });

  };


  return (
    <main>

      <Messages />

      {isFormOpen !== true && isEmpty(currentUser) === true ?

        <div className="flex-row justify-end mb-3">
          <button type="button" className="btn btn-transparent" onClick={() => { setIsFormOpen(true); setFormType("Login"); }}>Login</button>
          <button type="button" className="btn btn-transparent" onClick={() => { setIsFormOpen(true); setFormType("Sign Up"); }}>Sign Up</button>
        </div>

        : null}

      {isEmpty(accessToken) === false && isEmpty(currentUser) === false ?

        <div className="flex-row justify-end mb-3">
          <button type="button" className="btn btn-transparent" onClick={(event) => { deleteRefreshToken(event); }}>Log Out</button>
        </div>

        : null}

      {isFormOpen === true ?

        <Login formType={formType} setFormType={setFormType} setIsFormOpen={setIsFormOpen} />

        : null}

    </main>
  );
};

export default App;
