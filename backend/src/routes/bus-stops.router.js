"use strict";

const express = require("express");
const BusStopsService = require("../services/bus-stops.service");

const router = express.Router();
const service = new BusStopsService();

// GET /api/bus-stops — Listar todas las paradas (con filtros opcionales)
router.get("/", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      type: req.query.type,
      status: req.query.status,
    };

    const busStops = await service.getAll(filters);

    res.status(200).json({
      count: busStops.length,
      data: busStops,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/bus-stops/geojson — GeoJSON de las paradas de transporte
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

// GET /api/bus-stops/:id — Obtener una parada por ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const busStop = await service.getById(id);

    res.status(200).json({
      data: busStop,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
