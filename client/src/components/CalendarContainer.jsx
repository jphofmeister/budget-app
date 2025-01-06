import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { format, addMonths, subMonths } from "date-fns";
import { isEmpty, isNonEmptyArray } from "../utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, setComponentToLoad, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";
import { calculateDate, displayMonthName } from "./calendar/DateFunctions";
import Calendar from "./calendar/Calendar";

const CalendarContainer = () => {

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  const [currentRangeStart, setCurrentRangeStart] = useState(new Date().toLocaleDateString("en-US"));
  const [calendarEvents, setCalendarEvents] = useState([]);

  const [bills, setBills] = useState([]);

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  useEffect(() => {

    if (isEmpty(currentUser) === false) {

      getBills(currentUser.userId);

    };

  }, [currentUser]);


  useEffect(() => {

    if (isNonEmptyArray(bills) === true) {

      let newCalendarEvents = createCalendarEvents(bills);

      setCalendarEvents(newCalendarEvents);

    };

  }, [bills, currentRangeStart]);


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

            setBills(results.records);

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


  const createCalendarEvents = (billsToMap) => {

    let newCalendarEvents = billsToMap.map(bill => {

      console.log("bill", bill);

      let calendarDate = "";

      if (bill.frequency_type === "month" && parseInt(bill.frequency_interval) === 1) {

        let calculateCalendarDate = new Date(currentRangeStart).setDate(bill.frequency_day);

        // calculateCalendarDate = format(calculateCalendarDate, "MM/dd/yyyy");
        calculateCalendarDate = new Date(calculateCalendarDate).toLocaleDateString("en-US");

        calendarDate = calculateDate(calculateCalendarDate, "day");

      };

      return {
        calendarId: bill.bill_id,
        calendarStartDate: calendarDate,
        calendarEndDate: calendarDate,
        bill: { ...bill }
      };

    });

    return newCalendarEvents;

  };


  const changeMonth = (currentMonth, action) => {

    let newMonth = new Date(currentMonth);

    if (action === "sub") newMonth = subMonths(newMonth, 1);
    if (action === "add") newMonth = addMonths(newMonth, 1);

    newMonth = new Date(newMonth).toLocaleDateString("en-US");

    setCurrentRangeStart(newMonth);

  };


  return (
    <div>

      <div className="flex-row space-between">
        <div className="flex-row">
          <h2>{displayMonthName(calculateDate(currentRangeStart))} {calculateDate(currentRangeStart).getFullYear()}</h2>
        </div>

        <div className="flex-row justify-end">
          <button type="button" className="btn btn-primary" onClick={(event) => { changeMonth(currentRangeStart, "sub"); }}><i className="fa fa-chevron-left"></i><span className="sr-only">Previous Month</span></button>
          <button type="button" className="btn btn-primary" onClick={(event) => { setCurrentRangeStart(new Date().toLocaleDateString("en-US")); }}>This Month</button>
          <button type="button" className="btn btn-primary" onClick={(event) => { changeMonth(currentRangeStart, "add"); }}><i className="fa fa-chevron-right"></i><span className="sr-only">Next Month</span></button>
        </div>
      </div>

      <Calendar currentRangeStart={currentRangeStart} calendarEvents={calendarEvents} />

    </div>
  );
};

export default CalendarContainer;