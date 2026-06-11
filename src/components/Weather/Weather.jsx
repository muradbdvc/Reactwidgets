import React, { useEffect, useRef, useState } from 'react'
import './weather.scss'
import search_icon from '../../assets/search.png'
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'
import wind_icon from '../../assets/wind.png'
import humidity_icon from '../../assets/humidity.png'

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef();

  const allIcons = {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,    
    "04d":drizzle_icon,
    "04n":drizzle_icon,    
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }

  const search = async (city) => {
    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
      localStorage.setItem('last_city', city);
      setShowSuggestions(false);
    }catch(error){
    }
  }

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_APP_ID}`
      );
      const data = await res.json();
      setSuggestions(data.map((city) => `${city.name}, ${city.country}`));
      setShowSuggestions(true);
    } catch {}
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (inputRef.current) inputRef.current.value = value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  }

  const selectSuggestion = (city) => {
    if (inputRef.current) inputRef.current.value = city.split(',')[0];
    setShowSuggestions(false);
    search(city.split(',')[0]);
  }

  useEffect(() => {
    const lastCity = localStorage.getItem('last_city') || 'london';
    search(lastCity);
  }, [])

  return (
    <div>
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' onChange={handleInputChange} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} onKeyDown={(e) => e.key === 'Enter' && search(inputRef.current.value)} />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="suggestions">
                    {suggestions.map((s, i) => (
                      <div key={i} className="suggestion-item" onClick={() => selectSuggestion(s)}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div><p>{weatherData.humidity} %</p></div>
                <span>Humidity</span>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div><p>{weatherData.windSpeed} km/h</p></div>
                <span>Wind Speed</span>
              </div>
            </div>
        </div>
        
    </div>
  )
}

export default Weather
