const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const api = require("./server/routes/api");
mongoose.connect("mongodb://localhost/weatherDb");
const app = express();
const port = 8080;
app.listen(port, function () {
  console.log("server port " + port);
});
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", api);
