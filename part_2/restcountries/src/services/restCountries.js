import axios from "axios";
const baseUrl = "https://restcountries.eu/rest/v2/all";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default getAll;
