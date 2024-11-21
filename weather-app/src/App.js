import logo from './logo.svg';
import './App.css';
import WeatherUI from './WeatherUI';

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      setError('');
      const response = await axios.get(`${backendUrl}/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError('Unable to fetch weather data');
    }
  };

  return (
    <WeatherUI
      city={city}
      setCity={setCity}
      fetchWeather={fetchWeather}
      error={error}
      weather={weather}
    />
  );
};

export default App;
