"use strict";

const app = require("./app");

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log("");
    console.log("==========================================");
    console.log("API GEORREFERENCIADA - SISTEMA DE ENTIDADES");
    console.log("==========================================");
    console.log(`Servidor:     http://localhost:${PORT}`);
    console.log(`Health:       http://localhost:${PORT}/api/health`);
    console.log("------------------------------------------");
    console.log("INCIDENTES:");
    console.log(`  Lista:      http://localhost:${PORT}/api/incidents`);
    console.log(`  GeoJSON:    http://localhost:${PORT}/api/incidents/geojson`);
    console.log("HOSPITALES Y CLÍNICAS:");
    console.log(`  Lista:      http://localhost:${PORT}/api/hospitals`);
    console.log(`  GeoJSON:    http://localhost:${PORT}/api/hospitals/geojson`);
    console.log("ESTACIONES DE EMERGENCIA:");
    console.log(`  Lista:      http://localhost:${PORT}/api/stations`);
    console.log(`  GeoJSON:    http://localhost:${PORT}/api/stations/geojson`);
    console.log("PARADAS DE TRANSPORTE (SIT OPTIBÚS):");
    console.log(`  Lista:      http://localhost:${PORT}/api/bus-stops`);
    console.log(`  GeoJSON:    http://localhost:${PORT}/api/bus-stops/geojson`);
    console.log("ZONAS WIFI GRATUITO:");
    console.log(`  Lista:      http://localhost:${PORT}/api/wifi-spots`);
    console.log(`  GeoJSON:    http://localhost:${PORT}/api/wifi-spots/geojson`);
    console.log("==========================================");
    console.log("");
});