"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");

const {
  notFoundHandler,
  logErrors,
  errorHandler,
} = require("./middlewares/errorhandler");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    name: "API de Incidentes Urbanos y Entidades Georreferenciadas",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      incidents: "/api/incidents",
      hospitals: "/api/hospitals",
      stations: "/api/stations",
      busStops: "/api/bus-stops",
      wifiSpots: "/api/wifi-spots",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "El servidor funciona correctamente",
    timestamp: new Date().toISOString(),
  });
});

routerApi(app);

app.use(notFoundHandler);
app.use(logErrors);
app.use(errorHandler);

module.exports = app;
