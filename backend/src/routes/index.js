"use strict";

const express = require("express");

const incidentRouter = require("./incidents.router");
const hospitalsRouter = require("./hospitals.router");
const stationsRouter = require("./stations.router");
const busStopsRouter = require("./bus-stops.router");
const wifiSpotsRouter = require("./wifi-spots.router");

function routerApi(app) {
    const apiRouter = express.Router();
    app.use("/api", apiRouter);

    apiRouter.use("/incidents", incidentRouter);
    apiRouter.use("/hospitals", hospitalsRouter);
    apiRouter.use("/stations", stationsRouter);
    apiRouter.use("/bus-stops", busStopsRouter);
    apiRouter.use("/wifi-spots", wifiSpotsRouter);
}

module.exports = routerApi;