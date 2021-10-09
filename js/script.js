let saveLocations = false;
let coordinates = [];

const mymap = L.map('mapid').fitBounds(L.latLngBounds(L.latLng(53.345806, -6.259954), L.latLng(53.341533, -6.249332))).setMaxBounds([
    [53.345806, -6.259954],
    [53.341533, -6.249332]
]);

/**
 * Let each individual building be an individual object, meaning this should be in the form [{..}, {..}]
 * This is an array of objects.
 */
let buildings = [{
    "type": "Feature",
    "properties": {
        "name": "Arts Bloc",
        "mapped": "true",
        "link": "Arts/"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [-6.257883, 53.343436],
                [-6.257443, 53.343461],
                [-6.257454, 53.343394],
                [-6.257063, 53.343391],
                [-6.257046, 53.343448],
                [-6.256322, 53.343413],
                [-6.256349, 53.342955],
                [-6.257191, 53.34301],
                [-6.257948, 53.343141]
            ]
        ]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Hamilton",
        "mapped": "true",
        "link": "Hamilton/"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [53.34276626583194, -6.251086592674256],
                [53.34226984446437, -6.251397728919984],
                [53.34222180338017, -6.251258254051209],
                [53.342237817080914, -6.25125288963318],
                [53.34219938418903, -6.251070499420167],
                [53.34218016773007, -6.251086592674256],
                [53.34216735675265, -6.250990033149719],
                [53.34217696498609, -6.25098466873169],
                [53.34217376224184, -6.250957846641541],
                [53.34221860063931, -6.250914931297303],
                [53.34219618144647, -6.250818371772767],
                [53.34210970730652, -6.250872015953065],
                [53.342071274299165, -6.250678896903993],
                [53.34342921954874, -6.249901056289674],
                [53.34346444868487, -6.2500566244125375],
                [53.343598959664256, -6.249960064888001],
                [53.343723862336546, -6.250571608543396],
                [53.34349647514703, -6.250716447830201],
                [53.34340359834054, -6.250362396240235],
                [53.343352355877926, -6.250416040420533],
                [53.34340359834054, -6.250716447830201],
                [53.3428367251706, -6.251054406166077],
                [53.34274384692703, -6.250614523887635],
                [53.34267018472795, -6.250652074813844],
                [53.34276626583194, -6.251091957092286],
                [53.342257033513896, -6.251403093338013]
            ]
        ]
    }
}];


/**
 * This is the main method, it will be run on load, if you want to add parameters you add them in between the () search "arrow functions" to learn the differences
 * between this syntax and the pre-existing function() {} you were using
 */
let init = () => {


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 20,
        minZoom: 17,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(mymap);

    mymap.on('click', (e) => {
        document.getElementById("click-coords-display").innerHTML = e.latlng;

        if (saveLocations) {
            console.log(e.latlng);

            if (coordinates != undefined) {
                coordinates = [...coordinates, [e.latlng["lat"], e.latlng["lng"]]];
            } else {
                coordinates = [
                    [e.latlng["lat"], e.latlng["lng"]]
                ];
            }

            document.getElementById("saved-coordinates").innerHTML = JSON.stringify(coordinates);
            console.log(coordinates);
        }

    });

    addBuilding(buildings);
    addBuilding(buildings[1])
}

let startSavingLocations = () => {
    // Clear existing building
    coordinates = undefined;
    document.getElementById("saved-coordinates").innerHTML = [];

    saveLocations = !saveLocations;
}

let endBuilding = () => {
    let building = {
        "type": "Feature",
        "properties": {
            "name": "Unnamed",
            "mapped": "true",
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [coordinates]
        }
    }

    buildings.push(building);
    addBuilding(building)
}

let addBuilding = (building) => {
    L.geoJson(building, {
        style: {
            fillColor: '#800026',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        },
        onEachFeature(feature, layer) {
            //bind click
            layer.on('click', function (e) {
                window.location.href = feature.properties.link;
            });

            if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name, {
                    closeButton: false,
                    offset: L.point(0, -20)
                });
                layer.on('mouseover', function () {
                    layer.openPopup();
                });
                layer.on('mouseout', function () {
                    layer.closePopup();
                });
            }
        }

    }).addTo(mymap);
}

let exportToConsole = () => {
    console.log(buildings);
    document.getElementById("exported-json").innerHTML = JSON.stringify(buildings);
}

init();