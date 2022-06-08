
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


var getLatLon = function (city) {

  var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
  var apiKey = 'dfb7a8462db2c88a6cec11d6fb5a530c'
  var apiUrl = baseUrl + 'q=' + city + '&appid=' + apiKey

  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {

        // get city name and insert into element
        city = data.name
        $('#current-city').text(city)

        // get lat and lon coordinates for more compreshensive api call, which will be used to get data
        lat = data.coord.lat;
        lon = data.coord.lon;
        getCityWeather(lat, lon)

      });
    } else {
      alert("City not found");
    }
  });
};

function getCityWeather(lat, lon) {
  var baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
  var apiKey = 'dfb7a8462db2c88a6cec11d6fb5a530c'
  var apiUrl = baseUrl + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey

  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        current =
          insertCurrentWeather(data)
      });
    } else {
      alert("Error with lat and lon");
    }
  });

}

function insertCurrentWeather(data) {
  console.log(data)


}


$('#search-button').on('click', function () {

  var city = document.getElementById('search-box').value;

  getLatLon(city)

})
