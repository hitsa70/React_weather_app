import React from 'react';

import "./CSS/ToggleData.css";

function convertTime(unixTime) {
    let dt = new Date((unixTime) * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}

const ToggleData = (props) => {
    return (
        <div className="card">
            <h3>Wind Speed</h3>
            <p>{props.weatherData.wind.speed} meter/sec</p>
            <h3>Humidity</h3>
            <p>{props.weatherData.main.humidity} %</p>
            <h3>Pressure</h3>
            <p>{props.weatherData.main.pressure} hPa</p>
            <h3>Sunrise time</h3>
            <p>{convertTime(props.weatherData.sys.sunrise)} am</p>
            <h3>Sunset time</h3>
            <p>{convertTime(props.weatherData.sys.sunset)} pm</p>
        </div>);
}

export default ToggleData;


