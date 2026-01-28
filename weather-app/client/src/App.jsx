import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your Express backend
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/weather');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
      </header>

      <main>
        {error && <p className="error">Error: {error}</p>}

        {weather ? (
          <div className="weather-container">
            <h2>{weather.name}</h2>
            <div className="weather-info">
              <div className="card">
                <span className="label">Temperature</span>
                <p>{Math.round(weather.main.temp)}°F</p>
              </div>
              <div className="card">
                <span className="label">Condition</span>
                <p>{weather.weather[0].description}</p>
              </div>
              <div className="card">
                <span className="label">Humidity</span>
                <p>{weather.main.humidity}%</p>
              </div>
              <div className="card">
                <span className="label">Wind Speed</span>
                <p>{weather.wind.speed} mph</p>
              </div>
            </div>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </main>

      <footer className="footer">
        <p>Current conditions for your location.</p>
      </footer>
    </div>
  );
}

export default App;