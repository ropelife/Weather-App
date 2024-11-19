import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const response = await axios.get(
        `http://localhost:5000/weather?city=${city}`
      );
      console.log('Response ' + response);
      setWeather(response.data);
    } catch (err) {
      setError('Unable to fetch weather data');
    }
  };

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
          <h2>Weather in {weather.Location}</h2>
          <p>Temperature: {weather.Temperature_C}°C</p>
          <p>Condition: {weather.Humidity_pct}</p>
        </div>
      )}
    </div>
  );
};

export default App;
