const express = require("express");
const router = express.Router();
const { isEmpty, isNonEmptyArray } = require("../../utilities/sharedFunctions");

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

  pool.query("SELECT * FROM bills ORDER BY bill_id ASC")
    .then((results) => {

      if (isNonEmptyArray(results.rows) === true) {

        response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully retreived records.", records: results.rows });

      } else {

        response.status(200).json({ transactionSuccess: false, errorOccurred: false, message: "No records found." });

      };

    })
    .catch((error) => {

      console.error("get / error", error);

      response.status(500).json({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * get all bills from user -- 09/04/2024 JH
router.get("/:userId", (request, response) => {

  pool.query("SELECT * FROM bills WHERE user_id = $1", [request.params.userId])
    .then((results) => {

      if (isNonEmptyArray(results.rows) === true) {

        response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully retreived records.", records: results.rows });

      } else {

        response.status(200).json({ transactionSuccess: false, errorOccurred: false, message: "No records found." });

      };

    })
    .catch((error) => {

      console.error("get /:userId error", error);

      response.status(500).json({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * get a bill by id -- 09/04/2024 JH
router.get("/:billId", (request, response) => {

  pool.query("SELECT * FROM bills WHERE bill_id = $1", [request.params.billId])
    .then((results) => {

      if (isNonEmptyArray(results.rows) === true) {

        response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully retreived records.", records: results.rows });

      } else {

        response.status(200).json({ transactionSuccess: false, errorOccurred: false, message: "No records found." });

      };

    })
    .catch((error) => {

      console.error("get /:billId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * create a bill -- 09/04/2024 JH
router.post("/add", (request, response) => {

  let { billName, billAmount, billUrl, billDescription, frequencyInterval, frequencyType, frequencyDay, frequencyStartDate, userId } = request.body;

  pool.query(
    "INSERT INTO bills (bill_name, bill_amount, bill_url, bill_description, frequency_interval, frequency_type, frequency_day, frequency_start_date, created_on, active, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    [billName, billAmount, billUrl, billDescription, frequencyInterval, frequencyType, frequencyDay, frequencyStartDate, new Date(), true, userId]
  )
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully added bill." });

    })
    .catch((error) => {

      console.error("post /add error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * update a bill by id -- 09/04/2024 JH
router.put("/update/:billId/:userId", (request, response) => {

  let { billName, billAmount, billUrl, billDescription, frequencyInterval, frequencyType, frequencyDay, frequencyStartDate } = request.body;

  let { billId, userId } = request.params;

  pool.query(
    "UPDATE bills SET bill_name = $1, bill_amount = $2, bill_url = $3, bill_description = $4, frequency_interval = $5, frequency_type = $6, frequency_day = $7, frequency_start_date = $8, updated_on = $9 WHERE bill_id = $10 AND user_id = $11",
    [billName, billAmount, billUrl, billDescription, frequencyInterval, frequencyType, frequencyDay, frequencyStartDate, new Date(), billId, userId]
  )
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully updated bill." });

    })
    .catch((error) => {

      console.error("put /update/:billId/:userId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * soft delete a bill by id -- 09/04/2024 JH
router.put("/softDelete/:billId/:userId", (request, response) => {

  let { billId, userId } = request.params;

  pool.query(
    "UPDATE bills SET active = false, updated_on = $1 WHERE bill_id = $2 AND user_id = $3",
    [new Date(), billId, userId]
  )
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully deleted bill." });

    })
    .catch((error) => {

      console.error("put /softDelete/:billId/:userId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * hard delete a bill by id -- 09/04/2024 JH
router.delete("/delete/:billId/:userId", (request, response) => {

  let { billId, userId } = request.params;

  pool.query("DELETE FROM bills WHERE bill_id = $1 AND user_id = $2", [billId, userId])
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully deleted bill." });

    })
    .catch((error) => {

      console.error("delete /delete/:billId/:userId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});

module.exports = router;