const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtTokens } = require('../../utilities/jwtHelpers.js');
const { authenticateToken } = require('../../middleware/authorization.js');

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


// * GET api/users
// * get all users -- 12/09/2022 JH
router.get("/", /*authenticateToken,*/(request, response) => {

  pool.query("SELECT * FROM users ORDER BY user_id ASC")
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


// // * GET api/users/:userID
// // * get a user by id -- 12/09/2022 JH
// router.get("/:userID", (request, response) => {

//   pool.query("SELECT * FROM users WHERE user_id = $1", [request.params.userID])
//     .then((results) => {
//       console.log("results.rows", results.rows);
//       response.json(results.rows);
//     })
//     .catch((error) => {
//       if (error) {
//         console.error("Here is an error!", error);
//         response.status(500).send(error);
//       };
//     });

// });


// * POST api/users/add
// * create a user -- 12/09/2022 JH
router.post("/add", (request, response) => {

  let newTimestamp = new Date();

  bcrypt.hash(request.body.userPassword, 10)
    .then((hashedPassword) => {
      pool.query("INSERT INTO users (user_name, user_password, created_on, active) VALUES ($1, $2, $3, $4) RETURNING *", [request.body.userName, hashedPassword, newTimestamp, true])
        .then((results) => {
          console.log("results", results);
          response.json(jwtTokens(results.rows[0]));
        })
        .catch((error) => {
          if (error) {
            console.error("Here is an error on pool.query catch:", error);
            response.status(500).send(error);
          };
        });
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error on bcrypt.hash catch:", error);
        response.status(500).send(error);
      };
    });

});


// * update a user by id -- 12/09/2022 JH
router.put("/update/:userID", (request, response) => {

  let newTimestamp = new Date();

  pool.query("UPDATE users SET user_name = $1, user_password = $2, updated_on = $3 WHERE user_id = $4 RETURNING *", [request.body.userName, request.body.userPassword, newTimestamp, request.params.userID])
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


// * soft delete a user by id
router.put("/softDelete/:userID", (request, response) => {

  pool.query("UPDATE users SET active = false WHERE user_id = $1 RETURNING *", [request.params.userID])
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


// * hard delete a user by id -- 12/09/2022 JH
router.delete("/delete/:userID", (request, response) => {

  pool.query('DELETE FROM users WHERE user_id = $1', [request.params.userID])
    .then((results) => {
      response.json({ message: "deleted user successfully" });
    })
    .catch((error) => {
      if (error) {
        console.error("Here is an error!", error);
        response.status(500).send(error);
      };
    });

});

module.exports = router;