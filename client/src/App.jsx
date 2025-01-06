import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isEmpty } from "./utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, setComponentToLoad, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "./app/applicationSlice";
import { jwtDecode } from "./utilities/jwtDecode";
import AuthForm from "./components/AuthForm";
import Messages from "./components/Messages";
import BillForm from "./components/BillForm";
import BillsList from "./components/BillsList";
import CalendarContainer from "./components/CalendarContainer";

const StyledMainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  width: 100%;
  padding: 1rem 2rem;
`;

const StyledNavBar = styled.nav`
  background-color: #fff;
  padding: .5rem 1rem;
  background-color: 0 2px 4px 0 rgba(0,0,0,.2);
`;

const App = () => {

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  const componentToLoad = useSelector(state => state.application.componentToLoad);

  const [formType, setFormType] = useState("");

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  useEffect(() => {

    getRefreshToken();

  }, []);


  const getRefreshToken = () => {

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
              userId: jwtDecoded.user_id,
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

          dispatch(setAccessToken(null));
          dispatch(setCurrentUser({}));

          dispatch(addSuccessMessage("Logged Out"));

        };
      });

  };


  return (
    <main>

      <Messages />

      {isEmpty(currentUser) === true ?

        <StyledNavBar className="flex-row justify-end mb-3">
          <button type="button" className="btn btn-transparent" onClick={() => { dispatch(setComponentToLoad("AuthForm")); setFormType("Login"); }}>Login</button>
          <button type="button" className="btn btn-transparent" onClick={() => { dispatch(setComponentToLoad("AuthForm")); setFormType("Sign Up"); }}>Sign Up</button>
        </StyledNavBar>

        : null}

      {componentToLoad === "AuthForm" ?

        <AuthForm formType={formType} setFormType={setFormType} />

        : null}

      {componentToLoad === "BillForm" && isEmpty(currentUser) === false ?

        <BillForm />

        : null}

      {isEmpty(currentUser) === false ?

        <StyledMainGrid>

          <CalendarContainer />

          <BillsList />

        </StyledMainGrid>

        : null}

      {isEmpty(currentUser) === false ?

        <footer>
          <button type="button" className="btn btn-transparent" onClick={(event) => { deleteRefreshToken(event); }}>Log Out</button>
        </footer>

        : null}

    </main>
  );
};

export default App;
