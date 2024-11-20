import React from 'react';
import './index.css';

const WeatherUI = ({ city, setCity, fetchWeather, error, weather }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <div>
            {weather.main ? <p>Temperature: {weather.main.temp}°F</p> : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherUI;
