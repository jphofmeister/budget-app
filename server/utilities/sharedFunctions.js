"use strict";


const isEmpty = (value) => {

  // * https://stackoverflow.com/questions/4597900/checking-something-isempty-in-javascript
  // * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in

  return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

};


const getDateTime = () => {

  // * Time returned does not consider the time zone without adjustments.
  // * https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes

  // * https://stackoverflow.com/questions/12413243/javascript-date-format-like-iso-but-local
  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  return new Date(new Date() - timezoneOffset).toISOString().slice(0, 19).replace("T", " ");

};


const isNonEmptyArray = (arrayItem) => {

  let nonEmptyArray = false;

  if (Array.isArray(arrayItem) === true && arrayItem.length > 0) {

    nonEmptyArray = true;

  };

  return nonEmptyArray;

};


const formatLowerCase = (value) => {

  let lowerCaseValue = value;

  if (isEmpty(value) === false) {

    lowerCaseValue = value.toString().toLowerCase();

  };

  return lowerCaseValue;

};


const formatUpperCase = (value) => {

  let upperCaseValue = value;

  if (isEmpty(value) === false) {

    upperCaseValue = value.toString().toUpperCase();

  };

  return upperCaseValue;

};


const formatTrim = (value) => {

  let trimValue = value;

  if (isEmpty(value) === false) {

    trimValue = value.toString().trim();

  };

  return trimValue;

};


const formatToString = (value) => {

  let toStringValue = value;

  if (isEmpty(value) === false) {

    toStringValue = value.toString();

  };

  return toStringValue;

};


const formatSearchInput = (value) => {

  let formatedSearchInput = value;

  if (isEmpty(value) === false) {

    formatedSearchInput = formatTrim(value).toLowerCase();

  };

  return formatedSearchInput;

};


exports.isEmpty = isEmpty;
exports.isNonEmptyArray = isNonEmptyArray;
exports.getDateTime = getDateTime;
exports.formatLowerCase = formatLowerCase;
exports.formatUpperCase = formatUpperCase;
exports.formatTrim = formatTrim;
exports.formatToString = formatToString;
exports.formatSearchInput = formatSearchInput;
