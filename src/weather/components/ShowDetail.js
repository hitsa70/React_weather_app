import React from 'react';

import "./CSS/ShowDetail.css";

const ShowDetail = (props) => {

    return (
        <div >
            <h2>-- {props.weatherData.name} {Date(props.weatherData.sys.sunset * 1000).slice(4, 16)} --</h2>
            <h3>Weather description</h3>
            <p >{props.weatherData.weather[0].description}</p>
            <h3>Temperature</h3>
            <p>{props.weatherData.main.temp}<sup>°C</sup></p>
            <h3>Today's high</h3>
            <p>{props.weatherData.main.temp_max}<sup>°C</sup></p>
            <h3>Today's low</h3>
            <p>{props.weatherData.main.temp_min}<sup>°C</sup></p>
        </div>);
}

export default ShowDetail;