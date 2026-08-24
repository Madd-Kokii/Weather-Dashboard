const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search"; //gets the latitude and longitude of a city based on its name. This is important because the weather API requires latitude and longitude coordinates to fetch weather data for a specific location. By using the geocoding API, I can convert a city name into the necessary coordinates, allowing me to retrieve accurate weather information for that city.

const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast";

export async function searchCity(city) {
  if (!city || !city.trim()) {
    throw new Error("Please enter a city name.");
  }

  const url = new URL(GEOCODING_API);

  url.searchParams.set("name", city.trim());
  url.searchParams.set("count", "1");//limits the number of results returned by the geocoding API to 1. This is useful because I only need the most relevant result for the city search, and it helps reduce unnecessary data transfer and processing. By setting count=1, I ensure that the API returns only the top match for the specified city name, making the search more efficient and focused.

  url.searchParams.set("language", "en");//specifies the language in which the geocoding API should return the results. In this case, it is set to "en" for English. This is important because it ensures that the city names and other relevant information are returned in a language that I can understand and display to the user. By setting the language parameter, I can provide a better user experience by presenting location information in a familiar language.

  url.searchParams.set("format", "json");//specifies the format in which the geocoding API should return the results. In this case, it is set to "json" for JavaScript Object Notation. JSON is a widely used data format that is easy to read and parse, making it suitable for web applications. By requesting the results in JSON format, I can easily process the response data and extract the necessary information, such as latitude and longitude, for further use in fetching weather data.

  const response = await fetch(url);//sends a request to the geocoding API using the constructed URL. The fetch function is asynchronous and returns a promise that resolves to the response of the request. By using await, I can pause the execution of the function until the response is received, allowing me to handle the data returned by the API. This is important for ensuring that I have the necessary location information before proceeding to fetch weather data.

  if (!response.ok) {
    throw new Error("Unable to search for the city.");
  }

  const data = await response.json();//converts the API response into a JavaScript object. The response.json() method is asynchronous and returns a promise that resolves to the parsed JSON data.

  if (!data.results || data.results.length === 0) {//checks if the results array in the API response is empty or undefined. If there are no results, it means that the city could not be found, and an error is thrown to inform the user. This validation step is important to ensure that I only proceed with valid location data when fetching weather information.

    throw new Error(
      `City "${city}" could not be found. Please check the spelling.`
    );
  }

  return data.results[0];
}


export async function getWeather(latitude, longitude) {
  const url = new URL(WEATHER_API);

  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  url.searchParams.set(
    "current",
    "temperature_2m,weather_code,wind_speed_10m"
  );

  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min"
  );

  url.searchParams.set("forecast_days", "5");
  url.searchParams.set("temperature_unit", "celsius");
  url.searchParams.set("wind_speed_unit", "kmh");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);//call the weather API using the constructed URL.

  if (!response.ok) {
    throw new Error(
      "Weather service is currently unavailable."
    );
  }

  return response.json();
}


export async function getWeatherByCity(city) {
  const location = await searchCity(city);

  const weather = await getWeather(
    location.latitude,
    location.longitude
  );

  return {
    location,
    weather,
  };
}


// Gets weather using the user's browser location.
// The browser provides latitude and longitude,
// which are then sent to the weather API.
export async function getWeatherByLocation(
  latitude,
  longitude
) {
  const weather = await getWeather(
    latitude,
    longitude
  );

  return {
    location: {
      name: "Your Location",
      country: "",
      latitude,
      longitude,
    },
    weather,
  };
}