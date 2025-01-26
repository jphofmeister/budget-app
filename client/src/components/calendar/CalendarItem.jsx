import React, { useState } from "react";
import { isEmpty, getDateTime, isNonEmptyArray, displayDate } from "../../utilities/sharedFunctions";
import { calculateDate } from "./DateFunctions";
import CalendarItemPopover from "./CalendarItemPopover";
import { format, getDate, isSameDay } from "date-fns";

const CalendarItem = (props) => {

  // * Available props: -- 06/23/2023
  // * Properties: eventItem, eventClasses, eventItemStyles, eventItemContainerStyles -- 06/23/2023

  let componentName = "CalendarItem";

  let eventItem = isEmpty(props.eventItem) === false ? props.eventItem : {};
  let eventClasses = isEmpty(props.eventClasses) === false ? props.eventClasses : "";
  let eventItemStyles = isEmpty(props.eventItemStyles) === false ? props.eventItemStyles : {};
  let eventItemContainerStyles = isEmpty(props.eventItemContainerStyles) === false ? props.eventItemContainerStyles : {};

  let additionalProps = isEmpty(eventItem) === false && isEmpty(eventItem.additionalProps) === false ? eventItem.additionalProps : null;
  // let startDate = isEmpty(eventItem) === false && isEmpty(eventItem.calendarStartDate) === false ? eventItem.calendarStartDate : null;
  // let endDate = isEmpty(eventItem) === false && isEmpty(eventItem.calendarStartDate) === false ? eventItem.calendarStartDate : null;

  let { calendarStartDate, calendarEndDate } = props.eventItem;

  const [isEventPanelOpen, setIsEventPanelOpen] = useState(false);


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

          {isEmpty(additionalProps.bill_name) === false ?
            <strong>{additionalProps.bill_name}</strong>
            : null}

          {isEmpty(additionalProps.income_name) === false ?
            <strong>{additionalProps.income_name}</strong>
            : null}

          {/* {isSameDay(calendarStartDate, calendarEndDate) ?

            <div>
              Due: {getDate(calendarStartDate)}
            </div>

            : null} */}

        </div>


      </div>

      {/* {isEventPanelOpen === true ?

        <CalendarItemPopover currentEvent={eventItem} />

        : null} */}

    </div>
  );
};

export default CalendarItem;