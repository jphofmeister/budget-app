const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtTokens } = require('../../utilities/jwtHelpers.js');
const { isEmpty, isNonEmptyArray } = require("../../utilities/sharedFunctions");

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


router.post('/login', (request, response) => {

  let userName = isEmpty(request.body.userName) === false ? request.body.userName : "";
  let userPassword = isEmpty(request.body.userPassword) === false ? request.body.userPassword : "";

  pool.query('SELECT * FROM users WHERE user_name = $1', [userName])
    .then((results) => {

      if (isNonEmptyArray(results.rows) === true) {

        bcrypt.compare(userPassword, results.rows[0].user_password)
          .then(validPassword => {

            if (validPassword === true) {

              // * Create jwt tokens -- 04/18/2024 JH
              let tokens = jwtTokens(results.rows[0]);

              let cookieDomain = isEmpty(process.env.COOKIE_DOMAIN) === false ? process.env.COOKIE_DOMAIN : "";

              response.cookie('refresh_token', tokens.refreshToken, { domain: cookieDomain, httpOnly: true, sameSite: 'none', secure: true });

              return response.json({ transactionSuccess: true, errorOccurred: false, ...tokens });

            } else {

              return response.status(401).json({ transactionSuccess: false, errorOccurred: true, message: "Incorrect password." });

            };

          });

      } else {

        return response.status(401).json({ transactionSuccess: false, errorOccurred: true, message: "Username is incorrect." });

      };

    })
    .catch(error => {

      response.status(401).json({ transactionSuccess: false, errorOccurred: true, message: error.message });

    });

});

router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(req.cookies);
    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, { ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), httpOnly: true, sameSite: 'none', secure: true });
      return res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'Refresh token deleted.' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;