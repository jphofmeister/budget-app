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
  const bills = useSelector(state => state.application.bills);
  const allIncome = useSelector(state => state.application.allIncome);

  const [currentRangeStart, setCurrentRangeStart] = useState(new Date().toLocaleDateString("en-US"));
  const [calendarEvents, setCalendarEvents] = useState([]);

  // let baseUrl = "http://localhost:3001/api";
  let baseUrl = "/api";


  useEffect(() => {

    let newCalendarEvents = [];

    if (isNonEmptyArray(bills) === true) {

      let billCalendarEvents = createCalendarEvents(bills, "bill");

      if (isNonEmptyArray(billCalendarEvents) === true) newCalendarEvents.push(...billCalendarEvents);

    };

    if (isNonEmptyArray(allIncome) === true) {

      let incomeCalendarEvents = createCalendarEvents(allIncome, "income");

      if (isNonEmptyArray(incomeCalendarEvents) === true) newCalendarEvents.push(...incomeCalendarEvents);

    };

    setCalendarEvents(newCalendarEvents);

  }, [bills, allIncome, currentRangeStart]);


  const createCalendarEvents = (items, eventType) => {

    let newCalendarEvents = items.map(item => {

      let calendarDate = "";

      let idName = "";
      let eventColor = "";

      if (eventType === "bill") {
        idName = "bill_id";
        eventColor = "red";
      };

      if (eventType === "income") {
        idName = "income_id";
        eventColor = "green";
      };

      if (item.frequency_type === "month" && parseInt(item.frequency_interval) === 1) {

        let calculateCalendarDate = new Date(currentRangeStart).setDate(item.frequency_day);

        // calculateCalendarDate = format(calculateCalendarDate, "MM/dd/yyyy");
        calculateCalendarDate = new Date(calculateCalendarDate).toLocaleDateString("en-US");

        calendarDate = calculateDate(calculateCalendarDate, "day");

      };

      if (item.frequency_type === "week") {

        // TODO do something!

      };

      return {
        calendarId: `${eventType}-${item[idName]}`,
        calendarStartDate: calendarDate,
        calendarEndDate: calendarDate,
        eventColor: eventColor,
        additionalProps: { ...item }
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
    <div className="calendar-container">

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