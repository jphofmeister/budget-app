import React from "react";
import classnames from "classnames";
import { isEmpty, getDateTime, displayDate, isNonEmptyArray, convertYesNoTrueFalse } from "../../utilities/sharedFunctions";

const CalendarItemPopover = (props) => {

  // * Available props: -- 07/11/2024 JH
  // * Properties: currentEvent -- 07/11/2024 JH

  let componentName = "CalendarItemPopover";

  let currentEvent = isEmpty(props.currentEvent) === false ? props.currentEvent : null;
  let infoEventIdSplit = isEmpty(currentEvent) === false && isEmpty(currentEvent.calendarId) === false ? currentEvent.calendarId.split('-') : [];

  let eventRequestType = isNonEmptyArray(infoEventIdSplit) === true ? infoEventIdSplit[0] : "";
  // let eventRequestId = isNonEmptyArray(infoEventIdSplit) === true ? infoEventIdSplit[1] : "";

  // * The Date type returns true in the isEmpty check. -- 08/05/2024 JH
  let travelStartDateString = isEmpty(currentEvent) === false /*&& isEmpty(currentEvent.calendarStartDate) === false*/ ? new Date(currentEvent.calendarStartDate).toLocaleDateString("en-US") : "";
  let travelEndDateString = isEmpty(currentEvent) === false /*&& isEmpty(currentEvent.calendarEndDate) === false*/ ? new Date(currentEvent.calendarEndDate).toLocaleDateString("en-US") : "";

  let request = isEmpty(currentEvent) === false && isEmpty(currentEvent.request) === false ? currentEvent.request : null;

  let startDate = isEmpty(request) === false && isEmpty(request.startDate) === false ? request.startDate : "";
  let endDate = isEmpty(request) === false && isEmpty(request.endDate) === false ? request.endDate : "";
  let preferredDate = isEmpty(request) === false && isEmpty(request.preferredDate) === false ? request.preferredDate : "";
  let programNameAbbreviation = isEmpty(request) === false && isEmpty(request.programNameAbbreviation) === false ? request.programNameAbbreviation : "";
  let simulationName = isEmpty(request) === false && isEmpty(request.simulationName) === false ? request.simulationName : "";
  let simulations = isEmpty(request) === false && isEmpty(request.simulations) === false ? request.simulations : "";
  let finalStudentCount = isEmpty(request) === false && isEmpty(request.finalStudentCount) === false ? request.finalStudentCount : "";
  let totalStudentCount = isEmpty(request) === false && isEmpty(request.totalStudentCount) === false ? request.totalStudentCount : "";
  let partnerName = isEmpty(request) === false && isEmpty(request.partnerName) === false ? request.partnerName : "";
  let partnerSiteName = isEmpty(request) === false && isEmpty(request.partnerSiteName) === false ? request.partnerSiteName : "";
  let clinicalReplacement = isEmpty(request) === false && isEmpty(request.clinicalReplacement) === false ? request.clinicalReplacement : null;
  let eventColor = isEmpty(request) === false && isEmpty(request.eventColor) === false ? request.eventColor : "#1c1b1e";
  let requestStatus = isEmpty(request) === false && isEmpty(request.requestStatus) === false ? request.requestStatus : "";
  let currentTravelTeam = isEmpty(request) === false && isNonEmptyArray(request.currentTravelTeam) === true ? request.currentTravelTeam : null;
  let currentRequestEquipment = isEmpty(request) === false && isNonEmptyArray(request.currentRequestEquipment) === true ? request.currentRequestEquipment : null;

  // let simulationDatesUI = "";
  let simulationSubheadingUI = "";

  if (eventRequestType === "Implementation") {

    // simulationDatesUI = <React.Fragment><strong>Implementation Dates:</strong> {displayDate(startDate)} to {displayDate(endDate)}</React.Fragment>;

    simulationSubheadingUI = <React.Fragment><strong>{eventRequestType}:</strong> {simulationName}</React.Fragment>;

  };

  if (eventRequestType === "Demonstration" || eventRequestType === "Conference" || eventRequestType === "Marketing") {

    // simulationDatesUI = <React.Fragment><strong>{eventRequestType} Date:</strong> {displayDate(preferredDate)}</React.Fragment>;

    // simulationDatesUI = <React.Fragment><strong>{eventRequestType} Dates:</strong> {displayDate(startDate)} to {displayDate(endDate)}</React.Fragment>;

    simulationSubheadingUI = <React.Fragment><strong>{eventRequestType}:</strong> {simulations}</React.Fragment>;

  };

  let studentCountText = "";

  if (requestStatus === "Completed" && isEmpty(finalStudentCount) === false) {

    studentCountText = <span><strong>Final Student Count:</strong> {finalStudentCount}</span>;

  } else if (isEmpty(totalStudentCount) === false) {

    studentCountText = <span><strong>Total Student Count:</strong> {totalStudentCount}</span>;

  };

  // TODO: Add CSS for Conference and Marketing Requests. -- 12/23/2024 MF
  let popoverContainerClasses = classnames("event-popover-container", {
    "demonstration": eventRequestType === "Demonstration",
    "demonstration": eventRequestType === "Conference",
    "demonstration": eventRequestType === "Marketing"
  });


  return (
    <div className={popoverContainerClasses}>

      <div className="event-popover" style={{ borderTopColor: `${eventColor}` }}>

        {isEmpty(partnerName) === false ?

          <React.Fragment>

            <div className="event-popover__heading">
              <strong>{partnerName}</strong> <em>({partnerSiteName})</em>
            </div>

          </React.Fragment>

          : null}

        {isEmpty(request.conferenceName) === false ?

          <React.Fragment>

            <div className="event-popover__heading">
              <strong>{request.conferenceName}</strong> <em>({request.conferenceCity}, {request.conferenceState})</em>
            </div>

          </React.Fragment>

          : null}

        <div className="event-popover__subheading">{simulationSubheadingUI}</div>

        <div className="event-popover__info">

          {isEmpty(programNameAbbreviation) === false ?

            <span><strong>Program:</strong> {programNameAbbreviation}</span>

            : null}

          <span><strong>Request Status:</strong> {requestStatus}</span>

          {studentCountText}

          {clinicalReplacement === true || clinicalReplacement === 1 ? <span><strong>Clinical Replacement:</strong> {convertYesNoTrueFalse(clinicalReplacement)}</span> : null}

          {isNonEmptyArray(currentTravelTeam) === true ?

            <span><strong>Confirmed Travel Team:</strong> {currentTravelTeam.map((teamMember, index) => {

              let comma = (currentTravelTeam.length > 1) && ((index + 1) < currentTravelTeam.length) ? ", " : "";

              return `${teamMember.firstName} ${teamMember.lastName}${comma}`;

            })}

            </span>

            : null}

          {isNonEmptyArray(currentRequestEquipment) === true ?

            <span><strong>Kit #</strong> {currentRequestEquipment.map((equipment, index) => {

              let comma = (currentRequestEquipment.length > 1) && ((index + 1) < currentRequestEquipment.length) ? ", " : "";

              return `${equipment.kitNumber}${comma}`;

            })}

            </span>

            : null}

          <table className="travel-dates-table">
            <thead>
              <tr>
                <th>Travel Start</th>
                <th>{eventRequestType}</th>
                <th>Travel End</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{displayDate(travelStartDateString)}</td>

                {(eventRequestType === "Implementation" || eventRequestType === "Conference" || eventRequestType === "Marketing") && displayDate(startDate) === displayDate(endDate) ?

                  <td>{displayDate(startDate)}</td>

                  : null}

                {(eventRequestType === "Implementation" || eventRequestType === "Conference" || eventRequestType === "Marketing") && displayDate(startDate) !== displayDate(endDate) ?

                  <td className="text-center">{displayDate(startDate)} to {displayDate(endDate)}</td>

                  : null}

                {eventRequestType === "Demonstration" ?

                  <td>{displayDate(preferredDate)}</td>

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