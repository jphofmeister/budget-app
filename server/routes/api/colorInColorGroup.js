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


// * get all color_in_color_groups -- 09/25/2023 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM color_in_color_group")
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
router.get("/:colorGroupID", (request, response) => {

  let colorGroupIDQuery = request.params.colorGroupID;

  pool.query("SELECT * FROM color_in_color_group WHERE color_group_id = $1", [colorGroupIDQuery])
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


// * get a color_in_color_group by id -- 09/25/2023 JH
router.get("/:colorGroupID/:colorID", (request, response) => {

  let colorGroupIDQuery = request.params.colorGroupID;
  let colorIDQuery = request.params.colorID;

  pool.query("SELECT * FROM color_in_color_group WHERE color_group_id = $1 AND color_id = $2", [colorGroupIDQuery, colorIDQuery])
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

  pool.query("INSERT INTO color_in_color_group (color_group_id, color_id) VALUES ($1, $2)", [request.body.colorGroupID, request.body.colorID])
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
router.delete("/delete/:colorGroupID/:colorID", (request, response) => {

  let colorGroupIDQuery = request.params.colorGroupID;
  let colorIDQuery = request.params.colorID;

  pool.query('DELETE FROM color_in_color_group WHERE color_group_id = $1 AND color_id = $2', [colorGroupIDQuery, colorIDQuery])
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