import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 60000,
  headers: {},
});

export default instance;
