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
}];

/**
 * This is the main method, it will be run on load, if you want to add parameters you add them in between the () search "arrow functions" to learn the differences
 * between this syntax and the pre-existing function() {} you were using
 */
let init = () => {
    const mymap = L.map('mapid').fitBounds(L.latLngBounds(L.latLng(53.345806, -6.259954), L.latLng(53.341533, -6.249332))).setMaxBounds([
        [53.345806, -6.259954],
        [53.341533, -6.249332]
    ]);

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
    });

    L.geoJson(buildings, {
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

init();