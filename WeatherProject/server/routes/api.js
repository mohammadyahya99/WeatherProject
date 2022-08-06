const express = require("express");
const router = express.Router();
const request = require("request");
const City = require("../../models/City");
const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "b6e52f445b22df37598ba2a7f8ba29b9";

router.get("/city/:cityName", function (req, res) {
  request(
    `${API_URL}?q=${req.params.cityName}&APPID=${API_KEY}&units=metric`,
    function (error, response, body) {
      var data = JSON.parse(body);
      let newCity = new City({
        name: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        conditionPic: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      });
      res.send(newCity);
    }
  );
});

router.get("/cities", function (req, res) {
  City.find({}).exec(function (err, arr) {
    res.send(arr);
  });
});
router.post("/city", function (req, res) {
  var { city } = req.body;
  request(
    `${API_URL}?q=${city}&APPID=${API_KEY}&units=metric`,
    function (error, response, body) {
      var data = JSON.parse(body);
      let newCity = new City({
        name: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        conditionPic: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      });
      newCity.save();
      res.send(newCity);
    }
  );
});
router.delete("/city/:cityName", function (req, res) {
  console.log(" delete " + req.params.cityName);
  City.findOneAndDelete({ name: req.params.cityName }).exec(function (
    err,
    arr
  ) {
    res.send("deleted");
  });
});
module.exports = router;
