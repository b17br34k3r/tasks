import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [city, setCity] = useState("Islamabad");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "e2fdcf55991d4a76a50150913250607";

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Error fetching weather data");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1> Weather App</h1>
      <form className="search" onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && (
        <div class="loading-container">
          <div class="loading-bar">
            <div class="progress"></div>
          </div>
          <p class="loading-text">Loading...</p>
        </div>
      )}

      {weather && !loading && (
        <div>
          <div className="city-time">
            <div>
              {weather.location.name}, {weather.location.country}
            </div>
            <div style={{ fontSize: "30px" }}>{weather.location.localtime}</div>
          </div>
          <p className="condition">{weather.current.condition.text}</p>
          <div className="temp-feels-like">
            <p className="temp">Temperature: {weather.current.temp_c}°C</p>
            <p className="feels-like">
              Feels like: {weather.current.feelslike_c}°C
            </p>
          </div>
          <div className="humidity-wind">
            <p className="humidity">Humidity: {weather.current.humidity}%</p>
            <p className="wind">Wind: {weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
