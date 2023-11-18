import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000/pegawai",
});

export const API2 = axios.create({
  baseURL: "http://localhost:3000/user",
});
