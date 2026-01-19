/*Add menu when ready*/ $wait(1, ()=>{

$add('div', {id: 'map-container'});

$add('div', {id: 'controls'}, [

    ['div', {class: 'control-group', id: 'zoom-controls'}, [
        ['button', {id: 'zoom-in', class: 'efy_square_btn'}, '+'],
        ['button', {id: 'zoom-out', class: 'efy_square_btn'}, '-']
    ]],

    ['div', {class: 'control-group', id: 'search-container'}, [
        ['input', {id: 'search-input', placeholder: ' Location or Address...'}],
        ['button', {id: 'find-button', class: 'efy_square_btn'}, [['i', {efy_icon: 'search'}]]]
    ]],

    ['details', {id: 'locations-details', name: 'efy_maps_options'}, [
        ['summary', 'Locations'],
        ['div', {class: 'control-group', id: 'saved-locations-container'}, [
            ['label', 'Saved:'],
            ['ul', {id: 'saved-locations-list'}],
            ['div', {class: 'button-container'}, [
                ['button', {id: 'add-current-btn'}, 'Add Current View'],
                ['button', {id: 'delete-all-btn'}, 'Delete All']
            ]]
        ]]
    ]],

    ['details', {id: 'colors-details', name: 'efy_maps_options', open: true}, [
        ['summary', 'Colors'],
        // Presets
        ['div', {class: 'control-group'}, [
            ['h4', 'Color Presets'],
            ['button', {id: 'save-preset-btn', class: 'full-width'}, 'Save Current Colors'],
            ['ul', {id: 'preset-list'}]
        ]],
        // Base & Land
        ['div', {class: 'control-group'}, [
            ['h4', 'Base & Land'],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'background-color', type: 'color', value: '#EFEFEF'}],
                ['input', {id: 'background-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Base Map']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'water-color', type: 'color', value: '#a0c8f0'}],
                ['input', {id: 'water-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Water']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'park-color', type: 'color', value: '#d8e8c8'}],
                ['input', {id: 'park-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Parks/Green']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'building-color', type: 'color', value: '#dcdcdc'}],
                ['input', {id: 'building-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Buildings']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'landuse-residential-color', type: 'color', value: '#e0e0e0'}],
                ['input', {id: 'landuse-residential-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Residential']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'landuse-commercial-color', type: 'color', value: '#d8c8c8'}],
                ['input', {id: 'landuse-commercial-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Commercial']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'landuse-industrial-color', type: 'color', value: '#c8c0c0'}],
                ['input', {id: 'landuse-industrial-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Industrial']
            ]]
        ]],
        // Roads & Transport
        ['div', {class: 'control-group'}, [
            ['h4', 'Roads & Transport'],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'road-casing-color', type: 'color', value: '#DFDFDF'}],
                ['input', {id: 'road-casing-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Road Casings']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'road-highway-color', type: 'color', value: '#FFA500'}],
                ['input', {id: 'road-highway-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Highway']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'road-primary-color', type: 'color', value: '#FF0000'}],
                ['input', {id: 'road-primary-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Primary']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'road-secondary-color', type: 'color', value: '#00FF00'}],
                ['input', {id: 'road-secondary-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Secondary/Tertiary']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'road-residential-color', type: 'color', value: '#0000FF'}],
                ['input', {id: 'road-residential-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Residential/Service']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'railway-color', type: 'color', value: '#a9a9a9'}],
                ['input', {id: 'railway-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Railways']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'aerialway-color', type: 'color', value: '#800080'}],
                ['input', {id: 'aerialway-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Aerialways']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'aeroway-color', type: 'color', value: '#b0b0b0'}],
                ['input', {id: 'aeroway-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Runways/Airport']
            ]]
        ]],
        // Labels & Lines
        ['div', {class: 'control-group'}, [
            ['h4', 'Labels & Lines'],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'place-label-color', type: 'color', value: '#333333'}],
                ['input', {id: 'place-label-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'City/Town Labels']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'poi-label-color', type: 'color', value: '#666666'}],
                ['input', {id: 'poi-label-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'POI Labels']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'road-label-color', type: 'color', value: '#777777'}],
                ['input', {id: 'road-label-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Road Labels']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'boundary-color', type: 'color', value: '#990099'}],
                ['input', {id: 'boundary-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Borders']
            ]],
            ['div', {class: 'color-picker-container'}, [
                ['input', {id: 'contour-color', type: 'color', value: '#8B4513'}],
                ['input', {id: 'contour-opacity', type: 'range', value: '1', max: '1', min: '0', step: '0.1'}],
                ['span', 'Contour Lines']
            ]]
        ]]
    ]],

    ['details', {id: 'settings-details', name: 'efy_maps_options'}, [
        ['summary', 'Map Settings'],
        ['div', {class: 'control-group'}, [
            ['div', {class: 'setting-container'}, [
                ['label', {for: 'show-place-labels'}, 'Show Place Labels'],
                ['input', {id: 'show-place-labels', type: 'checkbox', checked: true}]
            ]],
            ['div', {class: 'setting-container'}, [
                ['label', {for: 'show-poi-labels'}, 'Show POI Labels'],
                ['input', {id: 'show-poi-labels', type: 'checkbox', checked: true}]
            ]],
            ['div', {class: 'setting-container'}, [
                ['label', {for: 'show-road-labels'}, 'Show Road Labels'],
                ['input', {id: 'show-road-labels', type: 'checkbox', checked: true}]
            ]],
            ['div', {class: 'setting-container'}, [
                ['label', {for: 'show-buildings'}, 'Show Buildings'],
                ['input', {id: 'show-buildings', type: 'checkbox', checked: true}]
            ]],
            ['div', {class: 'setting-container'}, [
                ['label', {for: 'show-hillshade'}, 'Show Hillshade'],
                ['input', {id: 'show-hillshade', type: 'checkbox', checked: true}]
            ]]
        ]]
    ]],

    ['div', {id: 'info-footer'}, 'MapLibre | OpenFreeMap © OpenMapTiles Data from OpenStreetMap']
], $('#efy_modules'));

////////////////////////////////////////////

        // --- IndexedDB Setup ---
        const DB_NAME = "efy_maps";
        const DB_VERSION = 2;
        let db;

        function openDB() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(DB_NAME, DB_VERSION);
                request.onerror = (event) => reject(`Database error: ${event.target.error}`);
                request.onsuccess = (event) => {
                    db = event.target.result;
                    console.log("Database opened successfully");
                    resolve(db);
                };
                request.onupgradeneeded = (event) => {
                    db = event.target.result;
                    if (!db.objectStoreNames.contains("locations")) {
                        db.createObjectStore("locations", { keyPath: "id", autoIncrement: true });
                    }
                    if (!db.objectStoreNames.contains("preferences")) {
                         db.createObjectStore("preferences", { keyPath: "id" });
                    }
                    if (!db.objectStoreNames.contains("colorPresets")) {
                         db.createObjectStore("colorPresets", { keyPath: "name" });
                    }
                };
            });
        }

        // --- Generic DB Functions ---
        function performDBTransaction(storeName, mode, action, data) {
            return new Promise((resolve, reject) => {
                if (!db) {
                    reject("DB not open");
                    return;
                }
                const transaction = db.transaction([storeName], mode);
                const store = transaction.objectStore(storeName);
                const request = store[action](data);

                request.onsuccess = (event) => resolve(event.target.result);
                request.onerror = (event) => reject(event.target.error);
            });
        }

        // Preferences (Colors, Settings)
        const savePreference = (key, value) => performDBTransaction("preferences", "readwrite", "put", { id: key, value: value });
        const loadPreference = async (key) => {
            try {
                const result = await performDBTransaction("preferences", "readonly", "get", key);
                return result ? result.value : null;
            } catch (e) {
                return null;
            }
        };

        // Locations
        const saveLocation = (name, center, zoom) => performDBTransaction("locations", "readwrite", "add", { name, center, zoom });
        const loadLocations = () => performDBTransaction("locations", "readonly", "getAll");
        const deleteLocation = (id) => performDBTransaction("locations", "readwrite", "delete", id);
        const clearLocations = () => performDBTransaction("locations", "readwrite", "clear");

        // Color Presets
        const saveColorPreset = (name, styles) => performDBTransaction("colorPresets", "readwrite", "put", { name, styles });
        const loadColorPresets = () => performDBTransaction("colorPresets", "readonly", "getAll");
        const deleteColorPreset = (name) => performDBTransaction("colorPresets", "readwrite", "delete", name);


        // --- Map Initialization ---
        const map = new maplibregl.Map({
            container: 'map-container',
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [-0.09, 51.505],
            zoom: 13
        });

        // --- Cache DOM Elements ---
        const searchInput = document.getElementById('search-input');
        const findButton = document.getElementById('find-button');
        const savedLocationsList = document.getElementById('saved-locations-list');
        const addCurrentBtn = document.getElementById('add-current-btn');
        const deleteAllBtn = document.getElementById('delete-all-btn');
        const savePresetBtn = document.getElementById('save-preset-btn');
        const presetList = document.getElementById('preset-list');

        // --- Central Mappings ---

        const colorMappings = {
            'background-color': {
                opacityId: 'background-opacity',
                layers: [
                    { layerId: 'background', colorProperty: 'background-color', opacityProperty: 'background-opacity' }
                ]
            },
            'water-color': {
                opacityId: 'water-opacity',
                layers: [
                    { layerId: 'water', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' },
                    { layerId: 'waterway', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'park-color': {
                opacityId: 'park-opacity',
                layers: [
                    { layerId: 'park', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' },
                    { layerId: 'wood', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' },
                    { layerId: 'grass', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' }
                ]
            },
            'building-color': {
                opacityId: 'building-opacity',
                layers: [{ layerId: 'building', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' }]
            },
            'landuse-residential-color': {
                opacityId: 'landuse-residential-opacity',
                layers: [{ layerId: 'landuse_residential', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' }]
            },
            'landuse-commercial-color': {
                opacityId: 'landuse-commercial-opacity',
                layers: [{ layerId: 'landuse_commercial', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' }]
            },
            'landuse-industrial-color': {
                opacityId: 'landuse-industrial-opacity',
                layers: [{ layerId: 'landuse_industrial', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' }]
            },
            'aerialway-color': {
                opacityId: 'aerialway-opacity',
                layers: [{ layerId: 'aerialway', colorProperty: 'line-color', opacityProperty: 'line-opacity' }]
            },
            'aeroway-color': {
                opacityId: 'aeroway-opacity',
                layers: [
                    { layerId: 'aeroway', colorProperty: 'fill-color', opacityProperty: 'fill-opacity' },
                    { layerId: 'road_runway', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_taxiway', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'railway-color': {
                opacityId: 'railway-opacity',
                layers: [{ layerId: 'railway', colorProperty: 'line-color', opacityProperty: 'line-opacity' }]
            },
            // NEW: Road Casings
            'road-casing-color': {
                opacityId: 'road-casing-opacity',
                layers: [
                    { layerId: 'road_motorway_casing', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_trunk_casing', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_primary_casing', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_secondary_casing', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_tertiary_casing', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_motorway_link_casing', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'road-highway-color': {
                opacityId: 'road-highway-opacity',
                layers: [
                    { layerId: 'road_motorway', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_trunk', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_motorway_link', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_trunk_link', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'road-primary-color': {
                opacityId: 'road-primary-opacity',
                layers: [
                    { layerId: 'road_primary', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_primary_link', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'road-secondary-color': {
                opacityId: 'road-secondary-opacity',
                layers: [
                    { layerId: 'road_secondary', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_tertiary', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_secondary_link', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_tertiary_link', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'road-residential-color': {
                opacityId: 'road-residential-opacity',
                layers: [
                    { layerId: 'road_residential', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_service', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_living_street', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_unclassified', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'road_pedestrian', colorProperty: 'line-color' }
                ]
            },
            'place-label-color': {
                opacityId: 'place-label-opacity',
                layers: [
                    { layerId: 'place_label_city', colorProperty: 'text-color', opacityProperty: 'text-opacity' },
                    { layerId: 'place_label_town', colorProperty: 'text-color', opacityProperty: 'text-opacity' },
                    { layerId: 'place_label_village', colorProperty: 'text-color', opacityProperty: 'text-opacity' },
                    { layerId: 'place_label_other', colorProperty: 'text-color', opacityProperty: 'text-opacity' }
                ]
            },
            'poi-label-color': {
                opacityId: 'poi-label-opacity',
                layers: [
                    { layerId: 'poi_label', colorProperty: 'text-color', opacityProperty: 'text-opacity' }
                ]
            },
             'road-label-color': {
                opacityId: 'road-label-opacity',
                layers: [
                    { layerId: 'road_label', colorProperty: 'text-color', opacityProperty: 'text-opacity' }
                ]
            },
            'boundary-color': {
                opacityId: 'boundary-opacity',
                layers: [
                    { layerId: 'boundary_country', colorProperty: 'line-color', opacityProperty: 'line-opacity' },
                    { layerId: 'boundary_state', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            },
            'contour-color': {
                opacityId: 'contour-opacity',
                layers: [
                    { layerId: 'contour', colorProperty: 'line-color', opacityProperty: 'line-opacity' }
                ]
            }
        };
        const allPickerIds = Object.keys(colorMappings);

        const layoutSettings = {
            'show-place-labels': [
                { layerId: 'place_label_city' },
                { layerId: 'place_label_town' },
                { layerId: 'place_label_village' },
                { layerId: 'place_label_other' }
            ],
            'show-poi-labels': [{ layerId: 'poi_label' }],
            'show-road-labels': [{ layerId: 'road_label' }],
            'show-buildings': [{ layerId: 'building' }],
            'show-hillshade': [{ layerId: 'hillshade' }]
        };

        // --- Zoom Controls ---
        document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());

        // --- Search Functionality ---
        async function searchLocation() {
            const query = searchInput.value.trim();
            if (!query) return;
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=geojson&limit=1`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    const bbox = data.features[0].bbox;
                    if (bbox) {
                        map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], { padding: 50 });
                    } else {
                        const center = data.features[0].geometry.coordinates;
                        map.flyTo({ center: [center[0], center[1]], zoom: 15 });
                    }
                } else {
                    alert("Location not found");
                }
            } catch (error) {
                console.error("Search error:", error);
                alert("Error during search");
            }
        }
        findButton.addEventListener('click', searchLocation);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') searchLocation();
        });


        // --- Saved Locations UI ---
        function renderSavedLocations(locations) {
            savedLocationsList.innerHTML = '';
            if (!locations) return;
            locations.forEach(loc => {
                const li = document.createElement('li');
                const nameSpan = document.createElement('span');
                nameSpan.className = 'saved-location-name';
                nameSpan.textContent = loc.name;
                nameSpan.addEventListener('click', () => {
                    map.flyTo({ center: loc.center, zoom: loc.zoom });
                });

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-location-btn';
                removeBtn.textContent = 'X';
                removeBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await deleteLocation(loc.id);
                    renderSavedLocations(await loadLocations());
                });

                li.appendChild(nameSpan);
                li.appendChild(removeBtn);
                savedLocationsList.appendChild(li);
            });
        }

        addCurrentBtn.addEventListener('click', async () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            const name = prompt("Enter a name for this location:");
            if (name) {
                await saveLocation(name, [center.lng, center.lat], zoom);
                renderSavedLocations(await loadLocations());
            }
        });

        deleteAllBtn.addEventListener('click', async () => {
            if (confirm("Are you sure you want to delete all saved locations?")) {
                await clearLocations();
                renderSavedLocations([]);
            }
        });


        // --- Map Styling & Preset Controls ---

        function applyStyleToMap(pickerId, style) {
            const mapping = colorMappings[pickerId];
            if (!mapping) return;

            for (const layer of mapping.layers) {
                if (map.getLayer(layer.layerId)) {
                    try {
                        if (layer.colorProperty) {
                            map.setPaintProperty(layer.layerId, layer.colorProperty, style.color);
                        }
                        if (layer.opacityProperty) {
                            map.setPaintProperty(layer.layerId, layer.opacityProperty, parseFloat(style.opacity));
                        }
                    } catch (e) {
                        console.warn(`Could not set property on layer '${layer.layerId}'`, e.message);
                    }
                } else {
                    console.warn(`Layer not found for styling: ${layer.layerId}`);
                }
            }
        }

        function getCurrentStyles() {
            const styles = {};
            for (const pickerId of allPickerIds) {
                const mapping = colorMappings[pickerId];
                if (!mapping) continue;
                const color = document.getElementById(pickerId).value;
                const opacity = document.getElementById(mapping.opacityId).value;
                styles[pickerId] = { color, opacity };
            }
            return styles;
        }

        function applyStyles(stylesObject) {
            for (const [pickerId, style] of Object.entries(stylesObject)) {
                const colorPicker = document.getElementById(pickerId);
                const mapping = colorMappings[pickerId];
                if (!colorPicker || !mapping) continue;

                const opacitySlider = document.getElementById(mapping.opacityId);
                if (opacitySlider) {
                    colorPicker.value = style.color;
                    opacitySlider.value = style.opacity;

                    applyStyleToMap(pickerId, style);
                    savePreference(pickerId, style);
                }
            }
        }

        function renderPresets(presets) {
            presetList.innerHTML = '';
            if (!presets) return;
            presets.forEach(preset => {
                const li = document.createElement('li');
                const nameSpan = document.createElement('span');
                nameSpan.className = 'preset-name';
                nameSpan.textContent = preset.name;
                nameSpan.addEventListener('click', () => {
                    applyStyles(preset.styles);
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-preset-btn';
                deleteBtn.textContent = 'X';
                deleteBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (confirm(`Delete preset "${preset.name}"?`)) {
                        await deleteColorPreset(preset.name);
                        renderPresets(await loadColorPresets());
                    }
                });

                li.appendChild(nameSpan);
                li.appendChild(deleteBtn);
                presetList.appendChild(li);
            });
        }

        savePresetBtn.addEventListener('click', async () => {
            const name = prompt("Enter a name for this color preset:");
            if (name) {
                try {
                    const styles = getCurrentStyles();
                    await saveColorPreset(name, styles);
                    renderPresets(await loadColorPresets());
                } catch (e) {
                    console.error("Error saving preset:", e);
                    alert("Could not save preset. Name might already be in use.");
                }
            }
        });

        // --- Map Settings Logic ---

        /**
         * Applies a layout change (like visibility) to map layers.
         * @param {string} settingId - The ID of the checkbox.
         * @param {boolean} isVisible - True for 'visible', false for 'none'.
         */
        function applyLayoutToMap(settingId, isVisible) {
            const mappings = layoutSettings[settingId];
            if (!mappings) return;
            const visibility = isVisible ? 'visible' : 'none';

            for (const layer of mappings) {
                if (map.getLayer(layer.layerId)) {
                    try {
                        map.setLayoutProperty(layer.layerId, 'visibility', visibility);
                    } catch (e) {
                        console.warn(`Could not set layout on layer '${layer.layerId}'`, e.message);
                    }
                } else {
                    console.warn(`Layer not found for toggle: ${layer.layerId}`);
                }
            }
        }

        async function initializeMapSettings() {
            // Checkbox settings
            for (const settingId of Object.keys(layoutSettings)) {
                const checkbox = document.getElementById(settingId);
                if (!checkbox) continue;

                const savedValue = await loadPreference(settingId);
                const isChecked = (savedValue !== null) ? savedValue : checkbox.checked;

                checkbox.checked = isChecked;
                // FIX: Pass the boolean value, not the string
                applyLayoutToMap(settingId, isChecked);

                checkbox.addEventListener('input', () => {
                    const newValue = checkbox.checked;
                    applyLayoutToMap(settingId, newValue);
                    savePreference(settingId, newValue);
                });
            }
        }

        async function initializeColorPickers() {
            for (const pickerId of allPickerIds) {
                const colorPicker = document.getElementById(pickerId);
                const mapping = colorMappings[pickerId];
                if (!colorPicker || !mapping) continue;

                const opacitySlider = document.getElementById(mapping.opacityId);
                if (!opacitySlider) continue;

                const defaultStyle = { color: colorPicker.value, opacity: opacitySlider.value };
                const savedStyle = await loadPreference(pickerId);
                const style = savedStyle || defaultStyle;

                colorPicker.value = style.color;
                opacitySlider.value = style.opacity;

                applyStyleToMap(pickerId, style);

                const onStyleChange = () => {
                    const newStyle = {
                        color: colorPicker.value,
                        opacity: opacitySlider.value
                    };
                    applyStyleToMap(pickerId, newStyle);
                    savePreference(pickerId, newStyle);
                };

                colorPicker.addEventListener('input', onStyleChange);
                opacitySlider.addEventListener('input', onStyleChange);
            }
        }

        // --- Main Initialization on Map Load ---
        map.on('load', async () => {

            try {
                await openDB();
            } catch (e) {
                console.error(e);
                alert("Failed to open local database. Settings will not be saved.");
                return; // Stop if DB fails
            }

            // Initialize all components
            await initializeColorPickers();
            await initializeMapSettings();

            renderSavedLocations(await loadLocations());
            renderPresets(await loadColorPresets());

            console.log("Map initialized.");
        });

});