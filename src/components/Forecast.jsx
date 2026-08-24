import { getWeatherDescription } from "../services/weatherCodes";

function Forecast({ weather }) {
  const daily = weather.daily;

  return (
    <section>
      <h2>5-Day Forecast</h2>

      {daily.time.map((date, index) => (
        <div key={date}>
          <h3>{date}</h3>

          <p>
            {getWeatherDescription(
              daily.weather_code[index]
            )}
          </p>

          <p>
            High: {daily.temperature_2m_max[index]}°C
          </p>

          <p>
            Low: {daily.temperature_2m_min[index]}°C
          </p>
        </div>
      ))}
    </section>
  );
}

export default Forecast;