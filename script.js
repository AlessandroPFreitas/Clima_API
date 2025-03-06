const weatherForm = document.querySelector("#wrapper__search");
const searchInput = document.querySelector(".search__input");
const card = document.querySelector(".wrapper__card");
const apiKey = "e7325174f9aa3b353b164cc0a011707a";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchInputValue = searchInput.value;

  if (searchInputValue) {
    try {
      const weatherData = await getWeatherData(searchInputValue);
      displayData(weatherData);
      console.log(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    console.error(error);
    displayError("Digite uma cidade/pais/estado!");
  }
});

async function getWeatherData(searchInputValue) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("This city does not exist");
  }
  return response.json();
}

function displayData(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ id }],
  } = data;

  card.textContent = "";
  card.classList.add("visible");

  const cityDisplay = document.createElement("h1");
  const forecastDisplay = document.createElement("div");
  const tempDisplay = document.createElement("p");
  const weatherDisplay = document.createElement("p");
  const humidDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp.toFixed(1)}°C`;
  humidDisplay.textContent = `${humidity}%`;
  weatherDisplay.textContent = displayEmoji(id);
  console.log(id);

  card.appendChild(cityDisplay);
  card.appendChild(forecastDisplay);
  forecastDisplay.appendChild(weatherDisplay);
  forecastDisplay.appendChild(tempDisplay);
  card.appendChild(humidDisplay);

  forecastDisplay.classList.add("card__forecast");
  cityDisplay.classList.add("card__name");
  tempDisplay.classList.add("card__temp");
  weatherDisplay.classList.add("card__emoji");
  humidDisplay.classList.add("card__humid");
}

function displayEmoji(weatherData) {
  switch (true) {
    case weatherData >= 200 && weatherData < 300:
      return "⛈️";
    case weatherData >= 300 && weatherData < 400:
      return "🌧️";
    case weatherData >= 500 && weatherData < 600:
      return "🌧️";
    case weatherData >= 600 && weatherData < 700:
      return "❄️";
    case weatherData >= 700 && weatherData < 800:
      return "🌪️";
    case weatherData == 800:
      return "☀️";
    case weatherData >= 801 && weatherData < 810:
      return "☁️";
      default:
        return "❓";
  }
}

function displayError(error) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = error;
  errorDisplay.id = "error-message";

  card.textContent = "";
  card.classList.add("visible");
  card.prepend(errorDisplay);
}
