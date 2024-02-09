const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const containerHeightFirstStage = "400";
const containerHeightSecondStage = "590";
const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");
const clearIcon = "images/clear.png";
const rainIcon = "images/rain.png";
const snowIcon = "images/snow.png";
const cloudsIcon = "images/cloud.png";
const HazeIcon = "images/mist.png";

const APIKey = "3e99457a6e583778cc58b29f977366ab";
const cityElement = document.querySelector(".search-box input");

window.addEventListener("DOMContentLoaded", () => {
  if (!search) return;

  search.addEventListener("click", () => handleSearch());
});

// FUNCTIONS

function handleSearch() {
  const city = cityElement.value;
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        if (!container) return;
        handleError();

        return;
      }

      setDisplayNone(error404);
      error404.classList.remove("fadeIn");

      setNewPreview(json);

      setNewParams(json);

      showResults();
      switch (true) {
        case json.main.temp >= -50 && json.main.temp <= -30:
          document.body.style.background = "#00AAFA";
          break;

        case json.main.temp >= -29 && json.main.temp <= -10:
          document.body.style.background = "#80D6FF";
          break;

        case json.main.temp >= -10 && json.main.temp <= 0:
          document.body.style.background = "#C3EBFE";
          break;

        case json.main.temp >= 1 && json.main.temp <= 10:
          document.body.style.background = "#FAEF89";
          break;

        case json.main.temp >= 11 && json.main.temp <= 30:
          document.body.style.background = "#FFC524";
          break;

        case json.main.temp >= 31 && json.main.temp <= 50:
          document.body.style.background = "#E29308";
          break;

        default:
          document.body.style.background = "#FDE6BF";
      }
    })
    .catch((error) => console.error(error));
}

function handleError() {
  container.style.height = `${containerHeightFirstStage}px`;
  setDisplayNone(weatherBox);
  setDisplayNone(weatherDetails);
  removeDisplayNone(error404);
  error404.classList.add("fadeIn");
}

function setNewParams(json) {
  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseFloat(json.wind.speed)}Km/h`;
}

function showResults() {
  removeDisplayNone(weatherBox);
  removeDisplayNone(weatherDetails);
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style.height = `${containerHeightSecondStage}px`;
}

function setNewPreview(json) {
  switch (json.weather[0].main.toLowerCase()) {
    case "clear":
      image.src = clearIcon;
      break;

    case "rain":
      image.src = rainIcon;
      break;

    case "snow":
      image.src = snowIcon;
      break;

    case "clouds":
      image.src = cloudsIcon;
      break;

    case "haze":
      image.src = HazeIcon;
      break;

    default:
      image.src = "";
  }
}

function setDisplayNone(element) {
  element.style.display = "none";
}

function removeDisplayNone(element) {
  element.style.display = "";
}
