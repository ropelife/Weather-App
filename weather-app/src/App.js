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
      setError('');
      const response = await axios.get(
        `http://localhost:5001/weather?city=${city}`
      );
      console.log('Response ' + response.data.name);
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
