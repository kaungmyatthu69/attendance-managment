import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

import { API_URL } from "@/config";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(async (config: any) => {
  const token = await SecureStore.getItemAsync("token");
  console.log('token',token)
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.response && error.response.data) {
      console.log("Global API error:", error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;
