import getWeatherData from "./weather";

// Save the current data
let placeName = null;
let country = null;
let description = null;
let feelsLike = null;
let humidity = null;
let windSpeed = null;
let pressure = null;
let temperature = null;
let iconURL = null;
let date = null;
let time = null;

// Temperature units and conversions from kelvins
let currentUnit = null;
let currentConversion = null;

// Temperature units
const celciusUnit = " °C";
const fahrenheitUnit = " °F";

// Conversion from kelvins to celcius
function celciusConversion(temp) {
  return temp - 273.15;
}

// Conversion from kelvins to fahrenheit
function fahrenheitConversion(temp) {
  return 1.8 * (temp - 273.15) + 32;
}

// Default to celcius
currentUnit = celciusUnit;
currentConversion = celciusConversion;

// Hides the error message
function hideNotFound() {
  document.querySelector(".notfound").style.opacity = 0;
}

// Update page with current data
function updatePage() {
  document.querySelector(".country").textContent = country;
  document.querySelector(".placename").textContent = placeName;
  document.querySelector(".date").textContent = date;
  document.querySelector(".time").textContent = time;
  document.querySelector(".description").textContent = description;
  document.querySelector(".humidity").textContent = humidity;
  document.querySelector(".windspeed").textContent = windSpeed;
  document.querySelector(".pressure").textContent = pressure;
  document.querySelector(".tempnumber").textContent =
    currentConversion(temperature).toFixed(1);
  document.querySelector(".feelslike").textContent =
    currentConversion(feelsLike).toFixed(1);
  document.querySelector(".weatherimage").setAttribute("src", iconURL);

  // Go through every element with class tempunit
  const units = document.querySelectorAll(".tempunit");
  for (let i = 0; i < units.length; i += 1) {
    units[i].textContent = currentUnit;
  }
}

// Handle user input
document.querySelector(".userinput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeatherData(document.querySelector(".userinput").value)
      .then((response) => {
        // Save fetched data
        country = response.country;
        date = response.currentDate;
        description = response.description;
        temperature = response.temp;
        time = response.currentTime;
        feelsLike = response.feelsLike;
        humidity = response.humidity;
        iconURL = response.iconURL;
        placeName = response.name;
        pressure = response.pressure * 100; // Conversion from hPa to Pa
        windSpeed = (response.windSpeed * 3.6).toFixed(2); // Conversion from m/s to km/h
        updatePage();
      })
      .catch((error) => {
        console.log(error);
        document.querySelector(".notfound").style.opacity = 100;
        setTimeout(hideNotFound, 3000);
      });
    // Empty input after
    document.querySelector(".userinput").value = "";
  }
});

// Handle checkbox for units
document.querySelector(".unitchange").addEventListener("change", function () {
  if (this.checked) {
    currentConversion = fahrenheitConversion;
    currentUnit = fahrenheitUnit;
  } else {
    currentConversion = celciusConversion;
    currentUnit = celciusUnit;
  }
  updatePage();
});

// Default fetch data from Helsinki
getWeatherData("Helsinki").then((response) => {
  // Save fetched data
  country = response.country;
  date = response.currentDate;
  description = response.description;
  temperature = response.temp;
  time = response.currentTime;
  feelsLike = response.feelsLike;
  humidity = response.humidity;
  iconURL = response.iconURL;
  placeName = response.name;
  pressure = response.pressure * 100; // Conversion from hPa to Pa
  windSpeed = (response.windSpeed * 3.6).toFixed(2); // Conversion from m/s to km/h
  updatePage();
});

document.querySelector(".userinput").addEventListener("focus", () => {
  document.querySelector("body").style = "backdrop-filter: blur(1px)";
});

document.querySelector(".userinput").addEventListener("focusout", () => {
  document.querySelector("body").style = "backdrop-filter: blur(0px)";
});
