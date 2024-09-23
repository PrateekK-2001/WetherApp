import React, { useEffect, useRef, useState } from 'react';
import './Weather.CSS';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const Weather = () => {
  // Create input ref
  const inputRef = useRef();

  // Store weather data
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Icon mapping based on weather id from the API
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const apiKey = import.meta.env.VITE_APP_ID; // Get the API key from environment variable

  const search = async (city) => {
    if (!city) return; // Exit if no city is provided
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      console.log(data);

      // Save the weather icon based on API response
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      // Update weather data from the API
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp), // convert temperature to integer
        location: data.name,
        icon: icon, // use the mapped icon
      });

      setError(''); // Reset error
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search("London"); // Example default city
  }, []);

  return (
    <div className='weather'>
      <div className='Search-bar'>
        <input ref={inputRef} type='text' placeholder='Search city...' />
        <img
          src={search_icon}
          alt='Search Icon'
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      {weatherData ? (
        <>
          <img src={weatherData.icon || clear_icon} alt='' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='' />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Weather;
