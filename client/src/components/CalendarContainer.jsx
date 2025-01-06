import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isEmpty } from "../utilities/sharedFunctions";
import { setAccessToken, setCurrentUser, setComponentToLoad, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages } from "../app/applicationSlice";
import { calculateDate, displayMonthName } from "./calendar/DateFunctions";
import Calendar from "./calendar/Calendar";

const CalendarContainer = () => {

  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.application.accessToken);
  const currentUser = useSelector(state => state.application.currentUser);

  const [currentRangeStart, setCurrentRangeStart] = useState(new Date().toLocaleDateString("en-US"));
  const [calendarEvents, setCalendarEvents] = useState([]);


  const createCalendarEvents = (requestsToMap, requestTypeName) => {

    let newCalendarEvents = requestsToMap.map(request => {

      let calendarID = "";
      let calendarStartDate = "";
      let calendarEndDate = "";
      let currentTravelTeam = [];
      let currentRequestEquipment = [];

      if (isEmpty(request.startDate) === false) {

        calendarStartDate = calculateDate(request.startDate, "day", -1);

      };

      if (isEmpty(request.endDate) === false) {

        calendarEndDate = calculateDate(request.endDate, "day", 1);

      };

      if (isEmpty(request.preferredDate) === false) {

        calendarStartDate = calculateDate(request.preferredDate, "day", -1);
        calendarEndDate = calculateDate(request.preferredDate, "day", 1);

      };

      if (isEmpty(request.requestID) === false) {

        calendarID = `${requestTypeName}-${request.requestID}`;

      };

      if (isEmpty(request.otherRequestID) === false) {

        calendarID = `${requestTypeName}-${request.otherRequestID}`;

      };

      if (isNonEmptyArray(travelTeams) === true) {

        currentTravelTeam = travelTeams.filter(travelTeam => travelTeam.requestID === request.requestID && travelTeam.requestTypeName === requestTypeName && (travelTeam.confirmed === true || travelTeam.confirmed === 1));

      };

      if (isNonEmptyArray(requestEquipment) === true) {

        currentRequestEquipment = requestEquipment.filter(requestEquipment => requestEquipment.requestID === request.requestID && requestEquipment.requestTypeName === requestTypeName);

      };

      return {
        calendarID: calendarID,
        calendarStartDate: calendarStartDate,
        calendarEndDate: calendarEndDate,
        request: {
          ...request,
          currentTravelTeam: currentTravelTeam,
          currentRequestEquipment: currentRequestEquipment
        }
      };

    });

    return newCalendarEvents;

  };


  return (
    <div>

      <h2>{displayMonthName(calculateDate(currentRangeStart))} {calculateDate(currentRangeStart).getFullYear()}</h2>

      {/* <button type="button" className="btn btn-primary" onClick={(event) => { setCurrentRangeStart(new Date().toLocaleDateString("en-US")); }}>This Month</button> */}

      <Calendar currentRangeStart={currentRangeStart} calendarEvents={calendarEvents} />

    </div>
  );
};

export default CalendarContainer;