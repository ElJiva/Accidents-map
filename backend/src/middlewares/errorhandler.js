"use strict";
const AppError = require("../utils/appError");

// Ruta no encontrada
function notFoundHandler(req, res, next) {
  next(
    new AppError(404, `No existe la ruta ${req.method} ${req.originalUrl}.`)
  );
}

// Registrar en consola
function logErrors(err, req, res, next) {
  console.error("\n------------ERROR--------------");
  console.error("Fecha:", new Date().toISOString());
  console.error("Método:", req.method);
  console.error("Ruta:", req.originalUrl);
  console.error("Mensaje:", err.message);

  if (err.stack) {
    console.error(err.stack);
  }
  console.error("-------------ERROR----------------\n");
  next(err);
}

// Respuesta final de Error
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  // Error producido por un JSON mal escrito en el body
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "El cuerpo del JSON contiene un error de sintaxis",
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
      },
    });
  }
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500
      ? "Ocurrió un error interno del servidor"
      : err.message;

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message,
      details: err.details || null,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = {
  notFoundHandler,
  logErrors,
  errorHandler,
};
