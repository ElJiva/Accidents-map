"use strict"
const seedIncidents = [
    {
        id: "INC-001",
        title: "Bache frente a la universidad",
        category: "bache",
        description: "Bache profundo que dificulta el paso de vehículos",
        status: "pendiente",
        location: {
            type: "Point",
            coordinates: [-101.6812, 21.1248]
        },
        createdAt: "2026-01-15T12:00:00.000Z",
        updatedAt: "2026-01-15T12:00:00.000Z"
    },
    {
        id: "INC-002",
        title: "Luminaria apagada en Las Joyas",
        category: "alumbrado",
        description: "La lámpara de la calle permanece apagada durante la noche",
        status: "pendiente",
        location: {
            type: "Point",
            coordinates: [-101.75, 21.12]
        },
        createdAt: "2026-01-22T19:00:00.000Z",
        updatedAt: "2026-01-22T19:00:00.000Z"
    },
    {
        id: "INC-003",
        title: "Basura acumulada en San Miguel",
        category: "basura",
        description: "Hay bolsas de basura acumuladas junto a la banqueta",
        status: "pendiente",
        location: {
            type: "Point",
            coordinates: [-101.67, 21.11]
        },
        createdAt: "2026-01-27T07:30:00.000Z",
        updatedAt: "2026-01-27T07:30:00.000Z"
    },
    {
        id: "INC-004",
        title: "Fuga de agua en la colonia Andrade",
        category: "fuga",
        description: "Agua potable brota de una tubería debajo de la banqueta",
        status: "pendiente",
        location: {
            type: "Point",
            coordinates: [-101.69, 21.12]
        },
        createdAt: "2026-01-31T06:50:00.000Z",
        updatedAt: "2026-01-31T06:50:00.000Z"
    },
    {
        id: "INC-005",
        title: "Choque en bulevar López Mateos",
        category: "accidente",
        description: "Colisión entre dos vehículos que reduce el paso en un carril",
        status: "pendiente",
        location: {
            type: "Point",
            coordinates: [-101.68, 21.12]
        },
        createdAt: "2026-02-04T13:40:00.000Z",
        updatedAt: "2026-02-04T13:40:00.000Z"
    }
];

module.exports = { seedIncidents };
