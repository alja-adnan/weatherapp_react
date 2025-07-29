import { useEffect, useState } from "react";
import searchIcon from "../assets/images/search.png";
import clouds_icon from "../assets/images/clouds.png";
import clear_icon from "../assets/images/clear.png";
import drizzle_icon from "../assets/images/drizzle.png";
import rain_icon from "../assets/images/rain.png";
import mist_icon from "../assets/images/mist.png";
import snow_icon from "../assets/images/snow.png";

import humidityIcon from "../assets/images/humidity.png";
import windIcon from "../assets/images/wind.png";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData,setWeatherData] = useState("");
  const allIcons = {
    
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clouds_icon,
    "02n": clouds_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": mist_icon,
    "010n": mist_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  };

   const API_Key = "adfb0f6e8459f912326fdf900de7d775";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
 


  const fetchWeatherData= async(city)=>{
    try {
       
        const response = await fetch(url);
        const data=await response.json();
        console.log(data);

        const icon = allIcons[data.weather[0].icon] || clear_icon
        setWeatherData({
            humidity:data.main.humidity,
            wind:data.wind.speed,
            temp:Math.floor(data.main.temp),
            location:data.name,
            icon:icon
           
           
        })
    } catch (error) {
         console.log(error)


    }
  }

  useEffect(()=>{
    fetchWeatherData();
  },[])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4">
   <div className="bg-gradient-to-b from-sky-300 to-blue-300 p-6 sm:p-8 rounded-2xl w-full max-w-[400px] h-[580px] sm:h-[600px] flex flex-col justify-between shadow-xl">

       

      
        <div className="flex items-center justify-between bg-white rounded-full px-4 py-2 shadow mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="outline-none bg-transparent flex-1 text-gray-800 text-sm sm:text-base placeholder:text-gray-500"
          />
          <button onClick={()=>fetchWeatherData(city)}>
            <img
              src={searchIcon}
              alt="Search"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            />
          </button>
        </div>

    
        <div className="flex justify-center mb-6">
          <img
            src={weatherData.icon|| clear_icon}
            alt="Weather Icon"
            className="w-28 sm:w-32 md:w-40"
          />
        </div>

       
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 mb-2">
          {weatherData.temp}°C
        </h1>

        {/* City */}
        <p className="text-center text-xl sm:text-3xl font-medium text-blue-900 mb-6">
          {weatherData.location}
        </p>

       
        <div className="flex flex-wrap justify-between gap-4 px-4 text-blue-900">
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <img src={humidityIcon} alt="Humidity" className="w-8 mb-1" />
            <p className="text-sm sm:text-base">{weatherData.humidity}%</p>
            <p className="text-xs sm:text-sm">Humidity</p>
          </div>

          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <img src={windIcon} alt="Wind" className="w-8 mb-1" />
            <p className="text-sm sm:text-base">{weatherData.wind}km/h</p>
            <p className="text-xs sm:text-sm">Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

