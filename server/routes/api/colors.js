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


// * get all colors -- 12/09/2022 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM colors ORDER BY id ASC")
    .then((results) => {
      console.log("results.rows", results.rows);
      response.json(results.rows);
    })
    .catch((error) => {
      if (error) {
        console.log("error", error);
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});


// * get a color by id -- 12/09/2022 JH
router.get("/:colorID", (request, response) => {

  pool.query("SELECT * FROM colors WHERE color_id = $1", [request.params.colorID])
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


// * create a color -- 12/09/2022 JH
router.post("/add", (request, response) => {

  let newTimestamp = new Date();

  pool.query("INSERT INTO colors (color_name, hex_code, created_on, active) VALUES ($1, $2, $3, $4)", [request.body.colorName, request.body.hexCode, newTimestamp, true])
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


// * update a color by id -- 12/09/2022 JH
router.put("/update/:colorID", (request, response) => {

  let newTimestamp = new Date();

  pool.query("UPDATE colors SET color_name = $1, hex_code = $2, updated_on = $3 WHERE color_id = $4", [request.body.colorName, request.body.hexCode, newTimestamp, request.params.colorID])
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


// * soft delete a color by id
router.put("/softDelete/:colorID", (request, response) => {

  pool.query("UPDATE colors SET active = false WHERE color_id = $1", [request.params.colorID])
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


// * hard delete a color by id -- 12/09/2022 JH
router.delete("/delete/:colorID", (request, response) => {

  pool.query('DELETE FROM colors WHERE color_id = $1', [request.params.colorID])
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