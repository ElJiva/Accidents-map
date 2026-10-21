"use strict";

const express = require("express");
const WifiSpotsService = require("../services/wifi-spots.service");

const router = express.Router();
const service = new WifiSpotsService();

// GET /api/wifi-spots — Listar todas las zonas WiFi (con filtros opcionales)
router.get("/", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      type: req.query.type,
      status: req.query.status,
    };

    const wifiSpots = await service.getAll(filters);

    res.status(200).json({
      count: wifiSpots.length,
      data: wifiSpots,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/wifi-spots/geojson — GeoJSON de las zonas WiFi
router.get("/geojson", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      type: req.query.type,
      status: req.query.status,
    };
    const geoJSON = await service.getGeoJSON(filters);
    res.status(200).json(geoJSON);
  } catch (err) {
    next(err);
  }
});

// GET /api/wifi-spots/:id — Obtener una zona WiFi por ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const wifiSpot = await service.getById(id);

    res.status(200).json({
      data: wifiSpot,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
