import { isEmpty, getDateTime, formatToString, isNonEmptyArray } from "shared-functions";

const componentName = "DateFunctions";

// ? Add functions to shared-functions? Or to application template? -- 06/13/2024 JH


// * Add or subtract days, months, or years. -- 06/13/2024 JH
export const calculateDate = (date, dateType, amount) => {

  let newDate = "";

  // * formatFloat is throwing an error: "value.replaceAll is not a function". -- 06/12/2024 JH
  // let amountToAdd = isEmpty(amount) === false ? formatFloat(amount) : 0;
  let amountToAdd = isEmpty(amount) === false ? parseFloat(amount) : 0;

  if (isEmpty(date) === false) {

    newDate = new Date(date);

    // * Adjust date by timezone offset. -- 06/19/2024 JH
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

    if (dateType === "day") {

      newDate.setDate(newDate.getDate() + amountToAdd);

    };

    if (dateType === "month") {

      newDate.setMonth(newDate.getMonth() + amountToAdd);

    };

    if (dateType === "year") {

      newDate.setYear(newDate.getYear() + amountToAdd);

    };

  };

  return newDate;

};


export const displayMonthName = (dateToDisplay) => {

  // ? Not sure how to check if dateToDisplay isEmpty. When dateToDisplay is a Date type, it returns true to isEmpty. -- 06/13/2024 JH
  // let newDisplayDate = dateToDisplay;
  let newDisplayDate = new Date(dateToDisplay);

  let month = newDisplayDate.toLocaleString("default", { month: "long" });

  return month;

};


// * date-fns startOfMonth: https://github.com/date-fns/date-fns/blob/ddb34e083/src/startOfMonth/index.ts#L23 -- 07/01/2024 JH
export const getStartOfMonth = (currentDate) => {

  let newStartOfMonth = new Date(currentDate);

  newStartOfMonth.setDate(1);

  newStartOfMonth.setHours(0, 0, 0, 0);

  return newStartOfMonth;

};


// * date-fns endOfMonth: https://github.com/date-fns/date-fns/blob/ddb34e083/src/endOfMonth/index.ts#L23 -- 07/01/2024 JH
export const getEndOfMonth = (currentDate) => {

  let newEndOfMonth = new Date(currentDate);

  let month = newEndOfMonth.getMonth();

  newEndOfMonth.setFullYear(newEndOfMonth.getFullYear(), month + 1, 0);

  newEndOfMonth.setHours(23, 59, 59, 999);

  return newEndOfMonth;

};


// * date-fns eachDayOfInterval: https://github.com/date-fns/date-fns/blob/ddb34e083/src/eachDayOfInterval/index.ts#L38 -- 07/01/2024 JH
export const getEachDayOfInterval = (startInterval, endInterval) => {

  let startDate = new Date(startInterval);
  let endDate = new Date(endInterval);

  // * Plus sign converts date into a number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus -- 07/01/2024 JH
  let endTime = +endDate;

  let currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);

  let dates = [];

  while (+currentDate <= endTime) {

    dates.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);

  };

  return dates;

};


// * date-fns isSameDay: https://github.com/date-fns/date-fns/blob/ddb34e083/src/isSameDay/index.ts#L33 -- 07/01/2024 JH
export const checkIsSameDay = (date1, date2) => {

  let startOfDate1 = new Date(date1).setHours(0, 0, 0, 0);
  let startOfDate2 = new Date(date2).setHours(0, 0, 0, 0);

  return startOfDate1 === startOfDate2;

};


export const displayDay = (dateToDisplay, removeLeadingZeroes) => {

  let newDisplayDate = "";

  let formattedDate = dateToDisplay.toLocaleDateString("en-CA");

  if (isEmpty(formattedDate) === false) {

    // * Year
    // let yyyy = formatToString(formattedDate).substring(0, 4);
    // * Month
    // let mm = formatToString(formattedDate).substring(5, 7);
    // * Day
    let dd = formatToString(formattedDate).substring(8, 10);

    // newDisplayDate = mm + "/" + dd + "/" + yyyy;
    newDisplayDate = dd;

    if (isEmpty(newDisplayDate) === false && removeLeadingZeroes === true) {

      newDisplayDate = newDisplayDate.replace(/\b0/g, "");

    };

  };

  return newDisplayDate;

};
