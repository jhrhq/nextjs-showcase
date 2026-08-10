import axios from "axios";

export const moviesApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
