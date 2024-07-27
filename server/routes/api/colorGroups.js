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


// * get all color_groups -- 12/09/2022 JH
router.get("/", (request, response) => {

  pool.query("SELECT * FROM color_groups ORDER BY id ASC")
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


// * get a color_group by id -- 12/09/2022 JH
router.get("/:colorGroupID", (request, response) => {

  pool.query("SELECT * FROM color_groups WHERE color_group_id = $1", [request.params.colorGroupID])
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


// * create a color_group -- 12/09/2022 JH
router.post("/add", (request, response) => {

  let newTimestamp = new Date();

  pool.query("INSERT INTO color_groups (color_group_name, created_on, active) VALUES ($1, $2, $3, $4)", [request.body.colorGroupName, newTimestamp, true])
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


// * update a color_group by id -- 12/09/2022 JH
router.put("/update/:colorGroupID", (request, response) => {

  let newTimestamp = new Date();

  pool.query("UPDATE color_groups SET color_group_name = $1, updated_on = $2 WHERE color_group_id = $3", [request.body.colorGroupName, newTimestamp, request.params.colorGroupID])
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


// * soft delete a color_group by id
router.put("/softDelete/:colorGroupID", (request, response) => {

  pool.query("UPDATE color_groups SET active = false WHERE color_group_id = $1", [request.params.colorGroupID])
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


// * hard delete a color_group by id -- 12/09/2022 JH
router.delete("/delete/:colorGroupID", (request, response) => {

  pool.query('DELETE FROM color_groups WHERE color_group_id = $1', [request.params.colorGroupID])
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