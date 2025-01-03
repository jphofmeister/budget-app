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


// * get all income -- 09/04/2024 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM income ORDER BY income_id ASC")
    .then((results) => {
      console.log("get all income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.log("get all income: error", error);
        response.status(500).send(error);
      };
    });

});


// * get an income by id -- 09/04/2024 JH
router.get("/:incomeID", (request, response) => {

  pool.query("SELECT * FROM income WHERE income_id = $1", [request.params.incomeID])
    .then((results) => {
      console.log("get income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get income: error", error);
        response.status(500).send(error);
      };
    });

});


// * create an income -- 09/04/2024 JH
router.post("/add", (request, response) => {

  pool.query(
    "INSERT INTO income (income_name, income_amount, created_on, active) VALUES ($1, $2, $3, $4)",
    [request.body.incomeName, request.body.incomeAmount, new Date(), true]
  )
    .then((results) => {
      console.log("add income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("add income: error", error);
        response.status(500).send(error);
      };
    });

});


// * update an income by id -- 09/04/2024 JH
router.put("/update/:incomeID", (request, response) => {

  pool.query(
    "UPDATE income SET income_name = $1, income_amount = $2, updated_on = $3 WHERE income_id = $4",
    [request.body.incomeName, request.body.incomeAmount, new Date(), request.params.incomeID]
  )
    .then((results) => {
      console.log("updated income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("updated income: error", error);
        response.status(500).send(error);
      };
    });

});


// * soft delete an income by id -- 09/04/2024 JH
router.put("/softDelete/:incomeID", (request, response) => {

  pool.query(
    "UPDATE income SET active = false, updated_on = $1 WHERE income_id = $2",
    [new Date(), request.params.incomeID]
  )
    .then((results) => {
      console.log("soft delete income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("soft delete income: error", error);
        response.status(500).send(error);
      };
    });

});


// * hard delete an income by id -- 09/04/2024 JH
router.delete("/delete/:incomeID", (request, response) => {

  pool.query("DELETE FROM income WHERE income_id = $1", [request.params.incomeID])
    .then((results) => {
      console.log("delete income: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("delete income: error", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;