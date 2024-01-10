import axios from 'axios';
import { logout } from "../utils/logout";

const token = localStorage.getItem("token");
const baseAPI = "https://api.sautoservice.in/api/v1";
export const domain = "https://api.sautoservice.in";

export const authorizedAxios = axios.create({
  baseURL: baseAPI,
  headers: {
    "Authorization": `Token ${token}`,
    // "ngrok-skip-browser-warning": 69420,
    // Accept: "application/json",
    // "Content-type": "application/json",
    // "Access-Control-Allow-Origin": '*',
  }
});

export const unauthorizedAxios = axios.create({
  baseURL: baseAPI,
  // headers: {
  //   "ngrok-skip-browser-warning": 69420,
  //   "Access-Control-Allow-Origin": '*',
  //   Accept: "application/json",
  //   "Content-type": "application/json",
  // }
});

authorizedAxios?.interceptors?.response?.use(res => {
  console.log("authorizedAxios response:", res);
  return res;
}, err => {
  console.log("authorizedAxios error:", err);

  if (err.response.status === 401 || err.response.status === 403) {
    logout();
  } else if (err.response.status === 500) {
    console.log("500: INTERNAL_SERVER_ERROR");
  }

  throw err;
});

unauthorizedAxios?.interceptors?.response?.use(res => {
  console.log("unauthorizedAxios response:", res);
  return res;
}, err => {
  console.log("unauthorizedAxios error:", err);

  if (err.response.status === 500) {
    console.log("500: INTERNAL_SERVER_ERROR");
  }

  throw err;
});
