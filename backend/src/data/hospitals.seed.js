"use strict";

const seedHospitals = [
  {
    id: "HOSP-001",
    name: "Hospital General de León",
    type: "hospital",
    status: "operando",
    description: "Hospital público regional de alta especialidad en León",
    beds: 250,
    location: {
      type: "Point",
      coordinates: [-101.6695, 21.1210],
    },
    createdAt: "2026-01-05T08:00:00.000Z",
    updatedAt: "2026-01-05T08:00:00.000Z",
  },
  {
    id: "HOSP-002",
    name: "Hospital Ángeles León",
    type: "hospital",
    status: "operando",
    description: "Hospital privado de tercer nivel en Blvd. Campestre",
    beds: 180,
    location: {
      type: "Point",
      coordinates: [-101.6480, 21.1380],
    },
    createdAt: "2026-01-12T10:30:00.000Z",
    updatedAt: "2026-01-12T10:30:00.000Z",
  },
  {
    id: "HOSP-003",
    name: "Clínica de Medicina Familiar ISSSTE",
    type: "clinica",
    status: "saturado",
    description: "Clínica de atención médica ambulatoria y medicina familiar",
    beds: 25,
    location: {
      type: "Point",
      coordinates: [-101.6750, 21.1150],
    },
    createdAt: "2026-01-20T07:45:00.000Z",
    updatedAt: "2026-01-20T07:45:00.000Z",
  },
  {
    id: "HOSP-004",
    name: "Cruz Roja Mexicana Delegación León",
    type: "cruz_roja",
    status: "operando",
    description: "Base de emergencias médicas y atención de urgencias de la Cruz Roja",
    beds: 35,
    location: {
      type: "Point",
      coordinates: [-101.6855, 21.1275],
    },
    createdAt: "2026-02-01T09:00:00.000Z",
    updatedAt: "2026-02-15T14:00:00.000Z",
  },
  {
    id: "HOSP-005",
    name: "Hospital Aranda de la Parra",
    type: "hospital",
    status: "operando",
    description: "Hospital privado de gran trayectoria en el centro de León",
    beds: 160,
    location: {
      type: "Point",
      coordinates: [-101.6830, 21.1255],
    },
    createdAt: "2026-02-18T11:20:00.000Z",
    updatedAt: "2026-03-01T09:30:00.000Z",
  },
  {
    id: "HOSP-006",
    name: "Clínica Médica San Jerónimo",
    type: "clinica",
    status: "cerrado",
    description: "Clínica privada de consulta externa en remodelación temporal",
    beds: 12,
    location: {
      type: "Point",
      coordinates: [-101.6720, 21.1410],
    },
    createdAt: "2026-03-05T15:00:00.000Z",
    updatedAt: "2026-03-05T15:00:00.000Z",
  },
];

module.exports = { seedHospitals };
