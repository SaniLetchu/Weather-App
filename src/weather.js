import { format } from "date-fns";

// Oh no public key :/
const apiKey = "dafc09f9b9b592b7846ce1fe1b1be6dc";

// Fetch weather data when given user input
async function getWeatherData(locationinput) {
  try {
    // Fetch data from openWeatherMap
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationinput}&APPID=${apiKey}`,
      { mode: "cors" }
    );
    // Formats promise to a JSON object
    const dataJSON = await data.json();

    // Parsing all the data we need
    const { name } = dataJSON;
    const feelsLike = dataJSON.main.feels_like;
    const { humidity } = dataJSON.main;
    const { temp } = dataJSON.main;
    const windSpeed = dataJSON.wind.speed;
    const { pressure } = dataJSON.main;
    const { description } = dataJSON.weather[0];
    const { country } = dataJSON.sys;
    const { icon } = dataJSON.weather[0];
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const date = new Date();
    const dateUTC = new Date(date.toUTCString().slice(0, -4));
    // Let's get local time
    dateUTC.setSeconds(dateUTC.getSeconds() + dataJSON.timezone);
    const currentDate = format(dateUTC, "EEEE do LLL yy");
    let minutes = dateUTC.getMinutes();
    // Add 0 infront of minutes if they are single digit
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const hours = dateUTC.getHours();
    const currentTime = `${hours}:${minutes}`;
    return {
      name,
      temp,
      feelsLike,
      humidity,
      windSpeed,
      pressure,
      description,
      iconURL,
      currentDate,
      currentTime,
      country,
    };
  } catch (error) {
    throw Error(error);
  }
}

export default getWeatherData;
