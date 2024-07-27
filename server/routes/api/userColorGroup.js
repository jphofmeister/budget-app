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


// * get all user_color_groups -- 09/25/2023 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM user_color_group")
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

  pool.query("SELECT * FROM user_color_group WHERE user_id = $1", [userIDQuery])
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


// * get a user_color_group by id -- 09/25/2023 JH
router.get("/:userID/:colorGroupID", (request, response) => {

  let userIDQuery = request.params.userID;
  let colorGroupIDQuery = request.params.colorGroupID;

  pool.query("SELECT * FROM user_color_group WHERE user_id = $1 AND color_group_id = $2", [userIDQuery, colorGroupIDQuery])
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

  pool.query("INSERT INTO user_color_group (user_id, color_group_id) VALUES ($1, $2)", [request.body.userID, request.body.colorGroupID])
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
router.delete("/delete/:userID/:colorGroupID", (request, response) => {

  let userIDQuery = request.params.userID;
  let colorGroupIDQuery = request.params.colorGroupID;

  pool.query('DELETE FROM user_color_group WHERE user_id = $1 AND color_group_id = $2', [userIDQuery, colorGroupIDQuery])
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