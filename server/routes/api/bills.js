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


// * get all bills -- 09/04/2024 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM bills ORDER BY id ASC")
    .then((results) => {
      console.log("get bills: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.log("get bills: error", error);
        response.status(500).send(error);
      };
    });

});


// * get a bill by id -- 09/04/2024 JH
router.get("/:billID", (request, response) => {

  pool.query("SELECT * FROM bills WHERE bill_id = $1", [request.params.billID])
    .then((results) => {
      console.log("get bill: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("get bill: error", error);
        response.status(500).send(error);
      };
    });

});


// * create a bill -- 09/04/2024 JH
router.post("/add", (request, response) => {

  pool.query(
    "INSERT INTO bills (bill_name, bill_amount, bill_date, created_on, active) VALUES ($1, $2, $3, $4, $5)",
    [request.body.billName, request.body.billAmount, request.body.billDate, new Date(), true]
  )
    .then((results) => {
      console.log("add bill: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("add bill: error", error);
        response.status(500).send(error);
      };
    });

});


// * update a bill by id -- 09/04/2024 JH
router.put("/update/:billID", (request, response) => {

  pool.query(
    "UPDATE bills SET bill_name = $1, bill_amount = $2, bill_date = $3, updated_on = $4 WHERE bill_id = $5",
    [request.body.billName, request.body.billAmount, request.body.billDate, new Date(), request.params.billID]
  )
    .then((results) => {
      console.log("update bill: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("update bill: error", error);
        response.status(500).send(error);
      };
    });

});


// * soft delete a bill by id -- 09/04/2024 JH
router.put("/softDelete/:billID", (request, response) => {

  pool.query(
    "UPDATE bills SET active = false, updated_on = $1 WHERE bill_id = $2",
    [new Date(), request.params.billID]
  )
    .then((results) => {
      console.log("soft delete bill: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("soft delete bill: error", error);
        response.status(500).send(error);
      };
    });

});


// * hard delete a bill by id -- 09/04/2024 JH
router.delete("/delete/:billID", (request, response) => {

  pool.query("DELETE FROM bills WHERE bill_id = $1", [request.params.billID])
    .then((results) => {
      console.log("delete bill: results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("delete bill: error", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;