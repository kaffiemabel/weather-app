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
    let days = ["sunday", "mondsy", "tuesday", "wednesday", "thursay", "friday", "saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}


function displayTemperature(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round (response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt *1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);