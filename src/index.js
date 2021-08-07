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
    weekDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
}
showDay();

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
showTime();

function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#numerical-temperature").innerHTML = `${Math.round(response.data.main.temp)}°C`;
    document.querySelector("#weather-description").innerHTML =
        response.data.weather[0].main;
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
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);