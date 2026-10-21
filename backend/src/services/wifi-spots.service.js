"use strict";

const { seedWifiSpots } = require("../data/wifi-spots.seed");
const AppError = require("../utils/appError");

class WifiSpotsService {
  constructor() {
    this.wifiSpots = structuredClone(seedWifiSpots);
  }

  async getAll(filters = {}) {
    const { search = "", type = "all", status = "all" } = filters;

    let result = [...this.wifiSpots];

    const normalizedSearch = this.normalizeText(search);

    if (normalizedSearch) {
      result = result.filter((wifiSpot) => {
        const searchableContent = this.normalizeText(
          `${wifiSpot.name} ${wifiSpot.description} ${wifiSpot.type}`
        );
        return searchableContent.includes(normalizedSearch);
      });
    }

    if (type && type !== "all") {
      result = result.filter((wifiSpot) => wifiSpot.type === type);
    }

    if (status && status !== "all") {
      result = result.filter((wifiSpot) => wifiSpot.status === status);
    }

    result.sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    );

    return result;
  }

  async getById(id) {
    const wifiSpot = this.wifiSpots.find((item) => item.id === id);
    if (!wifiSpot) {
      throw new AppError(404, `No se encontró la zona WiFi con ID: ${id}`);
    }
    return wifiSpot;
  }

  async getGeoJSON(filters = {}) {
    const wifiSpots = await this.getAll(filters);

    return {
      type: "FeatureCollection",
      features: wifiSpots.map((wifiSpot) => ({
        type: "Feature",
        properties: {
          id: wifiSpot.id,
          name: wifiSpot.name,
          type: wifiSpot.type,
          status: wifiSpot.status,
          description: wifiSpot.description,
          speedMbps: wifiSpot.speedMbps,
          createdAt: wifiSpot.createdAt,
          updatedAt: wifiSpot.updatedAt,
        },
        geometry: wifiSpot.location,
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

module.exports = WifiSpotsService;
