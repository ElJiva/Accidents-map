"use strict";

const express = require("express");
const HospitalsService = require("../services/hospitals.service");

const router = express.Router();
const service = new HospitalsService();

// GET /api/hospitals — Listar todos (con filtros opcionales)
router.get("/", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      type: req.query.type,
      status: req.query.status,
    };

    const hospitals = await service.getAll(filters);

    res.status(200).json({
      count: hospitals.length,
      data: hospitals,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/hospitals/geojson — GeoJSON de los hospitales y clínicas
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

// GET /api/hospitals/:id — Obtener uno por ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const hospital = await service.getById(id);

    res.status(200).json({
      data: hospital,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
