import axios from "axios";

const API_KEY = "bdc9d79c75bbcf978bd411bf46467680";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getForecastByCity = (city) => {
  return axios.get(BASE_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });
};
