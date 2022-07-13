function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours< 10) {
       hours= `0${minutes}`;
     }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursay", "friday", "saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");


let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];
   let forecastHTML = `<div class="row">`;   
//    let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];
   forecast.forEach(function(forecastDay, index){
       if (index < 6){
        forecastHTML = forecastHTML +
          `
    
        <div class="col-2">
            <div class="weather-forecast-date"> 
            ${formatDay(forecastDay.dt)}
            </div>
    
            
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="40px"/> <br>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 
            ${Math.round(forecastDay.temp.max)}°
        </span> 
        <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
            </div>
        </div>
     `;
       }

   })
   
    forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;


   
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "c074fff8ce9bf681ae0a79acd0736419";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
 }


function displayTemperature(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round (response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt *1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);

}

function search(city){
    let apiKey = "c074fff8ce9bf681ae0a79acd0736419";
    // let city = "london";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);


}


function handlesubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-Input");
    search(cityInputElement.value);
    // console.log(cityInputElement.value);
}

// let apiKey = "c074fff8ce9bf681ae0a79acd0736419";
// let city = "london";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


// axios.get(apiUrl).then(displayTemperature);

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
     let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event){
    event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsiusTemperature);


search("New York");
// displayForecast();
