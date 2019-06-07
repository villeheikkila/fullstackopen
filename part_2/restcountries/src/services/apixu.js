import axios from "axios";
const baseUrl =
  "http://api.apixu.com/v1/current.json?key=d6be1fd112814c5481c11105190706&q=";

const getWeather = async capital => {
  const response = await axios.get(`${baseUrl}${capital}`);
  return response.data.current;
};

export default getWeather;
