import React from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, displayDate, isNonEmptyArray, convertYesNoTrueFalse } from "shared-functions";

const CalendarItemPopover = (props) => {

  // * Available props: -- 07/11/2024 JH
  // * Properties: currentEvent -- 07/11/2024 JH
  // * Functions: getStatus -- 07/11/2024 JH

  let componentName = "CalendarItemPopover";

  let currentEvent = isEmpty(props.currentEvent) === false ? props.currentEvent : null;

  let getStatus = isEmpty(props) === false && isEmpty(props.getStatus) === false ? props.getStatus : noFunctionAvailable;

  let travelStartDateString = new Date(currentEvent.calendarStartDate).toLocaleDateString("en-CA");
  let travelEndDateString = new Date(currentEvent.calendarEndDate).toLocaleDateString("en-CA");

  let currentTravelTeam = isEmpty(currentEvent) === false && isEmpty(currentEvent.extendedProps) === false && isNonEmptyArray(currentEvent.extendedProps.currentTravelTeam) === true ? currentEvent.extendedProps.currentTravelTeam : null;
  let currentRequestEquipment = isEmpty(currentEvent) === false && isEmpty(currentEvent.extendedProps) === false && isNonEmptyArray(currentEvent.extendedProps.currentRequestEquipment) === true ? currentEvent.extendedProps.currentRequestEquipment : null;
  let eventColor = isEmpty(currentEvent.extendedProps) === false && isEmpty(currentEvent.extendedProps.eventColor) === false ? currentEvent.extendedProps.eventColor : "#1c1b1e";

  let infoEventIDSplit = isEmpty(currentEvent) === false && isEmpty(currentEvent.calendarID) === false ? currentEvent.calendarID.split('-') : [];

  let eventRequestType = isNonEmptyArray(infoEventIDSplit) === true ? infoEventIDSplit[0] : "";
  // let eventRequestID = isNonEmptyArray(infoEventIDSplit) === true ? infoEventIDSplit[1] : "";

  let simulationDatesUI = "";
  let simulationSubheadingUI = "";

  if (eventRequestType === "simulation") {

    simulationDatesUI = <React.Fragment><strong>Simulation Dates:</strong> {displayDate(currentEvent.extendedProps.startDate)} to {displayDate(currentEvent.extendedProps.endDate)}</React.Fragment>;

    simulationSubheadingUI = <React.Fragment><strong>Simulation:</strong> {currentEvent.extendedProps.simulationName}</React.Fragment>;

  };

  if (eventRequestType === "demonstration") {

    simulationDatesUI = <React.Fragment><strong>Demonstration Date:</strong> {displayDate(currentEvent.extendedProps.preferredDate)}</React.Fragment>;

    simulationSubheadingUI = <React.Fragment><strong>Demonstration:</strong> {currentEvent.extendedProps.simulations}</React.Fragment>;

  };

  let studentCountText = "";

  if (getStatus(currentEvent.extendedProps.submissionApproved, currentEvent.extendedProps.endDate) === "Completed" && isEmpty(currentEvent.extendedProps.finalStudentCount) === false) {

    studentCountText = <span><strong>Final Student Count:</strong> {currentEvent.extendedProps.finalStudentCount}</span>;

  } else if (isEmpty(currentEvent.extendedProps.totalStudentCount) === false) {

    studentCountText = <span><strong>Total Student Count:</strong> {currentEvent.extendedProps.totalStudentCount}</span>;

  };

  let popoverContainerClasses = classnames("event-popover-container", {
    "demonstration": eventRequestType === "demonstration"
  });


  return (
    <div className={popoverContainerClasses}>

      <div className="event-popover" style={{ borderTopColor: `${eventColor}` }}>

        <div className="event-popover__heading">
          <strong>{currentEvent.extendedProps.partnerName}</strong> <em>({currentEvent.extendedProps.partnerSiteName})</em>
        </div>

        <div className="event-popover__subheading">{simulationSubheadingUI}</div>

        <div className="event-popover__info">

          <span><strong>Status:</strong> {getStatus(currentEvent.extendedProps.submissionApproved, currentEvent.extendedProps.endDate)}</span>

          {studentCountText}

          {isEmpty(currentEvent.extendedProps.clinicalReplacement) === false ? <span><strong>Clinical Replacement:</strong> {convertYesNoTrueFalse(currentEvent.extendedProps.clinicalReplacement)}</span> : null}

          {isNonEmptyArray(currentTravelTeam) === true ?

            <span><strong>Confirmed Travel Team:</strong> {currentTravelTeam.map((teamMember, index) => {

              let comma = (currentTravelTeam.length > 1) && ((index + 1) < currentTravelTeam.length) ? ", " : "";

              return `${teamMember.firstName} ${teamMember.lastName}${comma}`;

            })}</span>

            : null}

          {isNonEmptyArray(currentRequestEquipment) === true ?

            <span><strong>Kit #</strong> {currentRequestEquipment.map((equipment, index) => {

              let comma = (currentRequestEquipment.length > 1) && ((index + 1) < currentRequestEquipment.length) ? ", " : "";

              return `${equipment.kitNumber}${comma}`;

            })}</span>

            : null}

          <table className="travel-dates-table">
            <thead>
              <tr>
                <th>Travel Start</th>

                {eventRequestType === "simulation" ? <th>Simulation</th> : null}

                {eventRequestType === "demonstration" ? <th>Demonstration</th> : null}

                <th>Travel End</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {displayDate(travelStartDateString)}
                </td>

                {eventRequestType === "simulation" && displayDate(currentEvent.extendedProps.startDate) === displayDate(currentEvent.extendedProps.endDate) ?

                  <td>{displayDate(currentEvent.extendedProps.startDate)}</td>

                  : null}

                {eventRequestType === "simulation" && displayDate(currentEvent.extendedProps.startDate) !== displayDate(currentEvent.extendedProps.endDate) ?

                  <td className="text-center">{displayDate(currentEvent.extendedProps.startDate)} to {displayDate(currentEvent.extendedProps.endDate)}</td>

                  : null}

                {eventRequestType === "demonstration" ?

                  <td>{displayDate(currentEvent.extendedProps.preferredDate)}</td>

                  : null}

                <td>{displayDate(travelEndDateString)}</td>

              </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
};

export default CalendarItemPopover;