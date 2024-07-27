"use strict";

module.exports = (request, response, next) => {

  response.header("access-control-allow-origin", "*");
  response.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
  response.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();

};