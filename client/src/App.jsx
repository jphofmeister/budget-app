import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isEmpty } from "./utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, setComponentToLoad, setBills, setAllIncome, addSuccessMessage } from "./app/applicationSlice";
import { jwtDecode } from "./utilities/jwtDecode";
import AuthForm from "./components/AuthForm";
import Messages from "./components/Messages";
import BillForm from "./components/BillForm";
import IncomeForm from "./components/IncomeForm";
import Dashboard from "./components/Dashboard";

const StyledNavBar = styled.nav`
  background-color: #fff;
  padding: .5rem 1rem;
  background-color: 0 2px 4px 0 rgba(0,0,0,.2);
`;

const App = () => {

  const dispatch = useDispatch();

  // const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  const componentToLoad = useSelector(state => state.application.componentToLoad);

  const [formType, setFormType] = useState("");

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  useEffect(() => {

    getRefreshToken();

  }, []);


  useEffect(() => {

    if (isEmpty(currentUser) === false) {

      getAllIncome(currentUser.userId);
      getBills(currentUser.userId);

    };

  }, [currentUser]);


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


  const getBills = (userId) => {

    let url = `${baseUrl}/bills/${userId}`;
    let operationValue = "Get Bills";

    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((results) => {

        if (results.ok !== true) {

          // throw Error(`${results.status} ${results.statusText} ${results.url}`)

        } else {

          if (results.status === 200) {

            return results.json();

          } else {

            return results.status;

          };

        };

      })
      .then((results) => {

        // console.log("results", results);

        if (isEmpty(results) === false) {

          if (results.transactionSuccess === true && isEmpty(results.records) === false) {

            dispatch(setBills(results.records));

          } else {

            console.log(`${operationValue} -- transactionSuccess: ${results.transactionSuccess}. ${results.message}`);
            // dispatch(addErrorMessage(`${operationValue}: ${results.message}`));

          };

        } else {

          dispatch(addErrorMessage(`${operationValue}: No results returned.`));

        };

      })
      .catch((error) => {

        console.error("error", error);

        dispatch(addErrorMessage(`${operationValue}: ${error.message}`));

      });

  };


  const getAllIncome = (userId) => {

    let url = `${baseUrl}/income/${userId}`;
    let operationValue = "Get All Income";

    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((results) => {

        if (results.ok !== true) {

          // throw Error(`${results.status} ${results.statusText} ${results.url}`)

        } else {

          if (results.status === 200) {

            return results.json();

          } else {

            return results.status;

          };

        };

      })
      .then((results) => {

        if (isEmpty(results) === false) {

          if (results.transactionSuccess === true && isEmpty(results.records) === false) {

            dispatch(setAllIncome(results.records));

          } else {

            console.log(`${operationValue} -- transactionSuccess: ${results.transactionSuccess}. ${results.message}`);
            // dispatch(addErrorMessage(`${operationValue}: ${results.message}`));

          };

        } else {

          // dispatch(addErrorMessage(`${operationValue}: No results returned.`));

        };

      })
      .catch((error) => {

        console.error("error", error);

        dispatch(addErrorMessage(`${operationValue}: ${error.message}`));

      });

  };


  return (
    <>
      <Messages />

      {isEmpty(currentUser) === true ?

        <StyledNavBar className="flex-row justify-end mb-3">
          <button type="button" className="btn btn-transparent" onClick={() => { dispatch(setComponentToLoad("AuthForm")); setFormType("Login"); }}>Login</button>
          <button type="button" className="btn btn-transparent" onClick={() => { dispatch(setComponentToLoad("AuthForm")); setFormType("Sign Up"); }}>Sign Up</button>
        </StyledNavBar>

        : null}

      {componentToLoad === "AuthForm" ? <AuthForm formType={formType} setFormType={setFormType} /> : null}

      {isEmpty(currentUser) === false ?

        <>
          <main>
            {componentToLoad === "BillForm" ? <BillForm /> : null}

            {componentToLoad === "IncomeForm" ? <IncomeForm /> : null}

            {componentToLoad === "" ? <Dashboard /> : null}
          </main>

          <footer>
            <button type="button" className="btn btn-transparent" onClick={(event) => { deleteRefreshToken(event); }}>Log Out</button>
          </footer>
        </>

        : null}
    </>
  );
};

export default App;
