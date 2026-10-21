"use strict";

const express = require("express");
const IncidentsService = require("../services/incidents.service");
const {
  validateIncidentBody,
  validateIncidentUpdate,
} = require("../middlewares/incident.validator");

const router = express.Router();
const service = new IncidentsService();

// GET /api/incidents — Listar todos (con filtros opcionales)
router.get("/", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      status: req.query.status,
    };

    const incidents = await service.getAll(filters);

    res.status(200).json({
      count: incidents.length,
      data: incidents,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/incidents/geojson — GeoJSON de los incidentes
router.get("/geojson", async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      status: req.query.status,
    };
    const geoJSON = await service.getGeoJSON(filters);
    res.status(200).json(geoJSON);
  } catch (err) {
    next(err);
  }
});

// GET /api/incidents/:id — Obtener uno por ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const incident = await service.getById(id);

    res.status(200).json({
      data: incident,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/incidents — Crear incidente
router.post("/", validateIncidentBody, async (req, res, next) => {
  try {
    const newIncident = await service.create(req.body);

    res.status(201).json({
      message: "Incidente creado correctamente.",
      data: newIncident,
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/incidents/:id — Actualizar incidente
router.patch("/:id", validateIncidentUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedIncident = await service.update(id, req.body);

    res.status(200).json({
      message: "Incidente actualizado correctamente.",
      data: updatedIncident,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/incidents/:id — Eliminar incidente
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedIncident = await service.delete(id);

    res.status(200).json({
      message: "Incidente eliminado correctamente.",
      data: deletedIncident,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;