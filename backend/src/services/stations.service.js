"use strict";

const { randomUUID } = require("node:crypto");
const { seedStations } = require("../data/stations.seed");
const AppError = require("../utils/appError");

class StationsService {
  constructor() {
    this.stations = structuredClone(seedStations);
  }

  async getAll(filters = {}) {
    const { search = "", type = "all", status = "all" } = filters;

    let result = [...this.stations];

    const normalizedSearch = this.normalizeText(search);

    if (normalizedSearch) {
      result = result.filter((station) => {
        const searchableContent = this.normalizeText(
          `${station.name} ${station.description} ${station.type}`
        );
        return searchableContent.includes(normalizedSearch);
      });
    }

    if (type && type !== "all") {
      result = result.filter((station) => station.type === type);
    }

    if (status && status !== "all") {
      result = result.filter((station) => station.status === status);
    }

    result.sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    );

    return result;
  }

  async getById(id) {
    const station = this.stations.find((item) => item.id === id);
    if (!station) {
      throw new AppError(404, `No se encontró la estación de emergencia con ID: ${id}`);
    }
    return station;
  }

  async create(data) {
    const currentDate = new Date().toISOString();
    const newStation = {
      id: `STAT-${randomUUID()}`,
      name: data.name.trim(),
      type: data.type.trim(),
      status: data.status || "activa",
      description: data.description.trim(),
      units: Number(data.units) || 0,
      location: {
        type: "Point",
        coordinates: [Number(data.longitude), Number(data.latitude)],
      },
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.stations.push(newStation);
    return newStation;
  }

  async getGeoJSON(filters = {}) {
    const stations = await this.getAll(filters);

    return {
      type: "FeatureCollection",
      features: stations.map((station) => ({
        type: "Feature",
        properties: {
          id: station.id,
          name: station.name,
          type: station.type,
          status: station.status,
          description: station.description,
          units: station.units,
          createdAt: station.createdAt,
          updatedAt: station.updatedAt,
        },
        geometry: station.location,
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

module.exports = StationsService;
