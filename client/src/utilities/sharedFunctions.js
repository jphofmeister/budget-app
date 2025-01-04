import parseHTML from "html-react-parser";

const componentName = "shared-functions";

export const noFunctionAvailable = () => {

  console.log(componentName, getDateTime(), "A function wasn't passed as a props when it needed to be.");

};


export const isEmpty = (value) => {

  // * https://stackoverflow.com/questions/4597900/checking-something-isempty-in-javascript -- 03/06/2021
  // * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in -- 03/06/2021

  return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

  // * Returns true -- 03/06/2021
  // console.log(componentName, getDateTime(), "isEmpty(\"\")", isEmpty(""));
  // console.log(componentName, getDateTime(), "isEmpty(null)", isEmpty(null));
  // console.log(componentName, getDateTime(), "isEmpty(undefined)", isEmpty(undefined));
  // console.log(componentName, getDateTime(), "isEmpty([])", isEmpty([]));
  // console.log(componentName, getDateTime(), "isEmpty({})", isEmpty({}));

  // * Returns false -- 03/06/2021
  // console.log(componentName, getDateTime(), "isEmpty(\"test\")", isEmpty("test"));
  // console.log(componentName, getDateTime(), "isEmpty(5)", isEmpty(5));
  // console.log(componentName, getDateTime(), "isEmpty(true)", isEmpty(true));
  // console.log(componentName, getDateTime(), "isEmpty([\"test\"])", isEmpty(["test"]));
  // console.log(componentName, getDateTime(), "isEmpty({test: \"test\"})", isEmpty({ test: "test" }));

};


export const getDateTime = () => {

  // * Time returned does not consider the time zone without adjustments. -- 08/09/2021
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes -- 08/09/2021

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local -- 08/09/2021
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  // return new Date().toLocaleString();
  // return new Date().toLocaleString().slice(0, 19).replace("T", " ");
  // return new Date().toISOString().slice(0, 19).replace("T", " ");
  return new Date(new Date() - timezoneOffset).toISOString().slice(0, 19).replace("T", " ");

};


export const isNonEmptyArray = (arrayItem) => {

  let nonEmptyArray = false;

  if (Array.isArray(arrayItem) === true && arrayItem.length > 0) {

    nonEmptyArray = true;

  };

  return nonEmptyArray;

};


export const getFirstItem = (arrayItem) => {

  let firstItem = null;

  if (isNonEmptyArray(arrayItem) === true && isEmpty(arrayItem[0]) === false) {

    firstItem = arrayItem[0];

  };

  return firstItem;

};


export const getLastItem = (arrayItem) => {

  let lastItem = null;

  if (isNonEmptyArray(arrayItem) === true && isEmpty(arrayItem[arrayItem.length - 1]) === false) {

    lastItem = arrayItem[arrayItem.length - 1];

  };

  return lastItem;

};


export const displayValue = (variableValue) => {

  let displayValue = "";

  if (isEmpty(variableValue) === false) {

    if (variableValue === true) {

      displayValue = "True";

    } else if (variableValue === false) {

      displayValue = "False";

    } else if (variableValue instanceof Date) {

      displayValue = variableValue.toLocaleString();

    } else {

      displayValue = variableValue;

    };

  } else {

    displayValue = "Value is undefined or null.";

  };

  return displayValue;

};


export const displaySpaceAfterComma = (text) => {

  let displayText = text;

  if (isEmpty(text) === false) {

    displayText = text.replaceAll(",", ", ");

  };

  return displayText;

};


export const removeForwardSlashes = (text) => {

  let displayText = text;

  if (isEmpty(text) === false) {

    displayText = formatToString(text).replace(/\//g, "");

  };

  return displayText;

};


export const tryParseJSON = (jsonString) => {

  // * https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try -- 03/06/2021
  try {

    let jsonData = JSON.parse(jsonString);

    // * Handle non-exception-throwing cases: -- 03/05/2021
    // * Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking, -- 03/05/2021
    // * but... JSON.parse(null) returns null, and typeof null === "object", -- 03/05/2021
    // * so we must check for that, too. Thankfully, null is falsey, so this suffices: -- 03/05/2021
    if (jsonData && typeof jsonData === "object") {

      return jsonData;

    };

  }
  catch (error) {

    // * Don't display this error in the console. This function is already returning false if the JSON file is not in the correct format. -- 03/06/2021
    // console.log(componentName, getDateTime(), "tryParseJSON error", error);

  };

  return false;

};


export const displayObjectData = (ObjectData) => {

  let objectDataString = JSON.stringify(ObjectData);

  if (isEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<p><strong>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</p><p><strong>");
    objectDataString = objectDataString.replaceAll("\"}]", "</p>");

    objectDataString = objectDataString.replaceAll("{\"", "<p><strong>");
    objectDataString = objectDataString.replaceAll("\"}", "</p>");

    objectDataString = objectDataString.replaceAll("\":\"", "</strong> = ");
    objectDataString = objectDataString.replaceAll("\":", "</strong> = ");

    objectDataString = objectDataString.replaceAll("\",\"", "</p><p><strong>");
    objectDataString = objectDataString.replaceAll(",\"", "</p><p><strong>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");

    objectDataString = objectDataString.replace(/<strong>(.*?)<\/strong>/g, (match) => { return formatTitle(match); });

  };

  return (objectDataString);

};


export const displayObjectDataTable = (ObjectData) => {

  let objectDataString = JSON.stringify(ObjectData);

  if (isEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<tr><th>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</td><tr><th>");
    objectDataString = objectDataString.replaceAll("\"}]", "</td></tr>");
    // objectDataString = objectDataString.replaceAll("[{\\\"", "<tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"},{\\\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"}]", "</td></tr>");

    objectDataString = objectDataString.replaceAll("{\"", "<tr><th>");
    objectDataString = objectDataString.replaceAll("\"}", "</td></tr>");
    // objectDataString = objectDataString.replaceAll("{\\\"", "<tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\"}", "</td></tr>");

    objectDataString = objectDataString.replaceAll("\":\"", "</th><td>");
    objectDataString = objectDataString.replaceAll("\":", "</th><td>");
    // objectDataString = objectDataString.replaceAll("\\\":\\\"", "</th><td>");
    // objectDataString = objectDataString.replaceAll("\\\":", "</th><td>");

    objectDataString = objectDataString.replaceAll("\",\"", "</td><tr><th>");
    objectDataString = objectDataString.replaceAll(",\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll("\\\",\\\"", "</td><tr><th>");
    // objectDataString = objectDataString.replaceAll(",\\\"", "</td><tr><th>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");
    // objectDataString = objectDataString.replaceAll("[\\\"", "");
    // objectDataString = objectDataString.replaceAll("\\\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");


    objectDataString = objectDataString.replace(/<th>(.*?)<\/th>/g, (match) => { return formatTitle(match); });

  };

  return (objectDataString);

};


export const displayObjectDataXML = (ObjectData) => {

  let objectDataString = JSON.stringify(ObjectData);

  if (isEmpty(objectDataString) === false) {

    objectDataString = objectDataString.replaceAll("\\", "");

    objectDataString = objectDataString.replaceAll("[{\"", "<category>");
    objectDataString = objectDataString.replaceAll("\"},{\"", "</data><category>");
    objectDataString = objectDataString.replaceAll("\"}]", "<data>");

    objectDataString = objectDataString.replaceAll("{\"", "<category>");
    objectDataString = objectDataString.replaceAll("\"}", "<data>");

    objectDataString = objectDataString.replaceAll("\":\"", "</category><data>");
    objectDataString = objectDataString.replaceAll("\":", "</category><data>");

    objectDataString = objectDataString.replaceAll("\",\"", "</data><category>");
    objectDataString = objectDataString.replaceAll(",\"", "</data><category>");

    objectDataString = objectDataString.replaceAll("},", "");

    objectDataString = objectDataString.replaceAll("[]", "");

    objectDataString = objectDataString.replaceAll("[\"", "");
    objectDataString = objectDataString.replaceAll("\"]", "");

    objectDataString = objectDataString.replaceAll("[", "");
    objectDataString = objectDataString.replaceAll("]", "");
    objectDataString = objectDataString.replaceAll("{", "");
    objectDataString = objectDataString.replaceAll("}", "");

  };

  return (objectDataString);

};


export const getCurrentDay = () => {

  // * Time returned does not consider the time zone without adjustments. -- 08/09/2021
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes -- 08/09/2021

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local -- 08/09/2021
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  // return new Date().toLocaleString();
  // return new Date().toLocaleString().slice(0, 19).replace("T", " ");
  // return new Date().toISOString().slice(0, 19).replace("T", " ");
  // return new Date().getDate();
  return new Date(new Date() - timezoneOffset).getDate();

};


export const getCurrentMonth = () => {

  // * Time returned does not consider the time zone without adjustments. -- 08/09/2021
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes -- 08/09/2021

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local -- 08/09/2021
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  // return new Date().toLocaleString();
  // return new Date().toLocaleString().slice(0, 19).replace("T", " ");
  // return new Date().toISOString().slice(0, 19).replace("T", " ");
  // return new Date().getMonth() + 1;
  return new Date(new Date() - timezoneOffset).getMonth() + 1;

};


export const getCurrentYear = () => {

  // * Time returned does not consider the time zone without adjustments. -- 08/09/2021
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes -- 08/09/2021

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local -- 08/09/2021
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  // return new Date().toLocaleString();
  // return new Date().toLocaleString().slice(0, 19).replace("T", " ");
  // return new Date().toISOString().slice(0, 19).replace("T", " ");
  // return new Date().getFullYear();
  return new Date(new Date() - timezoneOffset).getFullYear();

};


export const displayDate = (dateToDisplay, removeLeadingZeroes) => {

  let newDisplayDate = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = formatToString(dateToDisplay).substring(0, 4);
    // * Month
    let mm = formatToString(dateToDisplay).substring(5, 7);
    // * Day
    let dd = formatToString(dateToDisplay).substring(8, 10);

    newDisplayDate = mm + "/" + dd + "/" + yyyy;

    if (isEmpty(newDisplayDate) === false && removeLeadingZeroes === true) {

      newDisplayDate = newDisplayDate.replace(/\b0/g, "");

    };

  };

  return newDisplayDate;

};


export const displayDateAndTime = (dateToDisplay, removeLeadingZeroes) => {

  let newDisplayDateAndTime = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = formatToString(dateToDisplay).substring(0, 4);
    // * Month
    let mm = formatToString(dateToDisplay).substring(5, 7);
    // * Day
    let dd = formatToString(dateToDisplay).substring(8, 10);

    // // * Hour
    // let hour = formatToString(dateToDisplay).substring(11, 12);
    // // * Minute
    // let minute = formatToString(dateToDisplay).substring(15, 16);

    // * Time
    let time = formatToString(dateToDisplay).substring(11, 16);

    newDisplayDateAndTime = mm + "/" + dd + "/" + yyyy + " " + time;

    if (isEmpty(newDisplayDateAndTime) === false && removeLeadingZeroes === true) {

      newDisplayDateAndTime = newDisplayDateAndTime.replace(/\b0/g, "");

    };

  };

  return newDisplayDateAndTime;

};


export const displayYear = (dateToDisplay) => {

  let newDisplayDate = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Year
    let yyyy = formatToString(dateToDisplay).substring(0, 4);
    // * Month
    // let mm = formatToString(dateToDisplay).substring(5, 7);
    // * Day
    // let dd = formatToString(dateToDisplay).substring(8, 10);

    // newDisplayDate = mm + "/" + dd + "/" + yyyy;

    newDisplayDate = yyyy;

  };

  return newDisplayDate;

};


export const daysSince = (dateToCompare) => {

  // * https://stackoverflow.com/questions/12986068/how-to-calculate-number-of-days-between-today-and-given-date-and-code-for-gettim -- 10/18/2021

  let newDaysSince = 0;

  if (isEmpty(dateToCompare) === false) {

    let today = new Date();
    let compareDate = new Date(dateToCompare);
    let timeInMilliseconds = compareDate.getTime() - today.getTime();

    newDaysSince = Math.abs(Math.ceil(timeInMilliseconds / (1000 * 60 * 60 * 24)));

  };

  return newDaysSince;

};


export const hasNonEmptyProperty = (objectItem, propertyName) => {

  // * This function is intended for use in ternary statements so that there aren't lines and lines of if statement structures or to see if the object has a property available with a value. -- 06/09/2022

  let nonEmptyProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && isEmpty(objectItem[propertyName]) === false) {

      nonEmptyProperty = true;

    };

  };

  return nonEmptyProperty;

};


export const hasEqualsProperty = (objectItem, propertyName, value) => {

  // * This function is intended for use in ternary statements so that there aren't lines and lines of if statement structures. -- 06/09/2022

  let equalsProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && isEmpty(objectItem[propertyName]) === false && objectItem[propertyName] === value) {

      equalsProperty = true;

    };

  };

  return equalsProperty;

};


export const hasTrueProperty = (objectItem, propertyName) => {

  // * This function is intended for use in ternary statements so that there aren't lines and lines of if statement structures. -- 06/09/2022

  let trueProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && objectItem[propertyName] === true) {

      trueProperty = true;

    };

  };

  return trueProperty;

};


export const hasFalseProperty = (objectItem, propertyName) => {

  // * This function is intended for use in ternary statements so that there aren't lines and lines of if statement structures. -- 06/09/2022

  let falseProperty = false;

  if (typeof objectItem === "object") {

    if (objectItem.hasOwnProperty(propertyName) === true && objectItem[propertyName] === false) {

      falseProperty = true;

    };

  };

  return falseProperty;

};


export const convertSpecialCharacters = (value) => {

  // * https://stackoverflow.com/questions/1787322/what-is-the-htmlspecialchars-equivalent-in-javascript/4835406#4835406 -- 12/28/2021

  let newValue = value;

  if (isEmpty(value) === false) {

    newValue = newValue.replace(/&/g, "&amp;");
    newValue = newValue.replace(/</g, "&lt;");
    newValue = newValue.replace(/>/g, "&gt;");
    newValue = newValue.replace(/"/g, "&quot;");
    newValue = newValue.replace(/'/g, "&#039;");

  };

  return newValue;

};


export const truncateText = (text, limit) => {

  // * https://stackoverflow.com/questions/4700226/i-want-to-truncate-a-text-or-line-with-ellipsis-using-javascript -- 03/06/2021

  if (isEmpty(text) === false && text.length > limit) {

    for (let i = limit; i > 0; i--) {

      if (text.charAt(i) === " " && (text.charAt(i - 1) !== "," || text.charAt(i - 1) !== "." || text.charAt(i - 1) !== ";")) {

        return text.substring(0, i) + "...";

      };

    };

    return text.substring(0, limit) + "...";

  } else {

    return text;

  };

};


export const validateMilitaryTime = (timeEntered) => {

  // * Time in 24 clock, no colon -- 03/05/2021

  // * all digits-- 03/05/2021
  // * length is 4
  // * first digit is either a 0 or 1 or 2
  // * second digit is either a 0 or 1 or 2 or 3 or 4 or 5 
  // * third digit is either a 0 or 1 or 2 or 3 or 4 or 5 

  // * Make sure that it is a string-- 03/05/2021

  let validTimeFormat = true;

  let timeEnteredString = "";

  if (typeof formatToString(timeEntered) === "string") {

    timeEnteredString = formatToString(timeEntered);

    timeEnteredString = timeEnteredString.trim();

    if (timeEnteredString.length !== 4) {

      validTimeFormat = false;

    } else {

      if (isNaN(parseInt(timeEnteredString.charAt(0))) === true || isNaN(parseInt(timeEnteredString.charAt(1))) === true || isNaN(parseInt(timeEnteredString.charAt(2))) === true || isNaN(parseInt(timeEnteredString.charAt(3))) === true) {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) !== "0" && timeEnteredString.charAt(0) !== "1" && timeEnteredString.charAt(0) !== "2") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "0" && timeEnteredString.charAt(1) !== "1" && timeEnteredString.charAt(1) !== "2" && timeEnteredString.charAt(1) !== "3" && timeEnteredString.charAt(1) !== "4") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "4" && timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(3) !== "0") {

        validTimeFormat = false;

      };

      if (timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(2) !== "1" && timeEnteredString.charAt(2) !== "2" && timeEnteredString.charAt(2) !== "3" && timeEnteredString.charAt(2) !== "4" && timeEnteredString.charAt(2) !== "5") {

        validTimeFormat = false;

      };

    };

  } else {

    validTimeFormat = false;

  };

  return validTimeFormat;

};


export const convertTemperature = (temperatureScale, temperature) => {

  // let temperatureFloat = parseFloat(formatTrim(temperature));
  let temperatureFloat = parseFloat(temperature);
  let temperatureConverted = null;

  if (isEmpty(temperatureFloat) === false && isNaN(temperatureFloat) === false) {

    if (formatLowerCase(temperatureScale) === "celsius") {

      // * Based on (32°F - 32) x 5/9 = 0°C -- 07/29/2021
      temperatureConverted = ((temperatureFloat - 32) * 5 / 9).toFixed(2);

    } else if (formatLowerCase(temperatureScale) === "fahrenheit") {

      // * Based on (32°F - 32) x 5/9 = 0°C -- 07/29/2021
      temperatureConverted = (temperatureFloat * 9 / 5 + 32).toFixed(2);

    };

  } else {

    temperatureConverted = "";

  };

  return temperatureConverted;

};


export const convertYesNoTrueFalse = (value) => {

  if (isNaN(value) === true && value === "Yes") {

    return true;

  } else if (isNaN(value) === true && value === "No") {

    return false;

  } else if (value === true) {

    return "Yes";

  } else if (value === false) {

    return "No";

  } else {

    return value;

  };

};


export const convertNormalAbnormalTrueFalse = (value) => {

  if (isNaN(value) === true && value === "Normal") {

    return true;

  } else if (isNaN(value) === true && value === "Abnormal") {

    return false;

  } else if (value === true) {

    return "Normal";

  } else if (value === false) {

    return "Abnormal";

  } else {

    return value;

  };

};


export const convertEnableDisableTrueFalse = (value) => {

  if (isNaN(value) === true && value === "Enable") {

    return true;

  } else if (isNaN(value) === true && value === "Disable") {

    return false;

  } else if (value === true) {

    return "Enable";

  } else if (value === false) {

    return "Disable";

  } else {

    return value;

  };

};


export const convertNullEmptyString = (value) => {

  // * TODO: Change this function so that it can handle if there are already empty string values in the database. -- 03/19/2021
  // * This can't be done in one function like this to handle both conversions because what if the database value is set to an empty string. -- 07/09/2021

  if (value === null) {

    return "";

  } else if (value === undefined) {

    return "";

  } else if (value === "NaN") {

    return null;

  } else if (isNaN(value) === true && typeof value === "number") {

    return null;

  } else if (isNaN(value) === true && value === "") {

    return null;

  } else if (value === "") {

    return null;

  } else {

    return value;

  };

};


export const isWholeNumber = (value) => {

  // * Make sure that the value isn't empty. isNaN counts empty values as a number. -- 09/11/2023
  if (isEmpty(value) === true || isNaN(formatTrim(value)) === true) {

    return false;

  } else {

    // * https://www.w3resource.com/javascript-exercises/javascript-math-exercise-38.php -- 06/21/2021
    if (value - Math.floor(value) !== 0) {

      return false;

    } else {

      return true;

    };

  };

};


export const hasDecimalPlaces = (value, decimalPlaces) => {

  // * Make sure that the value isn't empty. isNaN counts empty values as a number. -- 09/11/2023
  if (isEmpty(value) === true || isNaN(formatTrim(value)) === true) {

    return false;

  } else {

    let currentDecimalPlaces = 1;

    if (Number.isInteger(parseFloat(decimalPlaces)) === true) {

      currentDecimalPlaces = decimalPlaces;

    };

    // * This removes any values from the string starting at and after a non-number value in the string. -- 06/21/2021
    // * Parse the value to see if it is a float. -- 06/21/2021
    let valueToTest = parseFloat(formatTrim(value));

    let valueDecimals = 0;

    if (formatTrim(value).includes(".")) {

      // * Remove the characters after the decimal point to be counted later if there is a decimal point. -- 06/21/2021
      valueDecimals = formatTrim(value).substring(formatTrim(value).indexOf(".") + 1);

    };

    if (isEmpty(valueToTest) === true || isNaN(valueToTest) === true || (isEmpty(currentDecimalPlaces) === false && valueDecimals.length > currentDecimalPlaces)) {

      return false;

    } else {

      return true;

    };

  };

};


export const generateRandomNumber = (minimumValue, maximumValue) => {

  // * https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript -- 01/14/2022

  let randomNumber = Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;

  return randomNumber;

};


export const generateRandomNumberDigits = (digits) => {

  let randomNumber = formatToString(Math.floor(Math.random() * 10 ** digits));

  while (randomNumber.length < (digits)) {

    randomNumber = `0${randomNumber}`;

  };

  return randomNumber;

};


export const formatPhoneNumber = (phoneNumber) => {

  // * From https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/ -- 07/22/2021

  let onlyDigits = "";

  if (typeof phoneNumber === "string") {

    onlyDigits = phoneNumber.replace(/\D/g, "");

  };

  let validPhoneNumber = onlyDigits.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (isEmpty(validPhoneNumber) === false) {

    return `${validPhoneNumber[1]}-${validPhoneNumber[2]}-${validPhoneNumber[3]}`;

  } else {

    return phoneNumber;

  };

};


export const formatTitle = (title) => {

  // * From https://stackoverflow.com/questions/11427759/how-to-insert-space-before-capitalize-character-in-a-word-using-replace-and-rege -- 08/10/2021
  // * From https://attacomsian.com/blog/string-capitalize-javascript -- 08/10/2021
  // * From https://www.codeproject.com/Articles/108996/Splitting-Pascal-Camel-Case-with-RegEx-Enhancement -- 08/10/2021

  let formattedTitle = "";

  if (isEmpty(title) === false && title !== "iSBAR" && title !== "iSBARs" && title !== "iSBAREnable") {

    // * iSBARs is the special case that is difficult to make work in regex. -- 08/16/2021
    formattedTitle = title.replace(/(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])/g, "$1").replace(/\b\w/g, c => c.toUpperCase());

  } else if (isEmpty(title) === false && title === "iSBAR") {

    formattedTitle = "iSBAR";

  } else if (isEmpty(title) === false && title === "iSBARs") {

    formattedTitle = "iSBARs";

  } else if (isEmpty(title) === false && title === "iSBAREnable") {

    formattedTitle = "iSBAR Enable";

  };

  return formattedTitle;

};


export const randomizeItems = (items, randomize) => {

  let itemsRandomized = [];

  if (randomize === true && Array.isArray(items) === true) {

    itemsRandomized = items.map((a) => {

      return (
        { sort: Math.random(), value: a }
      );

    })
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

  } else {

    itemsRandomized = items;

  };

  return itemsRandomized;

};


export const getObjectArrayUniqueProperty = (objectArray, uniqueProperty) => {

  // * https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript -- 05/07/2022

  let uniqueArray = [...objectArray];

  if (Array.isArray(uniqueArray) === true) {

    uniqueArray = [...new Set(objectArray.map((item) => item[uniqueProperty]))];

    if (typeof uniqueArray[0] === "number") {

      uniqueArray.sort(function (a, b) { return a - b; });

    } else {

      uniqueArray.sort();

    };

  };

  return uniqueArray;

};


export const removeArticlesFromBeginning = (value) => {

  let newValue = value;

  if (isEmpty(value) === false) {

    newValue = formatLowerCase(newValue).replace(/^(a\.)/, "").replace(/^(the\.)/, "");

  };

  return newValue;

};


export const compareItemsForSorting = (itemOne, itemTwo) => {

  if (typeof itemOne === "number") {

    return itemOne - itemTwo;

  } else {

    return removeArticlesFromBeginning(itemOne) > removeArticlesFromBeginning(itemTwo);

  };

};


export const sortObjectArrayByProperty = (objectArray, sortProperty, direction) => {

  // * https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ -- 05/07/2022
  // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields -- 03/06/2021

  let sortedArray = [...objectArray];

  if (Array.isArray(sortedArray) === true) {

    if (typeof sortedArray[0][sortProperty] === "number") {

      sortedArray.sort((a, b) => a[sortProperty] - b[sortProperty]);

    } else {

      // * sortedArray.sort((a, b) => (removeArticlesFromBeginning(a[sortProperty]) > removeArticlesFromBeginning(b[sortProperty])) ? 1 : -1);
      sortedArray.sort((a, b) => {

        let aProperty = removeArticlesFromBeginning(a[sortProperty]);
        let bProperty = removeArticlesFromBeginning(b[sortProperty]);

        // * Put null values at the end of the array: https://stackoverflow.com/a/29829361 -- 11/30/2023 JH
        if (aProperty === bProperty) {

          return 0;

        };

        if (isEmpty(aProperty) === true) {

          return 1;

        };

        if (isEmpty(bProperty) === true) {

          return -1;

        };

        return aProperty > bProperty ? 1 : -1;

      });

    };

  };

  if (formatLowerCase(direction) === "desc") {

    sortedArray.reverse();

  };

  return sortedArray;

};


export const sortObjectArrayByTwoProperties = (objectArray, sortPropertyOne, sortPropertyTwo, direction) => {

  // ? TODO: The sorting for two object properties isn't working correctly? -- 06/16/2022
  // * https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ -- 05/07/2022
  // * https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields -- 03/06/2021

  let sortedArray = [...objectArray];

  if (isNonEmptyArray(sortedArray) === true) {

    if (isEmpty(sortPropertyTwo) === false) {

      sortedArray.sort(
        function (a, b) {

          if (a[sortPropertyOne] === b[sortPropertyOne]) {

            // * sortPropertyTwo is only important when a and b sortPropertyOne are the same -- 03/06/2021
            return compareItemsForSorting(a[sortPropertyTwo], b[sortPropertyTwo]);

          };

          return compareItemsForSorting(a[sortPropertyOne], b[sortPropertyOne]) ? 1 : -1;

        });

    } else if (isEmpty(sortPropertyOne) === false) {

      // sortedArray.sort((a, b) => (a[sortPropertyOne] > b[sortPropertyOne]) ? 1 : -1);

      sortedArray.sort(
        function (a, b) {

          return compareItemsForSorting(a[sortPropertyOne], b[sortPropertyOne]) ? 1 : -1;

        }

      );

    };

  };

  if (formatLowerCase(direction) === "desc") {

    sortedArray.reverse();

  };

  return sortedArray;

};


export const compareObjectProperties = (originalObject, comparisonObject) => {

  // * https://stackoverflow.com/questions/14368596/how-can-i-check-that-two-objects-have-the-same-set-of-property-names -- 05/18/2022
  // * The order of the objects in the parameters matters because the comparison is completed based on what does or does not exist in the comparisionObject. -- 05/18/2022

  let originalObjectProperties = Object.keys(originalObject);
  let comparisonObjectProperties = Object.keys(comparisonObject);

  let newProperties = [];
  let removedProperties = [];
  let sameProperties = [];

  // * Checks for object properties have been added. -- 05/16/2022
  originalObjectProperties.map((property) => {

    if (comparisonObjectProperties.indexOf(property) < 0) {

      newProperties.push(property);

    } else {

      sameProperties.push(property);

    };

  });

  // // * Checks for object properties have been added. -- 05/16/2022
  // for (let i = 0; i < originalObjectProperties.length; i++) {

  //   if (comparisonObjectProperties.indexOf(originalObjectProperties[i]) < 0) {

  //     newProperties.push(originalObjectProperties[i]);

  //   } else {

  //     sameProperties.push(originalObjectProperties[i]);

  //   };

  // };

  // * Checks for object properties have been removed. -- 05/16/2022
  comparisonObjectProperties.map((property) => {

    if (originalObjectProperties.indexOf(property) < 0) {

      removedProperties.push(property);

      // } else {

      //   sameProperties.push(property);

    };

  });

  // // * Checks for object properties have been removed. -- 05/16/2022
  // for (let i = 0; i < comparisonObjectProperties.length; i++) {

  //   if (originalObjectProperties.indexOf(comparisonObjectProperties[i]) < 0) {

  //     newProperties.push(comparisonObjectProperties[i]);

  //     // } else {

  //     //   sameProperties.push(comparisonObjectProperties[i]);

  //   };

  return { newProperties: [...newProperties], removedProperties: [...removedProperties], sameProperties: [...sameProperties] };

};


export const groupObjectArrayByProperties = (objectArray, ...keys) => {

  // * From https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d?permalink_comment_id=3646957#gistcomment-3646957 -- 04/04/2022

  const getGroupFromItem = (item, keys) => {

    return (keys.length > 1) ? getGroupFromItem(item[keys[0]], keys.slice(1)) : item[keys[0]];

  };

  return objectArray.reduce((results, item) => {

    // * Get the first instance of the key by which we're grouping. -- 04/04/2022
    let group = getGroupFromItem(item, keys);

    // * Ensure that there's an array to hold our results for this group. -- 04/04/2022
    results[group] = results[group] || [];

    // * Add this item to the appropriate group within results. -- 04/04/2022
    results[group].push(item);

    // * Return the updated results object to be passed into next reduce call. -- 04/04/2022
    return results;

    // * Initial value of the results object -- 04/04/2022
  }, {});

};


export const formatLowerCase = (value) => {

  let lowerCaseValue = "";

  if (isEmpty(value) === false) {

    lowerCaseValue = formatToString(value).toLowerCase();

  };

  return lowerCaseValue;

};


export const formatUpperCase = (value) => {

  let upperCaseValue = "";

  if (isEmpty(value) === false) {

    upperCaseValue = formatToString(value).toUpperCase();

  };

  return upperCaseValue;

};


export const formatTrim = (value) => {

  let trimValue = "";

  if (isEmpty(value) === false) {

    trimValue = formatToString(value).trim();

  };

  return trimValue;

};


export const formatToString = (value) => {

  let toStringValue = "";

  if (isEmpty(value) === false) {

    toStringValue = value.toString();

  };

  return toStringValue;

};


export const formatInt = (value) => {

  let formatedInt = "";

  if (isEmpty(value) === false) {

    formatedInt = parseInt(formatTrim(value.replaceAll(",", ""))).toLocaleString();

  };

  return formatedInt;

};


export const formatFloat = (value) => {

  let formatedFloat = "";

  if (isEmpty(value) === false) {

    formatedFloat = parseFloat(formatTrim(value.replaceAll(",", ""))).toLocaleString();

  };

  return formatedFloat;

};


export const formatSearchInput = (value) => {

  let formatedSearchInput = "";

  if (isEmpty(value) === false) {

    formatedSearchInput = formatTrim(value).toLowerCase();

  };

  return formatedSearchInput;

};


export const removeHTML = (text) => {

  // * https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/ -- 02/08/2022

  let displayText = "";

  if (isEmpty(text) === false) {

    displayText = text.replace(/(<([^>]+)>)/ig, "");

  };

  return displayText;

};


export const removeNonAlphanumericCharacters = (text) => {

  // * Removes all characters that aren't letters, numbers, spaces or a period. -- 05/12/2022

  let formatedText = "";

  if (isEmpty(text) === false) {

    formatedText = text.replace(/[^a-zA-Z0-9\. ]/g, "");

  };

  return formatedText;

};


export const replaceSmartCharacters = (jsonData) => {

  let newJSON = jsonData;

  if (isEmpty(newJSON) === false) {

    newJSON = newJSON.replaceAll("’", "'");

    // newJSON = newJSON.replaceAll("–", "--");
    newJSON = newJSON.replaceAll("–", "-");

    newJSON = newJSON.replaceAll(" ", " ");

    newJSON = newJSON.replaceAll("“", "\"");
    newJSON = newJSON.replaceAll("”", "\"");

  };

  return newJSON;

};


export const getQueryStringData = () => {

  let queryStringData = {};

  // * Retreive the queryString values if there are any. -- 01/22/2023
  if (typeof window !== "undefined") {

    let queryStrings = new URLSearchParams(window.location.search);

    queryStringData.parametersURL = queryStrings.toString();

    // * From https://medium.com/swlh/urlsearchparams-in-javascript-df524f705317 -- 01/22/2023
    queryStrings.forEach(function (value, key) {

      // console.log(componentName, getDateTime(), "key", key);
      // console.log(componentName, getDateTime(), "value", value);

      queryStringData[key] = value;

    });

  };

  return queryStringData;

};


export const addLog = (baseURL, fetchAuthorization, databaseAvailable, allowLogging, logObject) => {

  let logResult = "Add log not attempted due to parameter values.";

  if (allowLogging === true && databaseAvailable !== false) {

    let operationValue = "Add Log";

    let url = `${baseURL}logs/`;
    let response = "";
    let data = "";

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json", "Authorization": fetchAuthorization
      }),
      body: JSON.stringify({ recordObject: logObject })
    })
      .then(results => {

        response = results;

        if (response.ok !== true) {

          addErrorLog(baseURL, databaseAvailable, { operation: `${operationValue} SQL Server`, componentName: componentName, transactionData: { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, data: data, logObject: logObject }, errorData: { message: `${response.status} ${response.statusText} ${response.url}` }, dateEntered: getDateTime() });

          // throw Error(`${response.status} ${response.statusText} ${response.url}`);

          logResult = `${operationValue}: ${response.status} ${response.statusText} ${response.url}`;

        } else {

          if (response.status === 200) {

            return response.json();

          } else {

            return response.status;

          };

        };

      })
      .then(results => {

        data = results;

        logResult = data;

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "addLog error", error);
        // console.error(componentName, getDateTime(), "addLog error.name", error.name);
        // console.error(componentName, getDateTime(), "addLog error.message", error.message);
        // console.error(componentName, getDateTime(), "addLog error.stack", error.stack);

        // // dispatch(addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`));
        // dispatch(addErrorMessage(`${operationValue}: ${convertSpecialCharacters(error.name)}: ${convertSpecialCharacters(error.message)}`));

        addErrorLog(baseURL, databaseAvailable, { operation: operationValue, componentName: componentName, transactionData: { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, data: data, logObject: logObject }, errorData: { name: error.name, message: error.message, stack: error.stack }, dateEntered: getDateTime() });

        logResult = `${operationValue}: ${convertSpecialCharacters(error.name)}: ${convertSpecialCharacters(error.message)}`;

      });

  };

  return logResult;

};


export const addErrorLog = (baseURL, fetchAuthorization, databaseAvailable, allowLogging, errorObject) => {

  let logErrorResult = "Add error log not attempted due to parameter values.";

  if (allowLogging === true && databaseAvailable !== false) {

    let operationValue = "Add Error Log";

    let url = `${baseURL}errorLogs/`;
    let response = "";
    let data = "";

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json", "Authorization": fetchAuthorization
      }),
      body: JSON.stringify({ recordObject: errorObject })
    })
      .then(results => {

        response = results;

        if (response.ok !== true) {

          // throw Error(`${response.status} ${response.statusText} ${response.url}`);

          logErrorResult = `${operationValue}: ${response.status} ${response.statusText} ${response.url}`;

        } else {

          if (response.status === 200) {

            return response.json();

          } else {

            return response.status;

          };

        };

      })
      .then(results => {

        data = results;

        logErrorResult = data;

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "addErrorLog error", error);
        // console.error(componentName, getDateTime(), "addErrorLog error.name", error.name);
        // console.error(componentName, getDateTime(), "addErrorLog error.message", error.message);

        // // dispatch(addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`));
        // dispatch(addErrorMessage(`${operationValue}: ${convertSpecialCharacters(error.name)}: ${convertSpecialCharacters(error.message)}`));

        logErrorResult = `${operationValue}: ${convertSpecialCharacters(error.name)}: ${convertSpecialCharacters(error.message)}`;

      });

  };

  return logErrorResult;

};


export const addComputerLog = (computerLogOne, computerLogTwo) => {

  let computerLog = { ...computerLogOne };

  if (typeof computerLogItem === "object") {

    // * From https://geolocation-db.com/json/ -- 09/27/2021
    if (isEmpty(computerLogTwo.country_code) === false) {

      computerLog.countryCode = computerLogTwo.country_code;

    };

    if (isEmpty(computerLogTwo.country_name) === false) {

      computerLog.countryName = computerLogTwo.country_name;

    };

    if (isEmpty(computerLogTwo.city) === false) {

      computerLog.city = computerLogTwo.city;

    };

    if (isEmpty(computerLogTwo.postal) === false) {

      computerLog.postal = computerLogTwo.postal;

    };

    if (isEmpty(computerLogTwo.latitude) === false) {

      computerLog.latitude = computerLogTwo.latitude;

    };

    if (isEmpty(computerLogTwo.longitude) === false) {

      computerLog.longitude = computerLogTwo.longitude;

    };

    if (isEmpty(computerLogTwo.IPv4) === false) {

      computerLog.ipAddress = computerLogTwo.IPv4;

    };

    if (isEmpty(computerLogTwo.state) === false) {

      computerLog.state = computerLogTwo.state;

    };

    // * From https://api.db-ip.com/v2/free/self -- 09/27/2021
    if (isEmpty(computerLogTwo.ipAddress) === false) {

      computerLog.ipAddress = computerLogTwo.ipAddress;

    };

    if (isEmpty(computerLogTwo.continentCode) === false) {

      computerLog.continentCode = computerLogTwo.continentCode;

    };

    if (isEmpty(computerLogTwo.continentName) === false) {

      computerLog.continentName = computerLogTwo.continentName;

    };

    if (isEmpty(computerLogTwo.countryCode) === false) {

      computerLog.countryCode = computerLogTwo.countryCode;

    };

    if (isEmpty(computerLogTwo.countryName) === false) {

      computerLog.countryName = computerLogTwo.countryName;

    };

    if (isEmpty(computerLogTwo.stateProvCode) === false) {

      computerLog.stateProvCode = computerLogTwo.stateProvCode;

    };

    if (isEmpty(computerLogTwo.stateProv) === false) {

      computerLog.state = computerLogTwo.state;

    };

    if (isEmpty(computerLogTwo.city) === false) {

      computerLog.city = computerLogTwo.city;

    };

  };

  return computerLog;

};


export const parse = (value) => {

  // * The parseHTML function from the npm package html-react-parser doesn't provide error handling if the value sent to it isn't a string. -- 03/09/2023

  let newValue = value;

  if (isEmpty(value) === false) {

    newValue = parseHTML(value);

  };

  return newValue;

};


export const displayTime = (dateToDisplay, removeLeadingZeroes) => {

  let newDisplayTime = "";

  if (isEmpty(dateToDisplay) === false) {

    // * Time
    let time = formatToString(dateToDisplay).substring(11, 16);

    newDisplayTime = time;

    if (isEmpty(newDisplayTime) === false && removeLeadingZeroes === true) {

      newDisplayTime = newDisplayTime.replace(/\b0/g, "");

    };

  };

  return newDisplayTime;

};


export const convertMilitaryTimeToStandardTime = (timeEntered) => {

  // * https://stackoverflow.com/questions/29206453/best-way-to-convert-military-time-to-standard-time-in-javascript. -- 09/18/2023

  // * timeEntered must be a string in HH:MM format. -- 09/18/2023

  let newTime = timeEntered;

  let hours = "";
  let minutes = "";
  let modifier = "";

  // * Split the time by : and " " -- 11/27/2023
  newTime = newTime.split(/[\s: ]+/);

  if (isEmpty(newTime[0]) === false) {

    hours = Number(newTime[0]);

  };

  if (isEmpty(newTime[1]) === false) {

    minutes = Number(newTime[1]);

  };

  if (isEmpty(newTime[2]) === false) {

    modifier = Number(newTime[2]);

  };

  let standardTime = "";

  if (hours > 0 && hours <= 12) {

    standardTime = "" + hours;

  } else if (hours > 12) {

    standardTime = "" + (hours - 12);

  } else if (hours == 0) {

    standardTime = "12";

  };

  if (hours >= 12) {

    modifier = " PM";

  } else {

    modifier = " AM";

  };

  standardTime += (minutes < 10) ? ":0" + minutes + modifier : ":" + minutes + modifier;

  return standardTime;

};


export const convertStandardTimeToMilitaryTime = (timeEntered) => {

  // * https://www.tutorialspoint.com/converting-12-hour-format-time-to-24-hour-format-in-javascript. -- 11/27/2023

  // * timeEntered must be a string in HH:MM AM/PM format. -- 09/18/2023

  let newTime = timeEntered;

  let hours = "";
  let minutes = "";
  let modifier = "";

  // * Split the time by : and " " -- 11/27/2023
  newTime = newTime.split(/[\s: ]+/);

  if (isEmpty(newTime[0]) === false) {

    hours = Number(newTime[0]);
    hours = (hours < 10) ? "0" + hours : hours;

  };

  if (isEmpty(newTime[1]) === false) {

    minutes = Number(newTime[1]);
    minutes = (minutes < 30) ? "0" + minutes : minutes;

  };

  if (isEmpty(newTime[2]) === false) {

    modifier = newTime[2];

  };

  if (hours === '12') {

    hours = '00';

  };

  if (modifier === 'PM') {

    // * 10 indicates that the string is in base 10 (decimal notation). -- 11/27/2023
    // * + 12 converts the 12-hour format to a 24-hour format. -- 11/27/2023
    hours = parseInt(hours, 10) + 12;

  };

  return `${hours}:${minutes}`;

};


export const getNumberOfDaysBetweenDates = (startDate, endDate) => {

  // * https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/ -- 09/12/2023
  // * https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates/2627493#2627493 -- 09/12/2023

  let newStartDate = new Date(startDate);
  let newEndDate = new Date(endDate);
  let numberOfDays = 1;

  // * The function getTime() converts days to milliseconds to subtract the two dates. -- 08/31/2023  
  // * The equation (1000 * 60 * 60 * 24) turns the values back into a day count. -- 08/31/2023  
  // * The operation + 1 adds one day to account for 08/31/2023 - 08/31/2023 = 0 but should equal 1 day in order to account for running studentsPerDay amount of students that day. -- 08/31/2023  
  numberOfDays = ((newEndDate.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return numberOfDays;

};


export const convertTimeToMinutes = (timeEntered) => {

  // * https://stackoverflow.com/questions/32885682/convert-hhmmss-into-minute-using-javascript -- 11/27/2023
  // * timeEntered must be a string in HH:MM format. -- 09/18/2023

  let newTime = timeEntered.split(':');

  let minutes = (+newTime[0]) * 60 + (+newTime[1]);

  return minutes;

};


export const generateHoursInterval = (startHourInMinutes, endHourInMinutes, interval) => {

  // * https://gist.github.com/indexzero/6261ad9292c78cf3c5aa69265e2422bf?permalink_comment_id=4003346#gistcomment-4003346 -- 11/20/2023

  let timesArray = [];

  if (isEmpty(startHourInMinutes) === false && isWholeNumber(startHourInMinutes) === true) {

    for (let i = 0; startHourInMinutes < 24 * 60; i++) {

      if (startHourInMinutes > endHourInMinutes) {

        break;

      } else {

        // * Get hours of day in 0-24 format. -- 11/20/2023
        let hh = Math.floor(startHourInMinutes / 60);

        // * Get minutes of the hour in 0-55 format. -- 11/20/2023
        let mm = startHourInMinutes % 60;

        timesArray[i] = { timeId: i, time: convertMilitaryTimeToStandardTime(("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2)) };

        startHourInMinutes = startHourInMinutes + interval;

      };

    };

  };

  return timesArray;

};