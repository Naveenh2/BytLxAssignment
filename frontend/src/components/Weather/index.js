import React, { useState } from 'react';
import './index.css';
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (selectedCity) => {
    setLoading(true);
    setError(null);
    setWeather(null); // Clear previous weather data before fetching
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f13a498495724a2b87774805250611&q=${selectedCity}&aqi=yes`);
      const data = await response.json();
      console.log(response);
      if (!response.ok) {
        console.log(data)
        setWeather(null); // Clear weather data on error
        setError((data && (data.error?.message || data.message)) || 'Failed to fetch weather data');
        return;
      }
      setWeather(data);
    } catch (err) {
      setWeather(null); // Clear weather data on error
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city.trim());
    } else {
      setError('Please enter a city name');
    }
  };

  return (
    <div className="weather-card">
      <h2>Weather Information</h2>
      <div className="city-selector">
        <form onSubmit={handleSubmit} className="city-form">
          <label htmlFor="city-input">Enter City Name:</label>
          <div className="input-group">
            <input
              id="city-input"
              type="text"
              value={city}
              onChange={(e) => {
                setError(null);
                setCity(e.target.value);
              }}
              placeholder="Enter city name..."
              className="city-input"
              required
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="error">{error}</div>}
      
      {weather && !loading && (
        <div className="weather-info">
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <div className="weather-details">
            <div className="weather-item main-temp">
              <img 
                src={weather.current.condition.icon} 
                alt={weather.current.condition.text}
                className="weather-icon"
              />
              <div className="temp-container">
                <span className="temp-value">{weather.current.temp_c}°C</span>
                <span className="condition-text">{weather.current.condition.text}</span>
              </div>
            </div>
            <div className="weather-stats">
              <div className="weather-item">
                <span className="weather-label">Feels like</span>
                <span className="weather-value">{weather.current.feelslike_c}°C</span>
              </div>
              <div className="weather-item">
                <span className="weather-label">Humidity</span>
                <span className="weather-value">{weather.current.humidity}%</span>
              </div>
              <div className="weather-item">
                <span className="weather-label">Wind</span>
                <span className="weather-value">{weather.current.wind_kph} km/h</span>
              </div>
              {weather.current.air_quality && (
                <div className="weather-item">
                  <span className="weather-label">Air Quality (PM2.5)</span>
                  <span className="weather-value">
                    {weather.current.air_quality.pm2_5.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;