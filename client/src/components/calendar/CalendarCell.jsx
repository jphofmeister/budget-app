import React from "react";
import classnames from "classnames";
import { noFunctionAvailable, isEmpty, isNonEmptyArray } from "shared-functions";
import { calculateDate, getEachDayOfInterval, displayDay, checkIsSameDay } from "./DateFunctions";
import CalendarItem from "./CalendarItem";

const EventCalendarDay = (props) => {

  // * Available props: -- 07/11/2024 JH
  // * Properties: day, thisDaysEvents, thisWeeksEvents, calendarWidth, currentRangeStart -- 07/11/2024 JH
  // * Functions: getStatus -- 07/11/2024 JH

  let componentName = "EventCalendarDay";

  // * isEmpty doesn't work on date type because typeof props.day is object and Object.keys(props.day).length is 0 -- 07/11/2024 JH
  let day = props.day !== null && props.day !== undefined && props.day !== "" ? props.day : null;

  let thisDaysEvents = isEmpty(props.thisDaysEvents) === false ? props.thisDaysEvents : [];
  let thisWeeksEvents = isEmpty(props.thisWeeksEvents) === false ? props.thisWeeksEvents : [];
  let calendarWidth = isEmpty(props.calendarWidth) === false ? props.calendarWidth : null;
  let currentRangeStart = isEmpty(props.currentRangeStart) === false ? props.currentRangeStart : null;

  let getStatus = isEmpty(props) === false && isEmpty(props.getStatus) === false ? props.getStatus : noFunctionAvailable;

  let currentMonth = calculateDate(currentRangeStart).getMonth();

  let calendarCellClasses = classnames("calendar__cell", {
    "calendar__cell--not-current-month": day.getMonth() !== currentMonth,
    "calendar__cell--today": checkIsSameDay(day, new Date())
  });


  return (
    <td key={day} width={calendarWidth / 7}>

      <div className={calendarCellClasses}>

        <div className="calendar__cell__date">{displayDay(day, true)}</div>

        {isNonEmptyArray(thisDaysEvents) === true ?

          <div className="calendar__cell__events">

            {thisDaysEvents.map((eventItem) => {

              // * The code below is all used for calculating the styles of the eventItem -- 07/25/2024 JH
              let eventWidth = 0;
              let daysToMultiplyBy = 0;
              let eventDisplayType = "";

              let dateRange = getEachDayOfInterval(eventItem.calendarStartDate, eventItem.calendarEndDate);
              let endIndex = new Date(eventItem.calendarEndDate).getDay();

              if (checkIsSameDay(day, eventItem.calendarStartDate) === true) {

                if ((dateRange.length - 1) > endIndex) {

                  // * Event starts this week, but doesn't end this week -- 07/11/2024 JH
                  daysToMultiplyBy = (dateRange.length - 1) - (endIndex + 1);

                  eventDisplayType = "partial-start";

                } else {

                  // * Event starts and ends within same week -- 07/11/2024 JH
                  daysToMultiplyBy = dateRange.length - 1;

                };

              } else {

                // TODO Somehow need to check if event doesn't start or end this week -- 07/11/2024 JH
                // if ((dateRange.length - 1) > endIndex) {

                //   // * Event starts this week, but doesn't end this week -- 07/11/2024 JH
                //   daysToMultiplyBy = (dateRange.length - 1) - (endIndex + 1);

                // } else {

                // * Event doesn't start this week, but ends this week -- 07/11/2024 JH
                daysToMultiplyBy = endIndex;

                eventDisplayType = "partial-end";

                // };

              };

              eventWidth = (calendarWidth / 7) * daysToMultiplyBy;

              let eventOfThisWeekIndex = thisWeeksEvents.findIndex((weekEvent) => weekEvent.calendarID === eventItem.calendarID);

              let eventColor = isEmpty(eventItem.extendedProps) === false && isEmpty(eventItem.extendedProps.eventColor) === false ? eventItem.extendedProps.eventColor : "#1c1b1e";

              let eventItemContainerStyles = {
                borderColor: `${eventColor}`,
                right: -1 * eventWidth,
                top: `calc(4rem * ${eventOfThisWeekIndex})`
              };

              let eventItemStyles = {
                borderColor: `${eventColor}`,
                right: -1 * eventWidth
              };

              let eventClasses = classnames("event-item", {
                "event-item--partial-start": eventDisplayType === "partial-start",
                "event-item--partial-end": eventDisplayType === "partial-end"
              });

              return (
                <CalendarItem
                  key={eventItem.calendarID}
                  eventItem={eventItem}
                  eventClasses={eventClasses}
                  eventItemStyles={eventItemStyles}
                  eventItemContainerStyles={eventItemContainerStyles}
                  getStatus={getStatus} />
              );

            })}

          </div>

          : null}

        {/* // * This (basically) sets the height of the <td> -- 07/25/2024 JH */}
        <div style={{ marginTop: `calc(4rem * ${thisWeeksEvents.length + 1})` }}></div>

      </div>
    </td>
  );

};

export default EventCalendarDay;