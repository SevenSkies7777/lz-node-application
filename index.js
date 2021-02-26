/*SON/2018-11-06 00:29 - DEVELOPMENT

This is the system's entry point.It creates
the database connection and port binding 
then initializes all the route files.

*/

const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");
var fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/" });
var dbcredentials;
var cors = require("cors");
var port = process.env.PORT || 5000;

app.use(cors());
dbcredentials = {
  host: "localhost",
  user: "silas",
  password: "8032",
  database: "waondo",
  insecureAuth: true
};

app.use(express.static("public"));

var con;
app.use((req, res, next) => {
  con = mysql.createConnection(dbcredentials);
  con.on("error", err => {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log(err);
    } else {
      //throw err;
    }
  });

  var date = new Date();
  date.setHours(date.getHours() + 0);
  console.log("Client connected at :-  "+date);

  next();
});

app.use(require("./controllers/Controller"));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const server = app.listen(6000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Backend system listening at http://${host}:${port}`);
});
