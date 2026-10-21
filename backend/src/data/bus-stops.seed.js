"use strict";

const seedBusStops = [
  {
    id: "BUS-001",
    name: "Paradero Poliforum",
    type: "troncal",
    status: "operando",
    description: "Paradero troncal del SIT Optibús sobre Blvd. Adolfo López Mateos",
    routesCount: 8,
    location: {
      type: "Point",
      coordinates: [-101.6565, 21.1145],
    },
    createdAt: "2026-01-07T06:30:00.000Z",
    updatedAt: "2026-01-07T06:30:00.000Z",
  },
  {
    id: "BUS-002",
    name: "Estación de Transferencia San Jerónimo",
    type: "troncal",
    status: "operando",
    description: "Terminal multimodal de transferencia del sistema Optibús zona norte",
    routesCount: 16,
    location: {
      type: "Point",
      coordinates: [-101.6760, 21.1510],
    },
    createdAt: "2026-01-14T07:00:00.000Z",
    updatedAt: "2026-01-14T07:00:00.000Z",
  },
  {
    id: "BUS-003",
    name: "Estación de Transferencia Delta",
    type: "troncal",
    status: "operando",
    description: "Terminal multimodal de transferencia del SIT en el oriente de la ciudad",
    routesCount: 20,
    location: {
      type: "Point",
      coordinates: [-101.6140, 21.0965],
    },
    createdAt: "2026-01-22T08:00:00.000Z",
    updatedAt: "2026-01-22T08:00:00.000Z",
  },
  {
    id: "BUS-004",
    name: "Parada Alimentadora A-02 Los Olivos",
    type: "alimentadora",
    status: "operando",
    description: "Parada de ruta alimentadora conectando colonias del suroeste",
    routesCount: 3,
    location: {
      type: "Point",
      coordinates: [-101.7100, 21.1080],
    },
    createdAt: "2026-02-02T09:15:00.000Z",
    updatedAt: "2026-02-02T09:15:00.000Z",
  },
  {
    id: "BUS-005",
    name: "Parada Auxiliar X-04 Blvd. Aeropuerto",
    type: "auxiliar",
    status: "operando",
    description: "Parada de ruta auxiliar de transporte sobre Blvd. Aeropuerto",
    routesCount: 4,
    location: {
      type: "Point",
      coordinates: [-101.6020, 21.0780],
    },
    createdAt: "2026-02-17T11:45:00.000Z",
    updatedAt: "2026-02-17T11:45:00.000Z",
  },
  {
    id: "BUS-006",
    name: "Paradero Expiatorio",
    type: "troncal",
    status: "suspendida",
    description: "Paradero troncal centro temporalmente suspendido por obras viales",
    routesCount: 6,
    location: {
      type: "Point",
      coordinates: [-101.6815, 21.1210],
    },
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-06T15:30:00.000Z",
  },
];

module.exports = { seedBusStops };
