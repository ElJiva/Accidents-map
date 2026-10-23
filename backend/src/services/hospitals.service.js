"use strict";

const { randomUUID } = require("node:crypto");
const { seedHospitals } = require("../data/hospitals.seed");
const AppError = require("../utils/appError");

class HospitalsService {
  constructor() {
    this.hospitals = structuredClone(seedHospitals);
  }

  async getAll(filters = {}) {
    const { search = "", type = "all", status = "all" } = filters;

    let result = [...this.hospitals];

    const normalizedSearch = this.normalizeText(search);

    if (normalizedSearch) {
      result = result.filter((hospital) => {
        const searchableContent = this.normalizeText(
          `${hospital.name} ${hospital.description} ${hospital.type}`
        );
        return searchableContent.includes(normalizedSearch);
      });
    }

    if (type && type !== "all") {
      result = result.filter((hospital) => hospital.type === type);
    }

    if (status && status !== "all") {
      result = result.filter((hospital) => hospital.status === status);
    }

    result.sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    );

    return result;
  }

  async getById(id) {
    const hospital = this.hospitals.find((item) => item.id === id);
    if (!hospital) {
      throw new AppError(404, `No se encontró el hospital o clínica con ID: ${id}`);
    }
    return hospital;
  }

  async create(data) {
    const currentDate = new Date().toISOString();
    const newHospital = {
      id: `HOSP-${randomUUID()}`,
      name: data.name.trim(),
      type: data.type.trim(),
      status: data.status || "operando",
      description: data.description.trim(),
      beds: Number(data.beds) || 0,
      location: {
        type: "Point",
        coordinates: [Number(data.longitude), Number(data.latitude)],
      },
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.hospitals.push(newHospital);
    return newHospital;
  }

  async getGeoJSON(filters = {}) {
    const hospitals = await this.getAll(filters);

    return {
      type: "FeatureCollection",
      features: hospitals.map((hospital) => ({
        type: "Feature",
        properties: {
          id: hospital.id,
          name: hospital.name,
          type: hospital.type,
          status: hospital.status,
          description: hospital.description,
          beds: hospital.beds,
          createdAt: hospital.createdAt,
          updatedAt: hospital.updatedAt,
        },
        geometry: hospital.location,
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

module.exports = HospitalsService;
