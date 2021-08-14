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

function displayForecast() {
 let forecastElement = document.querySelector("#weather-forecast");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
let forecastHTML = `<div class="col">`;
  days.forEach(function (day) {
  forecastHTML =
      forecastHTML +
      `
     <div class="row">
     <div class="card">
    <div class="card-body">
    <span id="day-name">${day}</span></br><span id="forecast-icon"> 🌤 </span><span id="forecast-high">
    22</span>° | <span id="forecast-low">72</span>°
    </div>
    </div>
    </div>
  `;
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
  
function displayWeatherCondition(response) {
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
}

function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector("#city-search");
    let cityName = document.querySelector("#city");
    let apiKey = "92c9508b64de79dcf9e21b52f567f308";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
    cityName.innerHTML = `${input.value}`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
    let apiKey = "92c9508b64de79dcf9e21b52f567f308";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(city) {
  let apiKey = "92c9508b64de79dcf9e21b52f567f308";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showFarenheit(event) {
    event.preventDefault();
    celsius.classList.remove("active");
    farenheit.classList.add("active");
    let numericalTemp = document.querySelector("#numerical-temperature");
    numericalTemp.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}

function showCelsius(event) {
    event.preventDefault();
    celsius.classList.add("active");
    farenheit.classList.remove("active");
    let numericalTemp = document.querySelector("#numerical-temperature");
    numericalTemp.innerHTML = Math.round(celsiusTemperature);
}

let farenheit = document.querySelector("#fahrenheit-link");
farenheit.addEventListener("click", showFarenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

let celsiusTemperature = null;

showDay();
showTime();
search("Montreal");
displayForecast();