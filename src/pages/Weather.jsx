import React, { useState } from "react";
import { getForecastByCity } from "../services/weatherService";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setForecast([]);

    try {
      const res = await getForecastByCity(city.trim());
      const dailyData = [res.data.list[0], res.data.list[8], res.data.list[16]];
      setForecast(dailyData);
    } catch (err) {
      setError("City not found. Please check spelling.");
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" });

  const getCustomIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "/icons/sun.svg";
    if (desc.includes("cloud")) return "/icons/cloudy.svg";
    if (desc.includes("rain") || desc.includes("drizzle"))
      return "/icons/rain.svg";
    if (desc.includes("snow") || desc.includes("sleet"))
      return "/icons/snow.svg";
    if (desc.includes("thunderstorm")) return "/icons/rain.svg";
    return "/icons/default.png";
  };

  const getBackgroundType = (weatherMain, temp) => {
    if (
      weatherMain === "Rain" ||
      weatherMain === "Drizzle" ||
      weatherMain === "Thunderstorm"
    ) {
      return "monsoon";
    }

    if (temp >= 30) return "summer";
    if (temp <= 15) return "winter";

    return "summer";
  };

  const bgType =
    forecast.length > 0
      ? getBackgroundType(forecast[0].weather[0].main, forecast[0].main.temp)
      : "summer";

  return (
    <div className="video-bg">
      {bgType === "summer" && (
        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
        >
          <source src="/summer.mp4" type="video/mp4" />
        </video>
      )}

      {bgType === "monsoon" && (
        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
        >
          <source src="/moonsoon.mp4" type="video/mp4" />
        </video>
      )}

      {bgType === "winter" && (
        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
        >
          <source src="/winter.mp4" type="video/mp4" />
        </video>
      )}

      <div className="weather-card">
        <h1>Weather App</h1>

        <div className="search">
          <input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="forecast">
          {forecast.map((day, i) => (
            <div className="day" key={i}>
              <h3>{getDayName(day.dt_txt)}</h3>
              <img
                src={getCustomIcon(day.weather[0].description)}
                alt="weather"
              />
              <h2>{Math.round(day.main.temp)}°C</h2>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
