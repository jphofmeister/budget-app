import React from "react";
import classnames from "classnames";
import { getDate, getMonth, isSameDay } from "date-fns";
import { isEmpty } from "../../utilities/sharedFunctions";

const CalendarCell = (props) => {

  // * Available props: -- 07/11/2024 JH
  // * Properties: day, currentRangeStart -- 07/11/2024 JH

  let componentName = "CalendarCell";

  // * isEmpty doesn't work on date type because typeof props.day is object and Object.keys(props.day).length is 0. -- 07/11/2024 JH
  let day = props.day !== null && props.day !== undefined && props.day !== "" ? props.day : null;
  let currentRangeStart = isEmpty(props.currentRangeStart) === false ? props.currentRangeStart : null;

  let currentMonth = getMonth(currentRangeStart);

  let calendarCellClasses = classnames("calendar__td", {
    "calendar__td--not-current-month": getMonth(day) !== currentMonth,
    "calendar__td--today": isSameDay(day, new Date())
  });


  return (
    <div key={day} className={calendarCellClasses}>

      <div className="calendar__td__date">{getDate(day)}</div>

    </div>
  );

};

export default CalendarCell;