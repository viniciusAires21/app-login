import axios from "axios";

export const instancia = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 1000,
  headers: localStorage.getItem("tk")
    ? { Authorization: localStorage.getItem("tk") }
    : {},
});
