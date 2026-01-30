import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Half Moon Bay");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle"); 
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5050/api/weather?city=${encodeURIComponent(cityName)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch weather data");
      }

      setWeather(data);
      setStatus("success");
    } catch (err) {
      setWeather(null);
      setStatus("error");
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const iconUrl =
    weather?.icon
      ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
      : null;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>

        <form className="search" onSubmit={onSubmit}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city (e.g., Seattle)"
            aria-label="City"
          />
          <button type="submit" disabled={status === "loading"}>
            Search
          </button>
        </form>
      </header>

      <main>
        {status === "error" && <p className="error">Error: {error}</p>}
        {status === "loading" && <p>Loading...</p>}

        {status === "success" && weather && (
          <div className="weather-container">
            <h2>{weather.city}</h2>

            {iconUrl && (
              <div className="icon-row">
                <img
                  src={iconUrl}
                  alt={weather.description || "Weather icon"}
                  width="100"
                  height="100"
                />
                <p className="condition">
                  {weather.condition} — {weather.description}
                </p>
              </div>
            )}

            <div className="weather-info">
              <div className="card">
                <span className="label">Temperature</span>
                <p>{Math.round(weather.temp)}°F</p>
              </div>

              <div className="card">
                <span className="label">Humidity</span>
                <p>{weather.humidity}%</p>
              </div>

              <div className="card">
                <span className="label">Wind Speed</span>
                <p>{weather.windSpeed} mph</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Data from OpenWeather.</p>
      </footer>
    </div>
  );
}

export default App;
