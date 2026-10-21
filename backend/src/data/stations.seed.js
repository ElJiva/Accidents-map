"use strict";

const seedStations = [
  {
    id: "STAT-001",
    name: "Estación Central de Bomberos Apolo",
    type: "bomberos",
    status: "activa",
    description: "Estación central del Heroico Cuerpo de Bomberos de León",
    units: 14,
    location: {
      type: "Point",
      coordinates: [-101.6820, 21.1290],
    },
    createdAt: "2026-01-08T09:00:00.000Z",
    updatedAt: "2026-01-08T09:00:00.000Z",
  },
  {
    id: "STAT-002",
    name: "Estación de Bomberos Poniente",
    type: "bomberos",
    status: "activa",
    description: "Subestación de bomberos y rescate en Blvd. Mariano Escobedo",
    units: 8,
    location: {
      type: "Point",
      coordinates: [-101.7115, 21.1265],
    },
    createdAt: "2026-01-16T11:00:00.000Z",
    updatedAt: "2026-01-16T11:00:00.000Z",
  },
  {
    id: "STAT-003",
    name: "Comandancia de Policía CEPOL Poniente",
    type: "policia",
    status: "activa",
    description: "Centro de policía municipal y seguridad pública zona San Juan Bosco",
    units: 25,
    location: {
      type: "Point",
      coordinates: [-101.7180, 21.1350],
    },
    createdAt: "2026-01-25T14:20:00.000Z",
    updatedAt: "2026-01-25T14:20:00.000Z",
  },
  {
    id: "STAT-004",
    name: "Comandancia de Policía CEPOL Norte",
    type: "policia",
    status: "activa",
    description: "Estación de policía municipal para vigilancia del sector norte",
    units: 18,
    location: {
      type: "Point",
      coordinates: [-101.6620, 21.1520],
    },
    createdAt: "2026-02-04T08:15:00.000Z",
    updatedAt: "2026-02-04T08:15:00.000Z",
  },
  {
    id: "STAT-005",
    name: "Base Central de Protección Civil León",
    type: "proteccion_civil",
    status: "activa",
    description: "Coordinación operativa y atención de emergencias de Protección Civil",
    units: 10,
    location: {
      type: "Point",
      coordinates: [-101.6790, 21.1205],
    },
    createdAt: "2026-02-14T10:30:00.000Z",
    updatedAt: "2026-02-14T10:30:00.000Z",
  },
  {
    id: "STAT-006",
    name: "Módulo de Protección Civil y Auxilio Las Joyas",
    type: "proteccion_civil",
    status: "inactiva",
    description: "Módulo de respuesta ciudadana temporalmente en mantenimiento técnico",
    units: 3,
    location: {
      type: "Point",
      coordinates: [-101.7500, 21.1220],
    },
    createdAt: "2026-03-02T16:00:00.000Z",
    updatedAt: "2026-03-05T12:00:00.000Z",
  },
];

module.exports = { seedStations };
