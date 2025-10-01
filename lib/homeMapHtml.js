export const SysMapUnits = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Mapa Leaflet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    #map {
      border-radius: 10px;
      height: 100vh;
      width: 100vw;
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map',{zoomControl: false }).setView([19.4326, -99.1332], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    document.addEventListener("message", function (event) {
      const unidades = JSON.parse(event.data);
      unidades.forEach((unidad) => {
        var carIcon = L.icon({
          iconUrl: 'https://gps.localizate.mx/assets/img/unidades/' + unidad.icono,
          iconSize: [36, 36],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        const marker = L.marker([unidad.latitude, unidad.longitude], { icon: carIcon })
                      .addTo(map)
                      .bindPopup(unidad.nombre || "Unidad " + unidad.alias);
          // Detectar clic en el marcador
          marker.on('click', function () {
            const payload = {
              esn: unidad.esn,
              alias: unidad.alias,
              latitude: unidad.latitude,
              longitude: unidad.longitude,
              estatus: unidad.estatus,
              icono: unidad.icono
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          });  
      });
    });
  </script>
</body>
</html>
`;

// lib/homeMapHtml.js
export const SysMapRoutes = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Mapa Leaflet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
    #map {
      border-radius: 10px;
      height: 100vh;
      width: 100vw;
    }
    .arrow-icon {
      font-size: 18px;
      color: red;
      transform-origin: center;
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/leaflet-polylinedecorator@1.6.0/dist/leaflet.polylineDecorator.min.js"></script>

  <script>
    const map = L.map('map').setView([19.4326, -99.1332], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Avisamos a React Native que el mapa está listo
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapReady' }));

    function handleMessage(event){
      const unidades = JSON.parse(event.data);
      if(!Array.isArray(unidades) || unidades.length === 0) return;

      // Limpiar mapa anterior
      map.eachLayer((layer) => { if(layer instanceof L.Polyline || layer instanceof L.Marker) map.removeLayer(layer); });

      const ruta = unidades
        .map(u => [parseFloat(u.latitude), parseFloat(u.longitude)])
        .filter(c => !isNaN(c[0]) && !isNaN(c[1]));

      // Dibujar polyline
      const polyline = L.polyline(ruta, { color: 'black', weight: 3, opacity: 0.7 }).addTo(map);

      // Ajustar mapa al polyline
      map.fitBounds(polyline.getBounds(), { maxZoom: 18 });

      // Flechas si hay al menos 2 puntos
      if(ruta.length > 1){
        L.polylineDecorator(polyline, {
          patterns: [{
            offset: 25,
            repeat:50,
            symbol: L.Symbol.arrowHead({ pixelSize: 10, polygon: true, pathOptions: { stroke: true, color: 'black' } })
          }]
        }).addTo(map);
      }
        var lastPosition= unidades[unidades.length - 1];
              var carIcon = L.icon({
        iconUrl: 'https://gps.localizate.mx/assets/img/unidades/' + lastPosition.icono,
        iconSize: [36, 36],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      
       const marker = L.marker([lastPosition.latitude, lastPosition.longitude], { icon: carIcon })
          .addTo(map)
          .bindPopup("Unidad");

    }

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage);
  </script>
</body>
</html>
`;


export const sysMapGeo = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Mapa Leaflet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    #map {
      border-radius: 10px;
      height: 100%;
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    var map = L.map('map',{ zoomControl: true }).setView([19.4326, -99.1332], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var geofencePoints = [];
    var markers = [];
    var polygon = null;

    // Función para actualizar polígono
    function updatePolygon() {
      if (polygon) {
        map.removeLayer(polygon);
        polygon = null;
      }
      if (geofencePoints.length > 2) {
        polygon = L.polygon(geofencePoints, { color: 'blue', fillOpacity: 0.2 }).addTo(map);
      }
    }

    // Evento clic en el mapa para agregar puntos
    map.on('click', function(e) {
      var latlng = e.latlng;
      var point = [latlng.lat, latlng.lng];
      geofencePoints.push(point);

      var marker = L.marker(latlng).addTo(map);
      markers.push({ marker, point });

      // Evento para eliminar el marker al clicarlo
      marker.on('click', function() {
        // Remover del mapa
        map.removeLayer(marker);

        // Quitar del array de markers y de puntos
        markers = markers.filter(m => m.marker !== marker);
        geofencePoints = markers.map(m => m.point);

        // Redibujar polígono
        updatePolygon();

        // Enviar datos actualizados a React Native
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'geofence_update',
            points: geofencePoints
          }));
        }
      });

      // Redibujar polígono
      updatePolygon();

      // Enviar puntos al React Native
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'geofence_update',
          points: geofencePoints
        }));
      }
    });

    // Función auxiliar para limpiar todo
    function clearGeofence() {
      geofencePoints = [];
      markers.forEach(m => map.removeLayer(m.marker));
      markers = [];
      updatePolygon();
    }

    // Escuchar mensajes desde React Native
    document.addEventListener("message", function(event) {
      var data = JSON.parse(event.data);
      if (data.type === "clear") {
        clearGeofence();
      }
    });
  </script>
</body>
</html>
`;
