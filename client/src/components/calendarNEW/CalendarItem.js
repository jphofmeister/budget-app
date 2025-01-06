import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, getDateTime, isNonEmptyArray, displayDate } from "shared-functions";
import { setCurrentOtherRequest, setCurrentRequest, setComponentToLoad } from "../../app/activitySlice";
import { calculateDate } from "./DateFunctions";
import CalendarItemPopover from "./CalendarItemPopover";

const CalendarItem = (props) => {

  // * Available props: -- 06/23/2023 MF
  // * Properties: eventItem, eventClasses, eventItemStyles, eventItemContainerStyles -- 06/23/2023 MF

  let componentName = "CalendarItem";

  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.activity.loggedInUser);
  // const sessionToken = useSelector(state => state.activity.sessionToken);

  let eventItem = isEmpty(props.eventItem) === false ? props.eventItem : {};
  let eventClasses = isEmpty(props.eventClasses) === false ? props.eventClasses : "";
  let eventItemStyles = isEmpty(props.eventItemStyles) === false ? props.eventItemStyles : {};
  let eventItemContainerStyles = isEmpty(props.eventItemContainerStyles) === false ? props.eventItemContainerStyles : {};

  let request = isEmpty(eventItem) === false && isEmpty(eventItem.request) === false ? eventItem.request : null;

  // let requestID = isEmpty(request) === false && isEmpty(request.requestID) === false ? request.requestID : null;
  // let otherRequestID = isEmpty(request) === false && isEmpty(request.otherRequestID) === false ? request.otherRequestID : null;
  let requestTypeName = isEmpty(request) === false && isEmpty(request.requestTypeName) === false ? request.requestTypeName : null;
  let partnerName = isEmpty(request) === false && isEmpty(request.partnerName) === false ? request.partnerName : null;
  let partnerSiteName = isEmpty(request) === false && isEmpty(request.partnerSiteName) === false ? request.partnerSiteName : null;
  let programNameAbbreviation = isEmpty(request) === false && isEmpty(request.programNameAbbreviation) === false ? request.programNameAbbreviation : null;
  let simulationName = isEmpty(request) === false && isEmpty(request.simulationName) === false ? request.simulationName : null;
  let simulations = isEmpty(request) === false && isEmpty(request.simulations) === false ? request.simulations : null;
  let startDate = isEmpty(request) === false && isEmpty(request.startDate) === false ? request.startDate : null;
  let endDate = isEmpty(request) === false && isEmpty(request.endDate) === false ? request.endDate : null;
  let preferredDate = isEmpty(request) === false && isEmpty(request.preferredDate) === false ? request.preferredDate : null;
  let requestStatus = isEmpty(request) === false && isEmpty(request.requestStatus) === false ? request.requestStatus : null;
  let currentRequestEquipment = isEmpty(request) === false && isNonEmptyArray(request.currentRequestEquipment) === true ? request.currentRequestEquipment : null;

  const [isEventPanelOpen, setIsEventPanelOpen] = useState(false);

  let travelStartDate = "";
  let travelEndDate = "";

  if (isEmpty(startDate) === false) {

    travelStartDate = calculateDate(startDate, "day", -1).toLocaleDateString("en-CA");

  };

  if (isEmpty(endDate) === false) {

    travelEndDate = calculateDate(endDate, "day", 1).toLocaleDateString("en-CA");

  };

  if (isEmpty(preferredDate) === false) {

    travelStartDate = calculateDate(preferredDate, "day", -1).toLocaleDateString("en-CA");
    travelEndDate = calculateDate(preferredDate, "day", 1).toLocaleDateString("en-CA");

  };

  let simulationUI = "";
  let requestLinkUI = "";

  if (requestTypeName === "Implementation") {

    simulationUI = <React.Fragment><strong>{requestTypeName}</strong>: {simulationName}</React.Fragment>;

    requestLinkUI = <span>, <strong><a href="#" onClick={(event) => { event.preventDefault(); window.scrollTo(0, 0); dispatch(setCurrentRequest(request)); dispatch(setCurrentOtherRequest({})); dispatch(setComponentToLoad("Requests")); }}>View Request</a></strong></span>;

  };

  if (requestTypeName === "Demonstration" || requestTypeName === "Conference" || requestTypeName === "Marketing") {

    simulationUI = <React.Fragment><strong>{requestTypeName}</strong>: {simulations}</React.Fragment>;
    // simulationUI = <React.Fragment><strong>{requestTypeName}</strong></React.Fragment>;

    requestLinkUI = <span>, <strong><a href="#" onClick={(event) => { event.preventDefault(); window.scrollTo(0, 0); dispatch(setCurrentRequest({})); dispatch(setCurrentOtherRequest(request)); dispatch(setComponentToLoad(`${requestTypeName}Requests`)); }}>View Request</a></strong></span>;

  };


  // * Open side panel when clicking on an event. -- 06/13/2024 JH
  const handleMouseEvent = (event) => {

    if (event.type === "mouseenter" && isEventPanelOpen !== true) {

      setIsEventPanelOpen(true);

    } else if (event.type !== "mouseenter") {

      setIsEventPanelOpen(false);

    };

  };


  return (
    <div className="event-item-container" style={eventItemContainerStyles} onMouseEnter={(event) => { handleMouseEvent(event); }} onMouseLeave={(event) => { handleMouseEvent(event); }}>

      <div className={eventClasses} style={eventItemStyles}>

        <div className="event-item__title">

          {isEmpty(loggedInUser) === false && isEmpty(partnerName) === false ? <React.Fragment><strong>{partnerName}</strong> <em>({partnerSiteName})</em> - </React.Fragment> : null}

          {isEmpty(loggedInUser) === false && isEmpty(request.conferenceName) === false ? <React.Fragment><strong>{request.conferenceName}</strong> <em>({request.conferenceCity}, {request.conferenceState})</em> - </React.Fragment> : null}

          {simulationUI},

          {isEmpty(loggedInUser) === false && isEmpty(programNameAbbreviation) === false ? <React.Fragment> <strong>Program:</strong> {programNameAbbreviation}, </React.Fragment> : null}

          {isEmpty(loggedInUser) === false ? <React.Fragment> <strong>Request Status:</strong> {requestStatus}</React.Fragment> : null}

          <span>, <strong>Travel Dates:</strong> {displayDate(travelStartDate)} to {displayDate(travelEndDate)}</span>

          {isEmpty(loggedInUser) === false ?

            <React.Fragment>

              {isNonEmptyArray(currentRequestEquipment) === true ?

                <span>, <strong>Kit #</strong> {currentRequestEquipment.map((equipment, index) => {

                  let comma = (currentRequestEquipment.length > 1) && ((index + 1) < currentRequestEquipment.length) ? ", " : "";

                  return `${equipment.kitNumber}${comma}`;

                })}

                </span>

                : null}

              {requestLinkUI}

            </React.Fragment>

            : null}

        </div>

        {/* <div className="event-item__info">
          <strong>Request Status:</strong> {requestStatus}, <strong>Travel Dates:</strong> {displayDate(travelStartDate)} to {displayDate(travelEndDate)}
        </div> */}

      </div>

      {isEventPanelOpen === true ?

        <CalendarItemPopover currentEvent={eventItem} />

        : null}

    </div>
  );
};

export default CalendarItem;