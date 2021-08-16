function showDay() {
    let now = new Date();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let currentDay = days[now.getDay()];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let currentMonth = months[now.getMonth()];
    let currentDate = now.getDate();
    let currentYear = now.getFullYear();
    let weekDay = document.querySelector("#full-date");
    weekDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentYear}`;
}
function showTime() {
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    if (currentMinute < 10) {
        return "0" + currentMinute;
    }
    let currentTime = document.querySelector("#current-time");
    currentTime.innerHTML = `${currentHour}:${currentMinute}`;
}
function getForecast(coordinates) {
   let apiKey = "92c9508b64de79dcf9e21b52f567f308";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast); 
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function showForecast(response) {
let dailyForecast = response.data.daily;
 let forecastElement = document.querySelector("#weather-forecast");
let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {if (index < 5) {
  forecastHTML =
      forecastHTML +
      `
    <div class="card-body>
    <span id="day-name">${formatDay(forecastDay.dt)}</span></br>
    <span id="forecast-icon"><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></span><span id="forecast-high">
    ${Math.round(forecastDay.temp.max)}</span>° | <span id="forecast-low">${Math.round(forecastDay.temp.min)}</span>°<div><span id="underline">________</span></div>
  </div>
    `;
  }})
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
  
function showWeatherCondition(response) {
    let iconElement = document.querySelector("#weather-icon");
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#numerical-temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#weather-description").innerHTML =
        response.data.weather[0].main;
   document.querySelector("#humidity-input").innerHTML = response.data.main.humidity;
   document.querySelector("#wind-input").innerHTML = Math.round(response.data.wind.speed);
   iconElement.setAttribute(
  "src",
   `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord);
}

function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector("#city-search");
    let cityName = document.querySelector("#city");
    let apiKey = "92c9508b64de79dcf9e21b52f567f308";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
    cityName.innerHTML = `${input.value}`;
    axios.get(apiUrl).then(showWeatherCondition);
}

function searchLocation(position) {
    let apiKey = "92c9508b64de79dcf9e21b52f567f308";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(city) {
  let apiKey = "92c9508b64de79dcf9e21b52f567f308";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

showDay();
showTime();
search("Montreal");