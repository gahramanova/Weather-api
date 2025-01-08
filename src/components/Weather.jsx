import React, { useEffect, useRef, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";


const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Please add the city name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Lublin");
  }, []);

  return (
    <>
      <div className="weather">
        <div className="search-app">
          <input ref={inputRef} type="text" placeholder="Search"  />
          <IoMdSearch className="search" onClick={()=> search(inputRef.current.value)} />
        </div>
        {weatherData && (
          <>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather-icon"
            />
            <h1 className="text-light temperature">{weatherData.temperature}°C</h1>
            <h5 className="text-light location">{weatherData.location}</h5>

            <div className="weather-data">
              <div className="col">
                <WiHumidity style={{ width: "50px", height: "50px" }} />
                <div>
                  <p className="m-0">{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <LuWind style={{width:"50px", height:"50px"}}/>
                <div>
                  <p className="m-0">{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
