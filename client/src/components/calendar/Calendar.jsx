import React, { useState, useEffect } from "react";
import { isEmpty, getDateTime, isNonEmptyArray } from "../../utilities/sharedFunctions";
import { calculateDate, getStartOfMonth, getEndOfMonth, getEachDayOfInterval, checkIsSameDay } from "./DateFunctions";
import CalendarCell from "./CalendarCell";
import CalendarWeekEvents from "./CalendarWeekEvents";

const Calendar = (props) => {

  // * Available props: -- 07/01/2024 JH
  // * Properties: currentRangeStart, calendarEvents -- 07/01/2024 JH

  let componentName = "Calendar";

  let currentRangeStart = isEmpty(props.currentRangeStart) === false ? props.currentRangeStart : null;
  let calendarEvents = isEmpty(props.calendarEvents) === false ? props.calendarEvents : null;

  const [weeksInMonth, setWeeksInMonth] = useState([]);

  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  // // * Get width of calendar container for responsive calculations -- 07/07/2024 JH
  // useEffect(() => {

  //   if (isEmpty(calendarRef) === false && isEmpty(calendarRef.current) === false) {

  //     // * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver -- 07/08/2024 JH
  //     const resizeObserver = new ResizeObserver(() => {

  //       if (calendarRef.current.offsetWidth !== calendarWidth) {

  //         setCalendarWidth(calendarRef.current.offsetWidth);

  //       };

  //     });

  //     resizeObserver.observe(calendarRef.current);

  //     return () => {

  //       resizeObserver.disconnect();

  //     };

  //   };

  // }, [calendarRef]);


  // * Get dates to display in calendar. -- 07/01/2024 JH
  useEffect(() => {

    if (isEmpty(currentRangeStart) === false) {

      let allDaysInMonthView = getAllDaysOfMonth(currentRangeStart);

      let newWeeksInMonth = divideDaysIntoWeeks(allDaysInMonthView);

      setWeeksInMonth(newWeeksInMonth);

    };

  }, [currentRangeStart]);


  // * Get an array of all days for this month. -- 07/10/2024 JH
  const getAllDaysOfMonth = (dayOfThisMonth) => {

    let currentDay = calculateDate(dayOfThisMonth);
    let startOfMonth = getStartOfMonth(currentDay);
    let endOfMonth = getEndOfMonth(currentDay);

    // * getDay: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay -- 07/10/2024 JH
    let startDayIndex = startOfMonth.getDay();
    let endDayIndex = endOfMonth.getDay();

    // * If the first of the month is not on Sunday, get the last days of the previous month for this week. -- 07/10/2024 JH
    if (startDayIndex > 0) {

      let daysToSubtract = startDayIndex * -1;

      let convertedStartDate = startOfMonth.toLocaleDateString("en-US");

      startOfMonth = calculateDate(convertedStartDate, "day", daysToSubtract);

    };

    // * If the last of the month is not on Saturday, get the first days of the next month for the rest of this week. -- 07/10/2024 JH
    if (endDayIndex < 6) {

      let daysToAdd = 6 - endDayIndex;

      let convertedEndDate = endOfMonth.toLocaleDateString("en-US");

      endOfMonth = calculateDate(convertedEndDate, "day", daysToAdd);

    };

    return getEachDayOfInterval(startOfMonth, endOfMonth);

  };


  // * Divide the days of the month into weeks, returning an array of arrays. -- 07/10/2024 JH
  const divideDaysIntoWeeks = (days) => {

    let newWeeksInMonth = [];
    let weekIndex = 0;

    for (let i = 0; i < days.length; i++) {

      // * If first day of week, create empty array for the new week. -- 07/10/2024 JH
      if (days[i].getDay() === 0) {

        newWeeksInMonth[weekIndex] = [];

      };

      // * Push day to this weekIndex's array. -- 07/10/2024 JH
      newWeeksInMonth[weekIndex].push(days[i]);

      // * If last day of week, increment weekIndex to start adding days to the next week. -- 07/10/2024 JH
      if (days[i].getDay() === 6) {

        weekIndex++;

      };

    };

    return newWeeksInMonth;

  };


  // * Used to filter calendarEvents that occur within a week, including any that run over from the previous week. -- 07/25/2024 JH
  // ? Maybe move into DateFunctions.js? But not sure if name is accurate to what would be expected. -- 07/25/2024 JH
  const checkIsInDateRange = (dateToCompare, dateRangeStart, dateRangeEnd) => {

    let thisDayIndex = dateToCompare.getDay();

    let showEventOnThisDay = false;

    if (checkIsSameDay(dateToCompare, dateRangeStart)) {

      showEventOnThisDay = true;

    } else {

      // * Check if date started in previous week and continued into this week. -- 07/25/2024 JH
      if (thisDayIndex === 0) {

        let dateRange = getEachDayOfInterval(dateRangeStart, dateRangeEnd);

        let isDateInRange = false;

        for (let i = 0; i < dateRange.length; i++) {

          if (checkIsSameDay(dateToCompare, dateRange[i])) {

            isDateInRange = true;

          };

        };

        showEventOnThisDay = isDateInRange;

      };

    };

    return showEventOnThisDay;

  };


  return (
    <div className="calendar">

      <div className="calendar__thead">
        <div className="calendar__tr">

          {weekdays.map((day) => {
            return (
              <div className="calendar__th" key={day}>{day}</div>
            );
          })}

        </div>
      </div>

      {isNonEmptyArray(weeksInMonth) === true && isNonEmptyArray(calendarEvents) === true ?

        <div className="calendar__tbody">

          {/* // * This is mapping through an array of arrays. -- 07/10/2024 JH */}
          {weeksInMonth.map((week, index) => {

            // * Need a flat array of the unique events in this week. -- 07/25/2024 JH
            let thisWeeksEvents = week.flatMap(day => {

              let thisDaysEvents = calendarEvents.filter((event) => checkIsInDateRange(day, event.calendarStartDate, event.calendarEndDate) === true);

              // * In case there are events from the previous week, sort to place them at the top. -- 07/11/2024 JH
              if (isNonEmptyArray(thisDaysEvents) === true) {

                // * sortObjectArrayByProperty can't sort dates? -- 07/11/2024 JH
                // thisDaysEvents = sortObjectArrayByProperty(thisDaysEvents, "start");

                thisDaysEvents.sort((a, b) => a.calendarStartDate - b.calendarStartDate);

              };

              return [...thisDaysEvents];

            });

            return (
              <div key={index} className="calendar__tr-container">

                <div className="calendar__tr">

                  {week.map(day => {
                    return (
                      <CalendarCell key={day} day={day} currentRangeStart={currentRangeStart} />
                    );
                  })}

                </div>

                <CalendarWeekEvents key={index} week={week} thisWeeksEvents={thisWeeksEvents} />

              </div>
            );

          })}

        </div>

        : null}

    </div>
  );
};

export default Calendar;