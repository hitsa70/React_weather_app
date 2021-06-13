import React, { useState } from 'react';


import ShowDetail from "../components/ShowDetail";
import ToggleData from "../components/ToggleData";
import DrawGraph from "../components/DrawGraph";

import "./CSS/WeatherDetail.css";

const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/weather?q="
}

const WeatherDetail = () => {


    const [CityName, setCityName] = useState();
    const [weatherData, setWeatherData] = useState({});
    const [toggleData, setToggleData] = useState(false);
    const [dataGraph, SetDataGraph] = useState([]);



    const searchCity = evt => {
        if (evt.key === "Enter") {
            { document.title = ` ${CityName}'s weather` };
            fetch(`${api.base}${CityName}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then((result) => {
                    result = setWeatherData(result);

                },

                    (error) => {
                        console.log(error);

                    });
        };
    }
    const toggleNow = () => {
        (toggleData === false) ? setToggleData(true) : setToggleData(false);
        fetchForecast();
    }

    const fetchForecast = () => {
        SetDataGraph([]);
        let endpoint =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${weatherData.coord.lat}` + "&lon=" + `${weatherData.coord.lon}` + "&exclude=current,hourly,minutely,alerts&units=metric&appid=" + `${api.key}` + "";
        let forecastEl = document.getElementsByClassName("forecast");

        fetch(endpoint)
            .then(function (response) {
                if (200 !== response.status) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }
                response.json().then(function (data) {
                    data.daily.forEach((value, index) => {
                        if (index < 7) {
                            let dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
                                weekday: 'long',
                            });
                            let tempHigh = value.temp.max.toFixed(0);
                            let tempLow = value.temp.min.toFixed(0);
                            let tempDay = value.weather[0].description;
                            let newData = {
                                name: dayname,
                                High: parseInt(tempHigh),
                                Low: parseInt(tempLow),
                                desc: tempDay
                            };
                            SetDataGraph((initialState) => [...initialState, newData]);
                        }
                    });
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    };


    return (
        <div className="App">
            <input
                type="text"
                onChange={e => setCityName(e.target.value)}
                value={CityName}
                placeholder="City name..."
                onKeyPress={searchCity}
            />

            {(typeof weatherData.name != "undefined") ? (<div >
                <div className="card">
                    <ShowDetail weatherData={weatherData} />
                    <button
                        onClick={toggleNow}
                    >
                        Toggle Data
                    </button>
                </div>
                {toggleData && <div>
                    <ToggleData
                        weatherData={weatherData}
                    />
                    <DrawGraph
                        dataGraph={dataGraph}
                    />

                </div>
                }


            </div>) : (<p>Type city name and press Enter </p>)}
        </div>
    );
}

export default WeatherDetail;
