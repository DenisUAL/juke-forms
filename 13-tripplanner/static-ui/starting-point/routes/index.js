const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("index.html");
});

route.post("/login", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

module.exports = route;
