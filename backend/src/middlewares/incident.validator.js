"use strict";

const AppError = require("../utils/appError");

const VALID_CATEGORIES = ["bache", "alumbrado", "basura", "fuga", "accidente"];
const VALID_STATUSES = ["pendiente", "atendido"];

function validateIncidentBody(req, res, next) {
  const { title, category, description, status, latitude, longitude } = req.body;

  const errors = [];

  if (!title || !title.trim()) {
    errors.push("El nombre del incidente es obligatorio.");
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    errors.push(
      `La categoría es obligatoria y debe ser una de: ${VALID_CATEGORIES.join(", ")}.`
    );
  }

  if (!description || !description.trim()) {
    errors.push("La descripción es obligatoria.");
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(
      `El estado debe ser uno de: ${VALID_STATUSES.join(", ")}.`
    );
  }

  if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
    errors.push("La latitud es obligatoria y debe ser un número válido.");
  }

  if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
    errors.push("La longitud es obligatoria y debe ser un número válido.");
  }

  if (errors.length > 0) {
    return next(new AppError(400, "Datos de incidente inválidos.", errors));
  }

  next();
}

function validateIncidentUpdate(req, res, next) {
  const { title, category, description, status, latitude, longitude } = req.body;

  const errors = [];

  if (title !== undefined && !title.trim()) {
    errors.push("El nombre del incidente no puede estar vacío.");
  }

  if (category !== undefined && !VALID_CATEGORIES.includes(category)) {
    errors.push(
      `La categoría debe ser una de: ${VALID_CATEGORIES.join(", ")}.`
    );
  }

  if (description !== undefined && !description.trim()) {
    errors.push("La descripción no puede estar vacía.");
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(
      `El estado debe ser uno de: ${VALID_STATUSES.join(", ")}.`
    );
  }

  if (latitude !== undefined && isNaN(Number(latitude))) {
    errors.push("La latitud debe ser un número válido.");
  }

  if (longitude !== undefined && isNaN(Number(longitude))) {
    errors.push("La longitud debe ser un número válido.");
  }

  if (errors.length > 0) {
    return next(new AppError(400, "Datos de actualización inválidos.", errors));
  }

  next();
}

module.exports = {
  validateIncidentBody,
  validateIncidentUpdate,
};
