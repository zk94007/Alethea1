import axios from "axios";
import { appConfig } from "../config/app";

const APP_PLATFORM = "web";

export const request = axios.create({
  withCredentials: true,
  mode: "no-cors",
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1,
    "Access-Control-Allow-Origin": "*",
  },
});

export function setupHttpConfig() {
  request.defaults.baseURL = appConfig.baseUrl;
  request.defaults.timeout = appConfig.defaultTimeout;
  axios.defaults.headers["Content-Type"] = "application/json";

  // you can add more default values for http requests here
  axios.defaults.headers["Authorization"] =
    "Basic " + btoa("admin:Mx9fncRCaMjIoKhyWmO3JPK5dPS4BgxI");
}
