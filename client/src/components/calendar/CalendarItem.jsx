import React, { useState } from "react";
import { noFunctionAvailable, isEmpty, displayDate } from "../../utilities/sharedFunctions";
import { calculateDate } from "./DateFunctions";
import CalendarItemPopover from "./CalendarItemPopover";

const CalendarItem = (props) => {

  // * Available props: -- 06/23/2023
  // * Properties: eventItem, eventClasses, eventItemStyles, eventItemContainerStyles -- 06/23/2023
  // * Functions: getStatus -- 06/23/2023

  let componentName = "CalendarItem";

  let eventItem = isEmpty(props.eventItem) === false ? props.eventItem : {};
  let eventClasses = isEmpty(props.eventClasses) === false ? props.eventClasses : "";
  let eventItemStyles = isEmpty(props.eventItemStyles) === false ? props.eventItemStyles : {};
  let eventItemContainerStyles = isEmpty(props.eventItemContainerStyles) === false ? props.eventItemContainerStyles : {};

  let request = isEmpty(eventItem) === false && isEmpty(eventItem.extendedProps) === false ? eventItem.extendedProps : null;

  // let requestID = isEmpty(request) === false && isEmpty(request.requestID) === false ? request.requestID : null;
  // let demonstrationRequestID = isEmpty(request) === false && isEmpty(request.demonstrationRequestID) === false ? request.demonstrationRequestID : null;
  let partnerName = isEmpty(request) === false && isEmpty(request.partnerName) === false ? request.partnerName : null;
  let partnerSiteName = isEmpty(request) === false && isEmpty(request.partnerSiteName) === false ? request.partnerSiteName : null;
  let simulationName = isEmpty(request) === false && isEmpty(request.simulationName) === false ? request.simulationName : null;
  let simulations = isEmpty(request) === false && isEmpty(request.simulations) === false ? request.simulations : null;
  let submissionApproved = isEmpty(request) === false && isEmpty(request.submissionApproved) === false ? request.submissionApproved : null;
  let startDate = isEmpty(request) === false && isEmpty(request.startDate) === false ? request.startDate : null;
  let endDate = isEmpty(request) === false && isEmpty(request.endDate) === false ? request.endDate : null;
  let preferredDate = isEmpty(request) === false && isEmpty(request.preferredDate) === false ? request.preferredDate : null;

  let getStatus = isEmpty(props) === false && isEmpty(props.getStatus) === false ? props.getStatus : noFunctionAvailable;

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

  if (isEmpty(simulationName) === false) {

    simulationUI = <React.Fragment><strong>Simulation</strong>: {simulationName}</React.Fragment>;

  };

  if (isEmpty(simulations) === false) {

    // simulationUI = <React.Fragment><strong>Demonstration</strong>: {simulations}</React.Fragment>;
    simulationUI = <React.Fragment><strong>Demonstration</strong></React.Fragment>;

  };


  // * Open side panel when clicking on an event -- 06/13/2024 JH
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
          <strong>{partnerName}</strong> <em>({partnerSiteName})</em> - {simulationUI}, <strong>Status:</strong> {getStatus(submissionApproved, endDate)}, <strong>Travel Dates:</strong> {displayDate(travelStartDate)} to {displayDate(travelEndDate)}
        </div>

        {/* <div className="event-item__info">
          <strong>Status:</strong> {getStatus(submissionApproved, endDate)}, <strong>Travel Dates:</strong> {displayDate(travelStartDate)} to {displayDate(travelEndDate)}
        </div> */}

      </div>

      {isEventPanelOpen === true ?

        <CalendarItemPopover currentEvent={eventItem} getStatus={getStatus} />

        : null}

    </div>
  );
};

export default CalendarItem;