"use strict";

const express = require("express");
const StationsService = require("../services/stations.service");

const router = express.Router();
const service = new StationsService();

// GET /api/stations — Listar todas las estaciones (con filtros opcionales)
router.get("/", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      type: req.query.type,
      status: req.query.status,
    };

    const stations = await service.getAll(filters);

    res.status(200).json({
      count: stations.length,
      data: stations,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/stations/geojson — GeoJSON de las estaciones de emergencia
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

// GET /api/stations/:id — Obtener una estación por ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const station = await service.getById(id);

    res.status(200).json({
      data: station,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
