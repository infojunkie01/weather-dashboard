// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

let previousSearches = [];

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

        // save name of city searched
        saveSearch(city)

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
  var image_source = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
  $('#current-temp').text(data.temp)
  $('#current-icon').attr("src", image_source)
  $('#current-wind').text(data.wind_speed)
  $('#current-humidity').text(data.humidity)
  $('#current-uv').text(data.uvi)
}

function insertForecast(data) {
  console.log(data)

  for (i = 1; i < 6; i++) {
    var date = new Date(data[i].dt * 1000)
    var date_formatted = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(-2);
    var image_source = "https://openweathermap.org/img/wn/" + data[i].weather[0].icon + ".png"
    $('#forecast-date-' + i).text(date_formatted)
    $('#forecast-icon-' + i).attr("src", image_source)
    $('#forecast-temp-' + i).text(data[i].temp.day)
    $('#forecast-wind-' + i).text(data[i].wind_speed)
    $('#forecast-humidity-' + i).text(data[i].humidity)
  }
}

function saveSearch(city) {
  previousSearches.push(city)
  const historyDiv = document.getElementById('search-history');
  const newButton = document.createElement("button");
  newButton.innerText = city;
  newButton.classList.add('past-search-button')
  historyDiv.appendChild(newButton)
}

// loads data when submit button clicked
$('#search-button').on('click', function () {
  var city = document.getElementById('search-box').value;
  getLatLon(city)
})

// loads data when previous search history clicked
$(document).on('click', '.past-search-button', function () {
  var city = $(this).text();
  getLatLon(city)
});

// disables 'enter' key affecting input
$("input").keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});