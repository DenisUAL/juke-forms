const express = require("express");
const app = express();

// Templating
const nunjucks = require("nunjucks");
app.set("view engine", "html");
app.engine("html", nunjucks.render);
nunjucks.configure("views", { noCache: true });

// Parse body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging
const volleyball = require("volleyball");
app.use(volleyball);

// routes
app.use(require("./routes"));

// Static
app.use(express.static(__dirname + "/public"));

// 404 and 500
app.use((req, res, next) => {
  const notFoundError = new Error("Page not found");
  notFoundError.status = 404;
  next(notFoundError);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send("There was an error: " + err.message);
});

module.exports = app;
