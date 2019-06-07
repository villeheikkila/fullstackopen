import React, { useState, useEffect } from "react";
import getWeather from "../services/apixu";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  getWeather(capital).then(e => setWeather(e));

  if (weather === undefined) {
    return <p>Loading...</p>;
  } else {
    console.log(weather);
    const temp = weather.temp_c;
    const conditionURL = `http:${weather.condition.icon}`;
    const wind = weather.wind_kph;
    const windDirection = weather.wind_dir;
    return (
      <form>
        <b>temperature</b> {temp}
        <br />
        <img src={conditionURL} alt="Loading..." />
        <br />
        <b>wind </b> {wind} <b> direction</b> {windDirection}
      </form>
    );
  }
};
export default Weather;
