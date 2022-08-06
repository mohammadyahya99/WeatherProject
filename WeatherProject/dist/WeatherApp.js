class WeatherApp {
  constructor() {
    this.cityData = [];
  }
  saveCity(city) {
    $.ajax({
      method: "POST",
      url: `${"http://localhost:8080/"}city`,
      data: { city: city },
      success: (response) => {
        console.log(response);
      },
    });
  }
  async getCity(city) {
    return $.ajax({
      method: "GET",
      url: `${"http://localhost:8080/"}city/${city}`,
      success: (response) => {
        this.cityData.push({ ...response, isTemp: true });
      },
    });
  }
  async getDataFromDB() {
    return $.ajax({
      method: "GET",
      url: `${"http://localhost:8080/"}cities`,
      success: (response) => {
        this.cityData = response;
      },
    });
  }

  DeletedCity(city) {
    for (var i in this.cityData) {
      if (this.cityData[i].name == city) {
        this.cityData.splice(i, 1);
      }
    }
  }
  async removeCity(city) {
    return $.ajax({
      method: "DELETE",
      url: `${"http://localhost:8080/"}city/${city}`,
      data: { city: city },
      success: (response) => {
        this.DeletedCity(city);
      },
    });
  }

  ToggleCity(city) {
    for (var i in this.cityData) {
      if (this.cityData[i].name == city) {
        this.cityData.IsTemp = false;
      }
    }
  }
}
