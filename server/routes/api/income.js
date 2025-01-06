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


// * get all income from user -- 09/04/2024 JH
router.get("/:userId", (request, response) => {

  pool.query("SELECT * FROM income WHERE user_id = $1", [request.params.userId])
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


// * get an income by id -- 09/04/2024 JH
router.get("/:incomeId", (request, response) => {

  pool.query("SELECT * FROM income WHERE income_id = $1", [request.params.incomeId])
    .then((results) => {

      if (isNonEmptyArray(results.rows) === true) {

        response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully retreived records.", records: results.rows });

      } else {

        response.status(200).json({ transactionSuccess: false, errorOccurred: false, message: "No records found." });

      };

    })
    .catch((error) => {

      console.error("get /:incomeId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * create an income -- 09/04/2024 JH
router.post("/add", (request, response) => {

  let { incomeName, incomeAmount, userId } = request.body;

  pool.query(
    "INSERT INTO income (income_name, income_amount, created_on, active, user_id) VALUES ($1, $2, $3, $4, $5)",
    [incomeName, incomeAmount, new Date(), true, userId]
  )
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully added income." });

    })
    .catch((error) => {

      console.error("post /add error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * update an income by id -- 09/04/2024 JH
router.put("/update/:incomeId/:userId", (request, response) => {

  let { incomeName, incomeAmount } = request.body;

  let { incomeId, userId } = request.params;

  pool.query(
    "UPDATE income SET income_name = $1, income_amount = $2, updated_on = $3 WHERE income_id = $4 AND user_id = $5",
    [incomeName, incomeAmount, new Date(), incomeId, userId]
  )
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully updated income." });

    })
    .catch((error) => {

      console.error("put /update/:incomeId/:userId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * soft delete an income by id -- 09/04/2024 JH
router.put("/softDelete/:incomeId/:userId", (request, response) => {

  let { incomeId, userId } = request.params;

  pool.query(
    "UPDATE income SET active = false, updated_on = $1 WHERE income_id = $2 AND user_id = $3",
    [new Date(), incomeId, userId]
  )
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully deleted income." });

    })
    .catch((error) => {

      console.error("put /softDelete/:incomeId/:userId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});


// * hard delete an income by id -- 09/04/2024 JH
router.delete("/delete/:incomeId", (request, response) => {

  let { incomeId, userId } = request.params;

  pool.query("DELETE FROM income WHERE income_id = $1 AND user_id = $3", [incomeId, userId])
    .then((results) => {

      response.status(200).json({ transactionSuccess: true, errorOccurred: false, message: "Successfully deleted income." });

    })
    .catch((error) => {

      console.error("delete /delete/:incomeId/:userId error", error);

      response.status(500).send({ transactionSuccess: false, errorOccurred: true, message: "No records found." });

    });

});

module.exports = router;