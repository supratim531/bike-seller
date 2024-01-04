import axios from 'axios';
import { logout } from "../utils/logout";

const token = localStorage.getItem("token");
const baseAPI = "https://api.utsavchatterjee.me/api/v1";

export const authorizedAxios = axios.create({
  baseURL: baseAPI,
  headers: {
    "Authorization": `Token ${token}`,
    // Accept: "application/json",
    // "Content-type": "application/json",
    // "Access-Control-Allow-Origin": '*'
  }
});

export const unauthorizedAxios = axios.create({
  baseURL: baseAPI
  // headers: {
  //   Accept: "application/json",
  //   "Content-type": "application/json",
  //   "Access-Control-Allow-Origin": '*'
  // }
});

authorizedAxios?.interceptors?.response?.use(res => {
  console.log("authorizedAxios response:", res);
  return res;
}, err => {
  console.log("authorizedAxios error:", err);

  if (err.response.status === 401 || err.response.status === 403) {
    logout();
  }

  throw err;
});

unauthorizedAxios?.interceptors?.response?.use(res => {
  console.log("unauthorizedAxios response:", res);
  return res;
}, err => {
  console.log("unauthorizedAxios error:", err);

  if (err.response.status === 500) {
    // internal server error
  }

  throw err;
});
