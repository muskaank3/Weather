import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

const Weather = () => {

  const inputRef = useRef()
  const [weatherData , setWeatherData] = useState({})

  const search = async (city)=>{
    if(city===""){
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json() ;
      
      if(!response.ok){
        alert(data.message);
        return;
      }

      setWeatherData({
        location: data.name,
             humidity: data.main.humidity,
             windSpeed:data.wind.speed,
             temperature: Math.floor(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`


      })



    }catch(error){
    setWeatherData(false);
    console.log("error in fetching the data")
    }
  }

  useEffect(()=>{
    search("mumbai");
  },[])

  return (
    <div className="page">
      <div className="weather-card">

        {/* 🔍 Search Bar */}
        <div className="search-box">
          <input type="text" ref={inputRef} placeholder="Search city..." />
          <button className="search-btn" onClick={()=> search(inputRef.current.value)}>
            🔍
          </button>
        </div>

        {weatherData?
        <>
          {/* Image */}
        <div className="img-wrap">
          <img
            src={weatherData.icon}
            alt="weather"
          />
        </div>

        {/* Temperature */}
        <h1 className="temp">
          {weatherData.temperature}<span className="unit">°C</span>
        </h1>

        {/* City */}
        <p className="city">{weatherData.location}</p>

        {/* Humidity & Wind */}
        <div className="bottom-row">
          <div className="info-block left">
            <span>Humidity</span>
            <strong>{weatherData.humidity}</strong>
          </div>

          <div className="info-block right">
            <span>Wind</span>
            <strong>{weatherData.windSpeed}</strong>
          </div>
        </div>
        </>:<></>}

      </div>
    </div>
  );
};

export default Weather;






