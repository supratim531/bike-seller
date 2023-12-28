import axios from 'axios';

const baseAPI = "";

export const authorizedAxios = (token) => axios.create({
  baseURL: baseAPI,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Access-Control-Allow-Origin": '*'
  }
});

export const unauthorizedAxios = axios.create({
  baseURL: baseAPI,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": '*'
  }
});

authorizedAxios.interceptors.response.use(res => {
  console.log("authorizedAxios response:", res);
  return res;
}, err => {
  console.log("authorizedAxios response:", err);

  if (err.response.status === 401) {
    // logout
  }

  throw err;
});

unauthorizedAxios.interceptors.response.use(res => {
  console.log("unauthorizedAxios response:", res);
  return res;
}, err => {
  console.log("unauthorizedAxios response:", err);

  if (err.response.status === 500) {
    // internal server error
  }

  throw err;
});
