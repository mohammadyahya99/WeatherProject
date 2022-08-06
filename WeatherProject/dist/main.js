var weatherApp = new WeatherApp();
var searchBtn = $("#SearchBtn");
var cityInput = $("#cityData");
class Renderer {
  constructor() {
    this.source = $("#cityweather").html();
    this.template = Handlebars.compile(this.source);
    this.citiesElement = $("#cities");
  }
  renderData(cities) {
    console.log(cities);
    const newHTML = this.template({ cities: cities });
    this.citiesElement.empty().append(newHTML);
  }
}
const load = async function () {
  await weatherApp.getDataFromDB();
  renderer.renderData(weatherApp.cityData);
};
var renderer = new Renderer();
const Search = async function () {
  weatherApp.getCity(cityInput.val()).then((value) => {
    renderer.renderData(weatherApp.cityData);
  });
};

$(async function () {
  await load();
});
searchBtn.on("click", Search);

$("body").on("click", ".remember", async function () {
  if ($(this).text() == "-") {
    weatherApp
      .removeCity($(this).siblings(".cityName").text())
      .then((value) => {
        renderer.renderData(weatherApp.cityData);
      });
  } else {
    weatherApp.saveCity($(this).siblings(".cityName").text());
    $(this).text("-");
  }
});
