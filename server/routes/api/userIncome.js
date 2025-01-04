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


// * get all user_income -- 09/25/2023 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM user_income")
    .then((results) => {
      console.log("get user_income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get user_income: error", error);
        response.status(500).send(error);
      };
    });

});


// * get all incomes from a user by id -- 09/25/2023 JH
router.get("/:userId", (request, response) => {

  pool.query("SELECT * FROM user_income WHERE user_id = $1", [request.params.userId])
    .then((results) => {
      console.log("get incomes by user_id: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get incomes by user_id: error", error);
        response.status(500).send(error);
      };
    });

});


// * get a user_income by both ids -- 09/25/2023 JH
router.get("/:userId/:incomeId", (request, response) => {

  pool.query(
    "SELECT * FROM user_income WHERE user_id = $1 AND income_id = $2",
    [request.params.userId, request.params.incomeId]
  )
    .then((results) => {
      console.log("get a user_income by both ids: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get a user_income by both ids: error", error);
        response.status(500).send(error);
      };
    });

});


// * add an income to a user -- 09/25/2023 JH
router.post("/add", (request, response) => {

  let createdOnTimestamp = new Date();

  pool.query(
    "INSERT INTO user_income (user_id, income_id, created_on, active) VALUES ($1, $2, $3, $4)",
    [request.body.userId, request.body.incomeId, createdOnTimestamp, true]
  )
    .then((results) => {
      console.log("add income to user: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("add income to user: error", error);
        response.status(500).send(error);
      };
    });

});


// * hard delete an income from user -- 09/25/2023 JH
router.delete("/delete/:userId/:incomeId", (request, response) => {

  pool.query(
    "DELETE FROM user_income WHERE user_id = $1 AND income_id = $2",
    [request.params.userId, request.params.incomeId]
  )
    .then((results) => {
      console.log("delete income from user: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("delete income from user: error", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;