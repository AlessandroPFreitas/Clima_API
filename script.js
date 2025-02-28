const weatherForm = document.querySelector("#wrapper__search");
const searchInput = document.querySelector(".search__input");
const wrapperCard = document.querySelector(".wrapper__card");
const apiKey = "e7325174f9aa3b353b164cc0a011707a";
let weatherCondition = document.querySelector(".card__emoji");
let searchInputValue = "";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchInputValue = searchInput.value;

  try {
    const API = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&appid=${apiKey}&units=metric`
    );
    const data = await API.json();
    dataApi(data);
  } catch (error) {
    console.log(error);
  }
});

function dataApi(data) {
wrapperCard.classList.add("visible");
wrapperCard.style.backgroundColor = "";

  let errorMessage = document.getElementById("error-message");
  let displayCard = document.querySelector(".card");
  if (data.cod === "404" || searchInputValue == "") {
    displayCard.classList.remove("visible")
    wrapperCard.style.backgroundColor = "black";
    errorMessage.textContent = "Este pais/cidade/estado não existe!";
    errorMessage.classList.remove("hidden");
  } else {
    displayCard.classList.add("visible")
    errorMessage.classList.add("hidden");
    const name = data.name;
    const temp = Math.floor(data.main.temp);
    const humid = data.main.humidity;
    const weather = data.weather[0].main;

    const processedDada = {
      name,
      temp,
      humid,
      weather,
    };

    displayData(processedDada);
  }
}

function displayData(weatherData) {
  document.querySelector(".card__name").textContent = weatherData.name;
  document.querySelector(
    ".card__temp"
  ).innerHTML = `${weatherData.temp}<span class="temp__celsius">°C</span>`;
  document.querySelector(
    ".card__humid"
  ).textContent = `Humidity: ${weatherData.humid}%`;

  switch (weatherData.weather) {
    case "Thunderstorm":
      weatherCondition.textContent = "⛈️";
      break;
    case "Rain":
      weatherCondition.textContent = "🌧️";
      break;
    case "Snow":
      weatherCondition.textContent = "🌨️";
      break;
    case "Clear":
      weatherCondition.textContent = "☀️";
      break;
    case "Clouds":
      weatherCondition.textContent = "☁️";
      break;
  }
}
