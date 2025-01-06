import React, { useEffect } from "react";
import classnames from "classnames";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";
import { calculateDate, getEachDayOfInterval, displayDay, checkIsSameDay } from "./DateFunctions";
import CalendarItem from "./CalendarItem";

const CalendarWeekEvents = (props) => {

  // * Available props: -- 07/11/2024 JH
  // * Properties: week, thisWeeksEvents -- 07/11/2024 JH

  let componentName = "CalendarWeekEvents";

  let week = isEmpty(props.week) === false ? props.week : [];
  let thisWeeksEvents = isEmpty(props.thisWeeksEvents) === false ? props.thisWeeksEvents : [];


  return (
    <React.Fragment>

      {isNonEmptyArray(thisWeeksEvents) === true ?

        <div className="calendar__week-events">

          {thisWeeksEvents.map((eventItem) => {

            // * The code below is all used for calculating the styles of the eventItem. -- 07/25/2024 JH
            let eventDisplayType = "";

            let gridColumnStart = 0;
            let gridColumnEnd = 0;

            let startIndex = new Date(eventItem.calendarStartDate).getDay();
            let endIndex = new Date(eventItem.calendarEndDate).getDay();

            let startDayIsInThisWeek = false;
            let endDayIsInThisWeek = false;

            week.forEach(day => {

              if (checkIsSameDay(day, eventItem.calendarStartDate) === true) {

                startDayIsInThisWeek = true;

              };

              if (checkIsSameDay(day, eventItem.calendarEndDate) === true) {

                endDayIsInThisWeek = true;

              };

            });

            if (startDayIsInThisWeek === true) {

              if (endDayIsInThisWeek !== true) {

                // * Event starts this week, but doesn't end this week. -- 07/11/2024 JH

                gridColumnStart = startIndex + 1;

                gridColumnEnd = 8;

                eventDisplayType = "partial-start";

              } else {

                // * Event starts and ends within same week. -- 07/11/2024 JH

                gridColumnStart = startIndex + 1;

                gridColumnEnd = endIndex + 2;

              };

            } else {

              if (endDayIsInThisWeek !== true) {

                // * Event doesn't start or end this week. -- 07/11/2024 JH

                eventDisplayType = "partial-start-end";

                gridColumnStart = 1;

                gridColumnEnd = 8;

              } else {

                // * Event doesn't start this week, but ends this week. -- 07/11/2024 JH

                eventDisplayType = "partial-end";

                gridColumnStart = 1;

                gridColumnEnd = endIndex + 2;

              };

            };

            let eventOfThisWeekIndex = thisWeeksEvents.findIndex((weekEvent) => weekEvent.calendarID === eventItem.calendarID);

            let eventColor = isEmpty(eventItem.request) === false && isEmpty(eventItem.request.eventColor) === false ? eventItem.request.eventColor : "#1c1b1e";

            let eventItemContainerStyles = {
              borderColor: `${eventColor}`,
              gridColumn: `${gridColumnStart} / ${gridColumnEnd}`,
              gridRow: eventOfThisWeekIndex + 1
            };

            let eventItemStyles = {
              borderColor: `${eventColor}`
            };

            let eventClasses = classnames("event-item", {
              "event-item--partial-start": eventDisplayType === "partial-start",
              "event-item--partial-end": eventDisplayType === "partial-end",
              "event-item--partial-start event-item--partial-end": eventDisplayType === "partial-start-end"
            });

            return (
              <CalendarItem key={eventItem.calendarID} eventItem={eventItem} eventClasses={eventClasses} eventItemStyles={eventItemStyles} eventItemContainerStyles={eventItemContainerStyles} />
            );

          })}

        </div>

        : null}

    </React.Fragment>
  );

};

export default CalendarWeekEvents;