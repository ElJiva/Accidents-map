"use strict";

const { randomUUID } = require("node:crypto");
const { seedBusStops } = require("../data/bus-stops.seed");
const AppError = require("../utils/appError");

class BusStopsService {
  constructor() {
    this.busStops = structuredClone(seedBusStops);
  }

  async getAll(filters = {}) {
    const { search = "", type = "all", status = "all" } = filters;

    let result = [...this.busStops];

    const normalizedSearch = this.normalizeText(search);

    if (normalizedSearch) {
      result = result.filter((busStop) => {
        const searchableContent = this.normalizeText(
          `${busStop.name} ${busStop.description} ${busStop.type}`
        );
        return searchableContent.includes(normalizedSearch);
      });
    }

    if (type && type !== "all") {
      result = result.filter((busStop) => busStop.type === type);
    }

    if (status && status !== "all") {
      result = result.filter((busStop) => busStop.status === status);
    }

    result.sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    );

    return result;
  }

  async getById(id) {
    const busStop = this.busStops.find((item) => item.id === id);
    if (!busStop) {
      throw new AppError(404, `No se encontró la parada de transporte con ID: ${id}`);
    }
    return busStop;
  }

  async create(data) {
    const currentDate = new Date().toISOString();
    const newBusStop = {
      id: `BUS-${randomUUID()}`,
      name: data.name.trim(),
      type: data.type.trim(),
      status: data.status || "operando",
      description: data.description.trim(),
      routesCount: Number(data.routesCount) || 0,
      location: {
        type: "Point",
        coordinates: [Number(data.longitude), Number(data.latitude)],
      },
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.busStops.push(newBusStop);
    return newBusStop;
  }

  async getGeoJSON(filters = {}) {
    const busStops = await this.getAll(filters);

    return {
      type: "FeatureCollection",
      features: busStops.map((busStop) => ({
        type: "Feature",
        properties: {
          id: busStop.id,
          name: busStop.name,
          type: busStop.type,
          status: busStop.status,
          description: busStop.description,
          routesCount: busStop.routesCount,
          createdAt: busStop.createdAt,
          updatedAt: busStop.updatedAt,
        },
        geometry: busStop.location,
      })),
    };
  }

  normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
}

module.exports = BusStopsService;
