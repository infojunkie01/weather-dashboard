// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// the date, an icon representation of weather conditions

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions

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
        city = data.name;
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
        current = data.current
        forecast = data.daily
        insertCurrentWeather(current)
        insertForecast(forecast)
      });
    } else {
      alert("Error with lat and lon");
    }
  });

}

function insertCurrentWeather(data) {
  $('#current-temp').text(data.temp)
  $('#current-wind').text(data.wind_speed)
  $('#current-humidity').text(data.humidity)
  $('#current-uv').text(data.uvi)
}

function insertForecast(data) {
  console.log(data)
 
  for (i = 1; i < 6; i++){
    console.log(data[i])
    var date = new Date(data[i].dt*1000)
    var date_formatted = (date.getMonth()+1) + "/" +  date.getDate()  + "/" +  date.getFullYear().toString().substr(-2);
    $('#forecast-date-' + i).text(date_formatted)
    $('#forecast-temp-' + i).text(data[i].temp.day)
    $('#forecast-wind-' + i).text(data[i].wind_speed)
    $('#forecast-humidity-' + i).text(data[i].humidity)
  }
}

$('#search-button').on('click', function () {

  var city = document.getElementById('search-box').value;

  getLatLon(city)

})
