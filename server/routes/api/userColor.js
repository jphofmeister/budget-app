const express = require("express");
const router = express.Router();

const dbUsername = require("../../config/keys").dbUsername;
const dbPassword = require("../../config/keys").dbPassword;

const { Pool } = require("pg");
const pool = new Pool({
  user: dbUsername,
  host: "localhost",
  database: "color-picker",
  password: dbPassword,
  port: 5432
});


// * get all user_colors -- 09/25/2023 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM user_color")
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * get all items from a group by id -- 09/25/2023 JH
router.get("/:userID", (request, response) => {

  let userIDQuery = request.params.userID;

  pool.query("SELECT * FROM user_color WHERE user_id = $1", [userIDQuery])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * get a user_color by id -- 09/25/2023 JH
router.get("/:userID/:colorID", (request, response) => {

  let userIDQuery = request.params.userID;
  let colorIDQuery = request.params.colorID;

  pool.query("SELECT * FROM user_color WHERE user_id = $1 AND color_id = $2", [userIDQuery, colorIDQuery])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * add a color to colorGroup -- 09/25/2023 JH
router.post("/add", (request, response) => {

  // let newTimestamp = new Date();

  pool.query("INSERT INTO user_color (user_id, color_id) VALUES ($1, $2)", [request.body.userID, request.body.colorID])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("request.body", request.body);
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * hard delete a color from colorGroup -- 09/25/2023 JH
router.delete("/delete/:userID/:colorID", (request, response) => {

  let userIDQuery = request.params.userID;
  let colorIDQuery = request.params.colorID;

  pool.query('DELETE FROM user_color WHERE user_id = $1 AND color_id = $2', [userIDQuery, colorIDQuery])
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;