"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const colors = require("./routes/api/colors");
const colorGroups = require("./routes/api/colorGroups");
const colorInColorGroup = require("./routes/api/colorInColorGroup");
const userColor = require("./routes/api/userColor");
const userColorGroup = require("./routes/api/userColorGroup");

const app = express();

let corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: process.env.URL || '*'
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(require("./middleware/headers"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// * Use Routes -- 09/25/2023 JH
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/colors', colors);
app.use('/api/colorGroups', colorGroups);
app.use('/api/colorInColorGroup', colorInColorGroup);
app.use('/api/userColor', userColor);
app.use('/api/userColorGroup', userColorGroup);

// * serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   //set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// * setup port -- 08/30/2022 JH
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // dbo.connectToServer(error => {
  //   if (error) {
  //     console.log("dbo.connectToServer error", error);
  //   };
  // });

  console.log(`Server listening on ${PORT} - ${new Date()}`);
});