"use strict";

// Configuración Inicial
const INITIAL_CENTER = [21.122, -101.68]
const INITIAL_ZOOM = 13

const CATEGORY_CONFIG = {
    bache: {
        label: "Bache",
        color: "#d92d20"
    },
    alumbrado: {
        label: "Alumbrado",
        color: "#f79009"
    },
    basura: {
        label: "Basura",
        color: "#667085"
    },
    fuga: {
        label: "Fuga de agua",
        color: "#1570ef"
    },
    accidente: {
        label: "Accidente",
        color: "#7a5af8"
    }
}

// Creacion arreglo de incidentes

let incidents = [
    {
        id: "INC-001",
        title: "Bache frente a la universidad",
        category: "bache",
        description: "Bache profundo que dificulta el paso de vehículos",
        status: "pendiente",
        latitude: 21.1248,
        longitude: -101.6812,
        createdAt: "2026-01-15"
    },
     {
        id: "INC-002",
        title: "Luminaria sin funcionar",
        category: "alumbrado",
        description: "La calle permanece oscura durante la noche",
        status: "atendido",
        latitude: 21.120,
        longitude: -101.68,
        createdAt: "2026-01-16"
    },
     {
        id: "INC-003",
        title: "Acumulación de basura",
        category: "basura",
        description: "Aqui hay mucha basura, no venir",
        status: "pendiente",
        latitude: 21.1195,
        longitude: -101.6751,
        createdAt: "2026-01-17"
    },
     {
        id: "INC-004",
        title: "Fuga en la tuberia",
        category: "fuga",
        description: "Se rompió una tuveria provocando nua fuga masiva",
        status: "pendiente",
        latitude: 21.1258,
        longitude: -101.6762,
        createdAt: "2026-01-15"
    },
     {
        id: "INC-005",
        title: "Accidente vehicular",
        category: "accidente",
        description: "Dos carros chocaron, no hay paso",
        status: "atendido",
        latitude: 21.121,
        longitude: -101.6923,
        createdAt: "2026-01-16"
    },
]

// Referencias del DOM

const incidentForm = document.getElementById("incident-form");
const incidentIdInput = document.getElementById("incident-id");
const titleInput = document.getElementById("title-input");
const categoryInput = document.getElementById("category-input");
const descriptionInput = document.getElementById("description-input");
const statusInput = document.getElementById("status-input");
const latitudeInput = document.getElementById("latitude-input")
const longitudeInput = document.getElementById("longitude-input");

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const statusFilter = document.getElementById("status-filter");

const incidentList = document.getElementById("incidents-list");
const emptyMessage = document.getElementById("empty-message");
const resultsCounter = document.getElementById("results-counter");

const statTotal = document.getElementById("stat-total");
const statPending = document.getElementById("stat-pending");
const statResolved = document.getElementById("stat-resolved")

const formTitle = document.getElementById("form-title");
const formModeBadge = document.getElementById("form-mode-badge");
const formMessage = document.getElementById("form-message");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

const fitMapButton = document.getElementById("btn-fit-map");
const coordinateIndicator = document.getElementById("coordinate-indicator");

// Inicialización del mapa
const map = L.map("map", {
    center: INITIAL_CENTER,
    zoom: INITIAL_ZOOM,
    zoomControl: true
})

//Inicializar la capa base

const streetLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom:19,
        attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
)

const humanitarianLayer= L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
        maxZoom:19,
        attribution:
        '&copy; OpenStreetMap contributors, Tiles Style by Humanitarian OpenStreetMa Team'
    }
)

streetLayer.addTo(map);
humanitarianLayer.addTo(map);

const incidentsLayer= L.layerGroup().addTo(map);//
const selectionLayer= L.layerGroup().addTo(map);

const baseLayers={
    "Mapa de Calles": streetLayer,
    "Mapa Humanitario": humanitarianLayer
};

const overlayLayers = {
    "Mostrar Incidentes": incidentsLayer,//
    "Marcador de Selección": selectionLayer
};

L.control.layers(baseLayers, overlayLayers, {
    collapsed: false,
    position: "topright"
}).addTo(map);

L.control.scale({
    imperial: false,
    position: "bottomright"
}).addTo(map);

const legend = L.control({ position: "bottomleft" });

legend.onAdd = function(){
    const container = L.DomUtil.create('div', "map-legend");

    let content ="<h4>Categorias</h4>";

    Object.entries(CATEGORY_CONFIG).forEach(([key, config]) =>{
        content += `
        <div class="legend-item">
            <span
            class="legend-color"
            style="background:${config.color}">
            </span>

            <span>${config.label}</span>
        </div>
        `;
    });

    container.innerHTML = content;
    return container;
}

legend.addTo(map);

// crear un evento de clic en el mapa

map.on("click", function(event) {
    const latitude = Number(event.latlng.lat.toFixed(6));
    const longitude = Number(event.latlng.lng.toFixed(6));

    latitudeInput.value = latitude;
    longitudeInput.value = longitude;

    coordinateIndicator.textContent=
        `Coordenadas seleccionadas: ${latitude}, ${longitude}`;
    showTemporaryMarker(latitude, longitude);
})

function showTemporaryMarker(latitude, longitude) {
    selectionLayer.clearLayers();

    const temporaryMarker = L.marker(
        [latitude, longitude], 
        {
            draggable: true,
        }
    );
    temporaryMarker
    .bindPopup(
        `
        <strong>Ubicacion seleleccioanda</strong>
        <br>
        Puedes arrastra este marcador para ajutar la posicion.
        `
    )
    .addTo(selectionLayer)
    .openPopup();

    temporaryMarker.on("dragend", function(event) {
        const position = event.target.getLatLng();
        const newLatitude = Number(position.lat.toFixed(6));
        const newLongitude = Number(position.lng.toFixed(6));

        latitudeInput.value = newLatitude;
        longitudeInput.value = newLongitude;

        coordinateIndicator.textContent=
            `Coordenadas ajustadas: ${newLatitude}, ${newLongitude}`;
    });

    

};

// Visualizacion de los incidentes del arreglo
//function renderIncidents() {
//    incidentsLayer.clearLayers();
//    incidents.forEach(function(incident) {
//        const config = CATEGORY_CONFIG[incident.category];
//        const marker = L.circleMarker(
//            [incident.latitude, incident.longitude],
//            {
//                radius: 10,
//                color: "#ffffff",
//                weight: 3,
//                fillColor: config.color,
//                fillOpacity: 0.9
//            }
//        );
//        marker.bindTooltip(incident.title);
//        marker.bindPopup(`
//            <div class="popup-content">
//                <h3>${incident.title}</h3>
//                <p><strong>Categoría:</strong> ${config.label}</p>
//                <p><strong>Estado:</strong> ${incident.status}</p>
//                <p><strong>Descripción:</strong> ${incident.description}</p>
//                <p><strong>Coordenadas:</strong> ${incident.latitude}, ${incident.longitude}</p>
//            </div>
//      `);
//
//        marker.addTo(incidentsLayer);
//    });
//}

//renderIncidents();


function getFilteredIncidents(){
    const searchText= normalizeText(searchInput.value);
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;

    return incidents.filter(function(incident){
        const searchableText = normalizeText(
            `${incident.title} ${incident.description} ${incident.category}`
        );
        const matchesSearch = 
            searchableText.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            incident.category === selectedCategory;
        const matchesStatus = 
            selectedStatus === "all" ||
            incident.status == selectedStatus

        return(
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        );
    });
}

function normalizeText(value){
    return String(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function renderMapIncidents(data) {
    incidentsLayer.clearLayers();
    data.forEach(function(incident) {
        const category = CATEGORY_CONFIG[incident.category];

        const point = L.circleMarker(
            [incident.latitude, incident.longitude],
            {
                radius: 9,
                color: "#ffffff",
                weight: 2,
                fillColor: category.color,
                fillOpacity: 0.95
            }
        );

        point.bindTooltip(
            incident.title,
            {
                direction: "top",
                offset: [0, -8]
            }
        );

        point.bindPopup(
            createPopupContent(incident),
            {
                maxWidth: 280
            }
        );

        point.addTo(incidentsLayer);
    });
}
function createActionButton(label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
}
    
function createPopupContent(incident){
    const category = CATEGORY_CONFIG[incident.category];

    const container = document.createElement("div");
    container.className = "popup-content";

    const title = document.createElement("h3");
    title.textContent = incident.title;

    const categoryParagraph = document.createElement("p");
    categoryParagraph.innerHTML = 
        `<strong>Categoria: </strong> ${category.label}`;
    
    const statusParagraph = document.createElement("p");
    statusParagraph.innerHTML = 
        `<strong>Estado: </strong> ${formatStatus(incident.status)}`;

    const descriptionParagraph = document.createElement("h3");
    descriptionParagraph.textContent = incident.description;
    
    const coordinatesParagraph = document.createElement("p");

    coordinatesParagraph.className = "coordinates-text";
    coordinatesParagraph.textContent = 
        `${incident.latitude}, ${incident.longitude}`;
    
    const actions = document.createElement("div");
    actions.className = "popup-actions"
    
    const editButton = createActionButton("Editar", "button button-primary button-small", function(){

        startEditingIncident(incident.id);
        map.closePopup();
    });

     const deleteButton = createActionButton("Eliminar", "button button-danger button-small", function(){
         deleteIncident(incident.id);
        map.closePopup();
    });
    

    actions.append(editButton, deleteButton);

    container.append(
        title,
        categoryParagraph,
        statusParagraph,
        descriptionParagraph,
        coordinatesParagraph,
        actions
    )
    return container;
}



function validateIncident(data) {
    if (!data.title.trim()) {
        showFormMessage(
            "El nombre del incidente es obligatorio.",
            "error"
        );
        return false;
    }

    if (!data.category) {
        showFormMessage(
            "Selecciona una categoría.",
            "error"
        );
        return false;
    }

    if (!data.description.trim()) {
        showFormMessage(
            "La descripción es obligatoria.",
            "error"
        );
        return false;
    }

    if (!data.status) {
        showFormMessage(
            "Selecciona un estado.",
            "error"
        );
        return false;
    }

    if (
        Number.isNaN(data.latitude) ||
        Number.isNaN(data.longitude)
    ) {
        showFormMessage(
            "Debes seleccionar una ubicación válida.",
            "error"
        );
        return false;
    }

    return true;
}

function focusIncident(incident) {
    map.setView(
        [incident.latitude, incident.longitude],
        16
    );

    showTemporaryMarker(
        incident.latitude,
        incident.longitude
    );
}
function renderIncidentsList (data){
    incidentList.innerHTML = "";

    emptyMessage.hidden = data.length !==0;

    data.forEach(function (incident){
        const category = CATEGORY_CONFIG[incident.category];
        const card = document.createElement("article");
        card.className = "incident-card";
        card.style.setProperty(
            "--incident-color",
            category.color
        );
        
        const header = document.createElement("div");
        header.className = "incident-card-header";

        const title = document.createElement("h3");
            title.textContent = incident.title;

        const statusBadge = document.createElement("span");
        statusBadge.className = 
            incident.status === "pendiente"
            ? "badge badge-pending"
            : "badge badge-resolved";
        
        statusBadge.textContent = formatStatus (incident.status);

        header.append(title, statusBadge)

        const description = document.createElement ("p");
        description.className = "incident-description";
        description.textContent = incident.description;

        const meta = document.createElement("div");
        meta.className = "incident-meta";

        const categoryBadge = document.createElement("span");
        categoryBadge.className = "badge badge-category";
        categoryBadge.textContent = category.label;

        const coordinates = document.createElement("span");
        coordinates.className = "coordinates-text";
        coordinates.textContent = 
            `${incident.latitude}, ${incident.longitude}`;
        meta.append(categoryBadge,coordinates);
        
        const actions = document.createElement("div");
        actions.className = "incident-actions";

        

        const locateButton = createActionButton(
            "Ver en Mapa",
            "button button-secondary button-small",
            function(){
                focusIncident(incident)
            }
        );

        const editButton = createActionButton(
            "Editar",
            "button button-primary button-small",
            function(){
                startEditingIncident(incident.id);
            }
        );
        const deleteButton = createActionButton(
            "Eliminar",
            "button button-danger button-small",
            function(){
                deleteIncident(incident.id);
            }
        );
        actions.append(
            locateButton,
            editButton,
            deleteButton
        );
        card.append(
            header,
            description,
            meta,
            actions
        );
//        incident.appendClild(card);
        incidentList.appendChild(card);
    });
}

// MANIPULACION DE INCIDENTES
function formatStatus(status) {
    return status === "pendiente" ? "Pendiente" : "Atendido";
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}// Esta funcion me da el formato YYYY-MM-DD  

function generateIncidentId() {
    const timestamp = Date.now()
        .toString(36)
        .toUpperCase()
        .padStart(8, "0")
        .slice(-8);
    const random = Math.floor(Math.random() * 1000);
    return `INC-${timestamp}-${String(random).padStart(3, "0")}`;
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type === "error" ? "form-message error" : "form-message";
    formMessage.hidden = false;     
}

function hideFormMessage() {
    formMessage.hidden = true;
    formMessage.textContent = "";
}

function resetForm() {
    incidentForm.reset();
    incidentIdInput.value = "";
    formTitle.textContent = "Registrar incidente";
    formModeBadge.textContent = "Nuevo";
    formModeBadge.classList.remove("editing");
    cancelButton.hidden = true;
    selectionLayer.clearLayers();
    hideFormMessage();
}

function refreshApp() {
    const filtered = getFilteredIncidents();
    renderMapIncidents(filtered);
    renderIncidentsList(filtered);
    updateStatistics();
    updateResultsCounter(filtered);
}

function updateStatistics() {
    statTotal.textContent = incidents.length;
    statPending.textContent = incidents.filter(function(i) {
        return i.status === "pendiente";
    }).length;
    statResolved.textContent = incidents.filter(function(i) {
        return i.status === "atendido";
    }).length;
}

function updateResultsCounter(data) {
    const count = data.length;
    resultsCounter.textContent = `${count} resultado${count === 1 ? "" : "s"}`;
}

function createIncident(data) {
    const newIncident = {
        id: generateIncidentId(),
        title: data.title,
        category: data.category,
        description: data.description,
        status: data.status,
        latitude: data.latitude,
        longitude: data.longitude,
        createdAt: getCurrentDate()
    };

    incidents.push(newIncident);

    refreshApp();
    resetForm();
    showFormMessage("Incidente registrado correctamente.");

    map.setView([newIncident.latitude, newIncident.longitude], map.getZoom());
}

function startEditingIncident(id) {
    const incident = incidents.find(function(item) {
        return item.id === id;
    });

    if (!incident) return;

    incidentIdInput.value = incident.id;
    titleInput.value = incident.title;
    categoryInput.value = incident.category;
    descriptionInput.value = incident.description;
    statusInput.value = incident.status;
    latitudeInput.value = incident.latitude;
    longitudeInput.value = incident.longitude;

    formTitle.textContent = "Editar incidente";
    formModeBadge.textContent = "Editando";
    formModeBadge.classList.add("editing");
    cancelButton.hidden = false;

    map.setView([incident.latitude, incident.longitude], 16);
    showTemporaryMarker(incident.latitude, incident.longitude);
}

function updateIncident(id, changes) {
    const incident = incidents.find(function(item) {
        return item.id === id;
    });

    if (!incident) return;

    Object.assign(incident, changes);

    refreshApp();
    resetForm();
    showFormMessage("Incidente actualizado correctamente.");

    map.setView([incident.latitude, incident.longitude], map.getZoom());
}

function deleteIncident(id) {
    const incident = incidents.find(function(item) {
        return item.id === id;
    });

    if (!incident) return;

    const confirmed = window.confirm(
        `¿Seguro que quieres eliminar "${incident.title}"?`
    );
    if (!confirmed) return;

    incidents = incidents.filter(function(item) {
        return item.id !== id;
    });

    refreshApp();
    resetForm();
    showFormMessage("Incidente eliminado.");
}

incidentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        title: titleInput.value.trim(),
        category: categoryInput.value,
        description: descriptionInput.value.trim(),
        status: statusInput.value,
        latitude: Number(latitudeInput.value),
        longitude: Number(longitudeInput.value)
    };

    if (!validateIncident(data)) {
        return;
    }

    if (incidentIdInput.value) {
        updateIncident(incidentIdInput.value, data);
    } else {
        createIncident(data);
    }
});

cancelButton.addEventListener("click", function() {
    resetForm();
});

fitMapButton.addEventListener("click", function() {
    const points = incidents.map(function(incident) {
        return [incident.latitude, incident.longitude];
    });

    if (points.length > 0) {
        map.fitBounds(points, {
            padding: [30, 30],
            maxZoom: 14
        });
    }
});

[searchInput, categoryFilter, statusFilter].forEach(function(el) {
    el.addEventListener("input", refreshApp);
});

refreshApp();