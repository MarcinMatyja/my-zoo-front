import axios from "axios";
const BASE_URL = "http://localhost:1337/api";

export default axios.create({
  baseURL: BASE_URL,
});
