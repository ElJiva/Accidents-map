"use strict";

const seedWifiSpots = [
  {
    id: "WIFI-001",
    name: "WiFi Plaza Principal de León",
    type: "plaza",
    status: "activa",
    description: "Punto de acceso a internet público en el jardín principal frente a la presidencia",
    speedMbps: 50.5,
    location: {
      type: "Point",
      coordinates: [-101.6835, 21.1225],
    },
    createdAt: "2026-01-09T08:00:00.000Z",
    updatedAt: "2026-01-09T08:00:00.000Z",
  },
  {
    id: "WIFI-002",
    name: "WiFi Parque Explora",
    type: "parque",
    status: "activa",
    description: "Red inalámbrica ciudadana en explanada central del Centro de Ciencias Explora",
    speedMbps: 40.0,
    location: {
      type: "Point",
      coordinates: [-101.6590, 21.1310],
    },
    createdAt: "2026-01-18T10:15:00.000Z",
    updatedAt: "2026-01-18T10:15:00.000Z",
  },
  {
    id: "WIFI-003",
    name: "WiFi Biblioteca Central Wigberto Jiménez Moreno",
    type: "edificio_publico",
    status: "activa",
    description: "Conexión gratuita de alta velocidad dentro de la biblioteca en Forum Cultural",
    speedMbps: 100.0,
    location: {
      type: "Point",
      coordinates: [-101.6545, 21.1335],
    },
    createdAt: "2026-01-26T12:00:00.000Z",
    updatedAt: "2026-01-26T12:00:00.000Z",
  },
  {
    id: "WIFI-004",
    name: "WiFi Presidencia Municipal de León",
    type: "edificio_publico",
    status: "activa",
    description: "Punto WiFi público en patio central del Palacio Municipal",
    speedMbps: 65.0,
    location: {
      type: "Point",
      coordinates: [-101.6840, 21.1228],
    },
    createdAt: "2026-02-05T09:30:00.000Z",
    updatedAt: "2026-02-05T09:30:00.000Z",
  },
  {
    id: "WIFI-005",
    name: "WiFi Plaza del Músico",
    type: "plaza",
    status: "intermitente",
    description: "Red inalámbrica municipal en plaza pública cerca del centro",
    speedMbps: 20.5,
    location: {
      type: "Point",
      coordinates: [-101.6890, 21.1250],
    },
    createdAt: "2026-02-21T11:00:00.000Z",
    updatedAt: "2026-02-28T16:00:00.000Z",
  },
  {
    id: "WIFI-006",
    name: "WiFi Parque Metropolitano Zona Náutica",
    type: "parque",
    status: "caida",
    description: "Punto de acceso en área de servicios del Parque Metropolitano en revisión técnica",
    speedMbps: 30.0,
    location: {
      type: "Point",
      coordinates: [-101.6450, 21.1550],
    },
    createdAt: "2026-03-03T14:00:00.000Z",
    updatedAt: "2026-03-07T10:00:00.000Z",
  },
];

module.exports = { seedWifiSpots };
