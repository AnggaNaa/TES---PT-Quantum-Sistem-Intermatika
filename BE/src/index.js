const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const apiUrl = "http://corenet.usadi.co.id/BaseAPI/Pegawai";
const apiUrl2 = "http://corenet.usadi.co.id/BaseAPI/User";

app.get("/test", (req, res) => {
  res.send("Hello World!");
});
app.use("/pegawai", async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/user", (req, res) => {
  try {
    const response = axios.get(apiUrl2, { params: req.query });
    res.json(response);
  } catch {
    res.status(500).json({ error: "Password Salah" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
