import { getWeatherDescription } from "../services/weatherCodes";

function CurrentWeather({ location, weather }) {
  const current = weather.current;

  return (
    <section>
      <h2>
        {location.name}
        {location.country
          ? `, ${location.country}`
          : ""}
      </h2>

      <p>
        Temperature: {current.temperature_2m}°C
      </p>

      <p>
        Conditions:{" "}
        {getWeatherDescription(current.weather_code)}
      </p>

      <p>
        Wind: {current.wind_speed_10m} km/h
      </p>
    </section>
  );
}

export default CurrentWeather;