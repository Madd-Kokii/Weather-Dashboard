import { useState } from "react";//used this so it can remember the state of the app and not reset it when the page is refreshed. It allows me to store and manage data that can change over time, such as user input, API responses, or any other dynamic information. By using useState, I can create state variables that persist across re-renders, enabling me to build interactive and responsive components in my React application. 

import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

import {
  getWeatherByCity,
  getWeatherByLocation,
} from "../services/weatherApi";


function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null); //creates a state variable called weatherData and a function setWeatherData to update it. Initially, weatherData is set to null, indicating that there is no weather information available yet. This state will be used to store the weather data retrieved from the API based on the user's search input.

  const [loading, setLoading] = useState(false);// stores the loading state of the weather data retrieval process. It is initially set to false, indicating that the app is not currently fetching weather information. When a user initiates a search for a city's weather, this state will be set to true to indicate that the app is in the process of loading data. Once the data is fetched or an error occurs, it will be set back to false.

  const [error, setError] = useState("");// stores any error messages that may occur during the weather data retrieval process. It is initially set to an empty string, indicating that there are no errors. If an error occurs while fetching the weather data (e.g., if the city cannot be found or if there is a network issue), this state will be updated with an appropriate error message. This allows the app to display error messages to the user when necessary.


  // Stores the user's recent searches.
  // The searches are loaded from localStorage when the app starts.
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const savedSearches =
        localStorage.getItem("recentSearches");

      return savedSearches
        ? JSON.parse(savedSearches)
        : [];
    } catch {
      return [];
    }
  });


  // Stores the current colour theme.
  const [theme, setTheme] = useState(0);


  // Different colour themes used by the application.
  const themes = [
    "theme-blue",
    "theme-sky",
    "theme-purple",
    "theme-teal",
    "theme-orange",
    "theme-green",
  ];


  // Changes the colour theme after a successful search
  // or after the current location is successfully loaded.
  function changeTheme() {
    setTheme(
      (currentTheme) =>
        (currentTheme + 1) % themes.length
    );
  }


  async function handleSearch(city) {
    // Function to handle the search for weather information by city name, async is used for something that takes time to complete, like fetching data from an API. It allows the function to pause and wait for the asynchronous operation to finish before proceeding with the next steps. This is important when dealing with network requests, as it ensures that the app doesn't block or freeze while waiting for a response. By using async, I can write cleaner and more readable code when working with promises and asynchronous operations. Coz we are using an external API.

    setLoading(true);//when the search is initiated, setLoading(true) is called to indicate that the app is in the process of fetching weather information. This will trigger a re-render of the component, allowing me to display a loading message or spinner to inform the user that the data retrieval is in progress.

    setError("");//removes previous error messages when a new search is initiated. This ensures that any old error messages are cleared from the UI, providing a clean slate for the new search operation.

    try {
      const data = await getWeatherByCity(city);

      setWeatherData(data);//when found we set the weather data to the state variable weatherData, which will trigger a re-render of the component and display the current weather and forecast information for the searched city.


      // Adds the city to recent searches.
      // The newest search is placed first.
      // Duplicate cities are removed.
      // Only the latest five searches are kept.
      const updatedSearches = [
        city,
        ...recentSearches.filter(
          (search) =>
            search.toLowerCase() !==
            city.toLowerCase()
        ),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);


      // Saves recent searches so they remain
      // after the page is refreshed.
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );


      // Changes the colour after a successful search.
      changeTheme();

    } catch (err) {
      setWeatherData(null);

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);//to show that the loading process has completed, regardless of whether the data retrieval was successful or resulted in an error. This will trigger a re-render of the component, allowing me to hide the loading message and display either the weather information or an error message based on the outcome of the search.
    }
  }


  /*
   * Gets the user's current location.
   *
   * This function ONLY runs when the user clicks
   * the "Use My Current Location" button.
   */
  function handleCurrentLocation() {

    // Checks if the browser supports geolocation.
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );

      return;
    }


    setLoading(true);
    setError("");


    // Requests the user's current location.
    navigator.geolocation.getCurrentPosition(
      async (position) => {

        try {
          const { latitude, longitude } =
            position.coords;


          // Gets weather using the user's coordinates.
          const data =
            await getWeatherByLocation(
              latitude,
              longitude
            );


          setWeatherData(data);


          // Changes the colour after successfully
          // loading the current location.
          changeTheme();

        } catch (err) {

          setWeatherData(null);

          setError(
            err.message ||
              "Unable to get weather for your location."
          );

        } finally {

          setLoading(false);
        }
      },


      // Runs if the user denies location permission
      // or the browser cannot determine the location.
      (error) => {

        setLoading(false);


        if (error.code === 1) {
          setError(
            "Location access was denied. Please allow location access or search for a city."
          );

        } else if (error.code === 2) {
          setError(
            "Your location could not be determined. Please try again."
          );

        } else if (error.code === 3) {
          setError(
            "The location request took too long. Please try again."
          );

        } else {
          setError(
            "Unable to get your current location."
          );
        }
      }
    );
  }


  /*
   * Handles a user clicking on a recent search.
   */
  function handleRecentSearch(city) {
    handleSearch(city);
  }


  return (
    <main className={themes[theme]}>

      <h1>Weather Dashboard Page</h1>


      <SearchBar
        onSearch={handleSearch}//when the user submits a search query, the onSearch prop is called with the city name as an argument. This triggers the handleSearch function, which initiates the process of fetching weather information for the specified city.
        loading={loading}
      />


      {/* Current location button */}
      <div className="location-container">

        <button
          type="button"
          className="location-button"
          onClick={handleCurrentLocation}
          disabled={loading}
        >
          📍 {loading
            ? "Getting Location..."
            : "Get My Current Location"}
        </button>

      </div>


      {loading && (
        <p className="loading-message">
          Loading weather information...
        </p>
      )}


      {error && (
        <p role="alert">
          {error}
        </p>
      )}


      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <section className="recent-searches">

          <h2>Recent Searches</h2>

          <div className="recent-search-list">

            {recentSearches.map((city) => (
              <button
                key={city}
                type="button"
                className="recent-search-button"
                onClick={() =>
                  handleRecentSearch(city)
                }
                disabled={loading}
              >
                {city}
              </button>
            ))}

          </div>

        </section>
      )}


      {weatherData && !loading && (
        //shows the current weather and forecast information for the searched city if the weatherData state variable is not null and the loading state is false. This means that the data retrieval was successful, and I can display the relevant weather information to the user.

        <>
          <CurrentWeather
            location={weatherData.location}
            weather={weatherData.weather}
          />

          <Forecast
            weather={weatherData.weather}
          />
        </>
      )}

    </main>
  );
}

export default WeatherDashboard;