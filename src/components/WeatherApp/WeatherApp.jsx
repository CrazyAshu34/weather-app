import React, { useState } from "react";
import search from "../../components/Assets/search.png";
import cloud from "../../components/Assets/cloud.png";
import clearSky from "../../components/Assets/clear.png";
import drizzle from "../../components/Assets/drizzle.png";
import rain from "../../components/Assets/rain.png";
import snow from "../../components/Assets/snow.png";
import humidity from "../../components/Assets/humidity.png";
import wind from "../../components/Assets/wind.png";
import "./WeatherApp.css";

const WeatherApp = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [cityInput, setCityInput] = useState("");
    const [error, setError] = useState(null);
    const [Wicon, setWicon] = useState(cloud);

    const fetchData = async () => {
        try {
            if (!cityInput.trim()) {
                return;
            }

            let apiKey = "a31de02f49a8a0c91ad6f8aabafeae6c";
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`
            );

            if (!data.ok) {
                throw new Error(`Failed to fetch data: ${data.statusText}`);
            }

            const weatherData = await data.json();
            setCurrentWeather(weatherData);
            setWindSpeed(weatherData.wind.speed);
            setError(null);

            // Fixing the icon assignment based on weather conditions
            if (weatherData.weather[0].icon === "01d" || weatherData.weather[0].icon === "01n") {
                setWicon(clearSky);
            } else if (weatherData.weather[0].icon === "02d" || weatherData.weather[0].icon === "02n") {
                setWicon(cloud);
            } else if (weatherData.weather[0].icon === "03d" || weatherData.weather[0].icon === "03n") {
                setWicon(drizzle);
            } else if (weatherData.weather[0].icon === "04d" || weatherData.weather[0].icon === "04n") {
                setWicon(drizzle);
            } else if (weatherData.weather[0].icon === "09d" || weatherData.weather[0].icon === "09n") {
                setWicon(rain);
            } else if (weatherData.weather[0].icon === "10d" || weatherData.weather[0].icon === "10n") {
                setWicon(rain);
            } else if (weatherData.weather[0].icon === "13d" || weatherData.weather[0].icon === "13n") {
                setWicon(snow);
            } else {
                setWicon(clearSky);
            }
        } catch (error) {
            console.error("Error fetching weather data", error);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setCityInput("");
        }
    };

    const handleButtonClick = () => {
        fetchData();
    };

    return (
        <div>
            <div className="home">
                <div className="container">
                    <input
                        onChange={(e) => setCityInput(e.target.value)}
                        value={cityInput}
                        className="weather-inp"
                        placeholder="Country name"
                    />
                    <button onClick={handleButtonClick} className="weather-btn">
                        <img className="search-img" src={search} alt="" />
                    </button>
                    {error && <p className="error-message">{error}</p>}

                    <div className="weather-img">
                        <img className="cloud" src={Wicon} alt="" />
                    </div>

                    <h1 className="temp">
                        {currentWeather
                            ? `${(currentWeather.main.temp - 273.15).toFixed(2)} °C`
                            : "Loading..."}
                    </h1>
                    <h2 className="city">
                        {currentWeather ? currentWeather.name : "Loading..."}
                    </h2>
                    <div className="humidity-and-wind">
                        <div>
                            <img className="img-size" src={humidity} alt="" />
                            <span className="span-element">
                                {currentWeather ? currentWeather.main.humidity : "Loading..."}
                                %
                            </span>
                            <p className="last-p1">humidity</p>
                        </div>
                        <div>
                            <img className="img-size" src={wind} alt="" />
                            <span className="span-element">
                                {windSpeed !== null ? `${windSpeed} km/h` : "Loading..."}
                            </span>
                            <p className="last-p2">Wind speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
