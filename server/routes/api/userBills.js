const express = require("express");
const router = express.Router();

const dbUsername = require("../../config/keys").dbUsername;
const dbPassword = require("../../config/keys").dbPassword;

const { Pool } = require("pg");
const pool = new Pool({
  user: dbUsername,
  host: "localhost",
  database: "budget-calendar",
  password: dbPassword,
  port: 5432
});


// * get all user_bills -- 09/25/2023 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM user_bills")
    .then((results) => {
      console.log("get user_bills: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get user_bills: error", error);
        response.status(500).send(error);
      };
    });

});


// * get all bills from a user by id -- 09/25/2023 JH
router.get("/:userID", (request, response) => {

  pool.query("SELECT * FROM user_bills WHERE user_id = $1", [request.params.userID])
    .then((results) => {
      console.log("get bills by user_id: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get bills by user_id: error", error);
        response.status(500).send(error);
      };
    });

});


// * get a user_bill by both ids -- 09/25/2023 JH
router.get("/:userID/:billID", (request, response) => {

  pool.query(
    "SELECT * FROM user_bills WHERE user_id = $1 AND bill_id = $2",
    [request.params.userID, request.params.billID]
  )
    .then((results) => {
      console.log("get a user_bill by both ids: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get a user_bill by both ids: error", error);
        response.status(500).send(error);
      };
    });

});


// * add a bill to a user -- 09/25/2023 JH
router.post("/add", (request, response) => {

  let createdOnTimestamp = new Date();

  pool.query(
    "INSERT INTO user_bills (user_id, bill_id, created_on, active) VALUES ($1, $2, $3, $4)",
    [request.body.userID, request.body.billID, createdOnTimestamp, true]
  )
    .then((results) => {
      console.log("add bill to user: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("add bill to user: error", error);
        response.status(500).send(error);
      };
    });

});


// * hard delete a bill from user -- 09/25/2023 JH
router.delete("/delete/:userID/:billID", (request, response) => {

  pool.query(
    "DELETE FROM user_bills WHERE user_id = $1 AND bill_id = $2",
    [request.params.userID, request.params.billID]
  )
    .then((results) => {
      console.log("delete bill from user: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("delete bill from user: error", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;