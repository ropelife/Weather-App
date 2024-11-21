import React from 'react';
import './index.css';
import "@fortawesome/fontawesome-free/css/all.min.css"

const WeatherUI = ({ city, setCity, fetchWeather, error, weather }) => {

    const getWeatherIcon = (description) => {
        switch (description.toLowerCase()) {
            case "clear sky":
                return "fas fa-sun";

            case "few clouds":
                return "fas fa-cloud-sun";

            case "broken clouds":
                return "fas fa-cloud";

            case "rain":
                return "fas fa-cloud-showers-heavy";

            case "thunderstorm":
                return "fas fa-bolt";

            case "snow":
                return "fas fa-snowflake";

            case "mist":
                return "fas fa-smog";

            default:
                return "fas fa-cloud";
        }
    }

    return (
        <div className="center-container">
            <h1 className="app-title">Weather App</h1> 
            <div className="card">
                <div className="search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className="search-button" onClick={fetchWeather}>🔍</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                {weather && (
                    <>
                        <div className="weather-info">
                            <i className={getWeatherIcon(weather.weather[0].description)} style={{ fontSize: "50px", marginBottom: "10px", marginTop: "40px" }}></i>

                            <div className="temperature">
                                {weather.main ? <p>{Math.round(weather.main.temp)} °F</p> : null}

                            </div>
                            <div className="location">
                                {weather.name ? <p>{weather.name}, {weather.sys.country}</p> : null}
                            </div>
                        </div>

                        <div className="weather-details">
                            <div className="humidity">
                                <i className="fas fa-tint" style={{ fontSize: "26px", marginRight: "12px" }}></i>
                                <div className="humidity-info">
                                    <div className="humidity-value">
                                        {weather.main ? <p>{weather.main.humidity}%</p> : null}
                                    </div>
                                    <div className="humidity-label">Humidity</div>
                                </div>
                            </div>

                            <div className="wind">
                                <i className="fas fa-wind" style={{ fontSize: "26px", marginRight: "12px" }}></i>
                                <div className="wind-info">
                                    <div className="wind-speed">
                                        {weather.wind ? <p>{weather.wind.speed} mph</p> : null}
                                    </div>
                                    <div className="wind-label">Wind Speed</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WeatherUI;
