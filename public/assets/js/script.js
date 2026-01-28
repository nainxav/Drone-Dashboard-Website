var [x, y] = [-6.895865463274139, 107.76433421404633];

const server = "http://127.0.0.1:5000";



// const imageUrl = "kirpay.png";


var map = L.map("map", {
  crs: L.CRS.EPSG3857,
  center: [x, y],
  zoom: 13,
  maxZoom: 20,
  minZoom: 6,
}).setView([x, y], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  crs: L.CRS.EPSG3857,
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const behaviorConfig = {
  coordinatePrecision: 6,
  mode: "polygon",
  pointerDistance: 10,
  project: (coords) => {
    return map.latLngToLayerPoint(L.latLng(coords.lat, coords.lng));
  },
  projection: L.CRS.EPSG3857,
  store: "GeoJSONStore",
  unproject: (point) => {
    return map.layerPointToLatLng(L.point(point.x, point.y));
  },
};

let draw = new terraDraw.TerraDraw({
  adapter: new terraDraw.TerraDrawLeafletAdapter({
    lib: L,
    map: map,
  }),
  behaviorConfig: behaviorConfig,
  modes: [
    new terraDraw.TerraDrawSelectMode({
      allowManualDeselection: true,

      flags: {
        point: {
          feature: {
            draggable: true,
          },
        },

        polygon: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },

        linestring: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },

        freehand: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },

        circle: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },

        rectangle: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },
      },
    }),
    new terraDraw.TerraDrawPointMode(),
    new terraDraw.TerraDrawLineStringMode(),
    new terraDraw.TerraDrawRectangleMode(),
    new terraDraw.TerraDrawPolygonMode({
      styles: {
        fillOpacity: 0.6,
        // fillColor: ({ id }) => {
        //   if (!colorCache[id]) {
        //     colorCache[id] = getRandomColor();
        //   }
        //   return colorCache[id];
        // },

        fillColor: ({ id }) => {
          return findLayerIndexByTerraId(layer, id)
            ? findLayerIndexByTerraId(layer, id)
            : activatedLayer[0].color;
        },
        // fillColor: "#ff0a0a",
      },
    }),
    new terraDraw.TerraDrawFreehandMode(),
    new terraDraw.TerraDrawCircleMode(),
  ],
});

draw.start();

// async function cobain(){
//   const element2 = [
//     {
//       id: draw.getFeatureId(),
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         // coordinates: [107.637, -6.897],
//         coordinates: [107.76433421404633, -6.895865463274139],
//         // coordinates: [-6.53, 107.38],
//         // -6.895865463274139, 107.76433421404633

//       },
//       properties: {
//         mode: "point",
//       },
//       properties2: {
//         d: "sd",
//       },
//     },
//   ];

//   L.geoJSON(element2, {
//     onEachFeature: function (feature, layer) {
//       layer.on("click", function () {
//         const content = `
//           <div style="text-align:center;">
//             <p><strong>07.32 5 December 2025 </strong>Human Detected</p>
//             <img src="${imageUrl}" alt="Popup Image" style="width:200px; border-radius:8px;" />
//           </div>
//         `;
//         L.popup()
//           .setLatLng(layer.getLatLng())
//           .setContent(content)
//           .openOn(map);
//       });
//     },
//   }).addTo(map);
  
//   console.log(element2[0].geometry.coordinates);
//   const bounds2 = L.GeoJSON.coordsToLatLngs([
//     element2[0].geometry.coordinates,
//     [107.637, -6.897],
//   ]);
//   const bound2 = L.GeoJSON.coordsToLatLng(element2[0].geometry.coordinates);
  
//   // console.log(element2.geometry.coordinates);
//   console.log(element2);
//   draw.clear();
//   map.setView(bound2, 19);
//   // draw.addFeatures(element2);  
// }

async function getDroneData() {
  const res = await fetch("http://127.0.0.1:5000/data");
  const json = await res.json();
  return json; // array of drone data
}


// async function cobain() {

//   // 1. Get drone data from backend
//   const droneData = await getDroneData();

//   // Pick the latest entry (usually last item)
//   const drone = droneData[droneData.length - 1];

//   const lat = drone.latitude;
//   const lon = drone.longitude;

//   // 2. Build image file name from your backend timestamp
//   // You MUST get this timestamp from Flask (passed or returned)
//   const timestamp = drone.timestamp || "unknown";  
//   const rawTimestamp = drone.timestamp || null;

// //let imageUrl = "/photos/unknown.jpg";

//   const date = new Date(rawTimestamp);

//   const MM = String(date.getMonth() + 1).padStart(2, "0");
//   const DD = String(date.getDate()).padStart(2, "0");
//   const HH = String(date.getHours()).padStart(2, "0");
//   const mm = String(date.getMinutes()).padStart(2, "0");
//   const ss = String(date.getSeconds()).padStart(2, "0");

//   const filename = `${MM}-${DD}-${HH}-${mm}-${ss}.jpg`;
//   const imageUrl = `http://127.0.0.1:5000/foto/${filename}`;

  
// // 1. Icon
//   const droneIcon = L.icon({
//   iconUrl: '/assets/images/drone.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32]
// });

// // // 2. GeoJSON feature
// // const feature = {
// //   id: draw.getFeatureId(),
// //   type: "Feature",
// //   geometry: {
// //     type: "Point",
// //     coordinates: [lon, lat], // GeoJSON = [lon, lat]
// //   },
// //   properties: {
// //     mode: "point",
// //   },
// // };



//   // 3. Create GeoJSON point
//   const feature = [{
//     id: draw.getFeatureId(),
//     type: "Feature",
//     geometry: {
//       type: "Point",
//       coordinates: [lon, lat],
//     },
//     properties: {
//       mode: "point",
//     },
//   }];

//   // 3. Render GeoJSON as icon
//   L.geoJSON(feature, {
//     pointToLayer: (geoJsonPoint, latlng) => {
//       return L.marker(latlng, { icon: droneIcon });
//     }
//   }).addTo(map);

//   // 4. Add to map with popup
//   L.geoJSON(feature, {
//     onEachFeature: function (feature, layer) {
//       layer.on("click", function () {
//         const content = `
//           <div style="text-align:center;">
//             <p><strong>${timestamp}</strong> — Human Detected</p>
//             <img src="${imageUrl}" alt="Popup Image" style="width:200px; border-radius:8px;" />
//           </div>
//         `;
//         L.popup()
//           .setLatLng(layer.getLatLng())
//           .setContent(content)
//           .openOn(map);
//       });
//     },
//   }).addTo(map);

//   // 5. Move map to the drone coordinate
//   map.setView([lat, lon], 19);

//   draw.clear();
// }

let droneMarker = null;          // icon drone (1)
let detectionLayer = L.layerGroup().addTo(map); // titik deteksi (banyak)

async function cobain() {

  // ===============================
  // 1. AMBIL DATA DRONE
  // ===============================
  const droneData = await getDroneData();
  if (!droneData || droneData.length === 0) return;

  const drone = droneData[droneData.length - 1];

  const lat = drone.latitude;
  const lon = drone.longitude;
  const timestamp = drone.timestamp;
  console.log("human_detected:", drone.human_detected);


  // ===============================
  // 2. DRONE ICON (REAL-TIME)
  // ===============================
  const droneIcon = L.icon({
    iconUrl: '/assets/images/drone.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  if (!droneMarker) {
    // pertama kali
    droneMarker = L.marker([lat, lon], { icon: droneIcon })
      .addTo(map);
  } else {
    // update posisi
    droneMarker.setLatLng([lat, lon]);
  }

  map.setView([lat, lon], 19);

  // ===============================
  // 3. JIKA ADA DETEKSI MANUSIA
  // (INI POINT — TIDAK DIUBAH)
  // ===============================
if (Number(drone.human_detected) === 1) {

    // build image filename
    const date = new Date(timestamp);
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const DD = String(date.getDate()).padStart(2, "0");
    const HH = String(date.getUTCHours()).padStart(2, "0");
    const mm = String(date.getUTCMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    const filename = `${MM}-${DD}-${HH}-${mm}-${ss}.jpg`;
    const imageUrl = `http://127.0.0.1:5000/foto/${filename}`;

    // ===============================
    // 4. GEOJSON POINT DETEKSI (HISTORY)
    // ===============================
    const feature = [{
      id: draw.getFeatureId(),
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
      properties: {
        mode: "point"
      },
    }];

    L.geoJSON(feature, {
      onEachFeature: function (feature, layer) {
        layer.on("click", function () {
          const content = `
            <div style="text-align:center;">
              <p><strong>${timestamp}</strong> — Human Detected</p>
              <img src="${imageUrl}" style="width:200px; border-radius:8px;" />
            </div>
          `;
          L.popup()
            .setLatLng(layer.getLatLng())
            .setContent(content)
            .openOn(map);
        });
      },
    }).addTo(detectionLayer);
  }
}


async function fetchData() {
  try {
    console.log("anjai");
    // const response = await fetch('http://192.168.105.193:5000/data');
    const response = await fetch(`${server}/data`);
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      const altitude = document.getElementById("altitudeValue");
      altitude.textContent = `Altitude: ${data[data.length - 1].altitude}`;

      const latitude = document.getElementById("latitudeValue");
      latitude.textContent = `Latitude: ${data[data.length - 1].latitude}`;

      const longitude = document.getElementById("longitudeValue");
      longitude.textContent = `Longitude: ${data[data.length - 1].longitude}`;

      // const yaw = document.getElementById('yawValue');
      // yaw.textContent = `Yaw: ${data[data.length-1].yaw}`;

      // const roll = document.getElementById('rollValue');
      // roll.textContent = `Roll: ${data[data.length-1].roll}`;

      // const groundSpeed = document.getElementById('groundSpeedValue');
      // groundSpeed.textContent = `Ground Speed: ${data[data.length-1].groundspeed}`;

      // const verticalSpeed = document.getElementById('verticalSpeedValue');
      // verticalSpeed.textContent = `Vertical Speed: ${data[data.length-1].verticalspeed}`;

      // const satCount = document.getElementById('satCountValue');
      // satCount.textContent = `Sat Count: ${data[data.length-1].satcount}`;

      // const wpDist = document.getElementById('wp_distValue');
      // wpDist.textContent = `WP Distance: ${data[data.length-1].wp_dist}`;
      const element = [
        {
          id: draw.getFeatureId(),
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              data[data.length - 1].longitude,
              data[data.length - 1].latitude,
            ],
          },
          properties: {
            mode: "point",
          },
          properties2: {
            d: "sd",
          },
        },
      ];

      console.log(element[0].geometry.coordinates);
      const bounds = L.GeoJSON.coordsToLatLngs([
        element[0].geometry.coordinates,
        [107.609, -6.91357],
      ]);
      const bound = L.GeoJSON.coordsToLatLng(element[0].geometry.coordinates);
      // console.log(bound);
      // map.fitBounds(bound);
      map.setView(bound, 19);
      draw.clear();
      // draw.addFeatures(element);


    } else {
      const responseText = await response.text();
      console.error("Response was not JSON:", responseText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function command(command) {
  console.log(`${server}/command`);
  const response = await fetch(`${server}/command`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command: command }),
  });
  console.log(response);
}

// const armButton = document.querySelector("#armButton");
// armButton.addEventListener("click", () => command("arm"));
// const disarm = document.querySelector("#disarmButton");
// disarm.addEventListener("click", () => command("disarm"));
// const statusText = document.querySelector("#statusText");
// if (armButton && disarm && statusText) {
//   armButton.addEventListener("click", () => {
//     statusText.textContent = "Currently Armed";
//   });
//   disarm.addEventListener("click", () => {
//     statusText.textContent = "Currently Disarmed";
//   });
// }

const armButton = document.querySelector("#armButton");
const disarmButton = document.querySelector("#disarmButton");
const statusText = document.querySelector("#statusText");

if (armButton && disarmButton && statusText) {
  armButton.addEventListener("click", () => {
    command("arm");
    statusText.textContent = "Currently Armed";
  });

  disarmButton.addEventListener("click", () => {
    command("disarm");
    statusText.textContent = "Currently Disarmed";
  });
}


const motor1Button = document.querySelector("#motor1Button");
motor1Button.addEventListener("click", () => command("testmotor,1,15"));
const motor2Button = document.querySelector("#motor2Button");
motor2Button.addEventListener("click", () => command("testmotor,2,15"));
const motor3Button = document.querySelector("#motor3Button");
motor3Button.addEventListener("click", () => command("testmotor,3,15"));
const motor4Button = document.querySelector("#motor4Button");
motor4Button.addEventListener("click", () => command("testmotor,4,15"));

const gpsForm = document.getElementById("gpsForm");
gpsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const latitude  = document.getElementById("latitude").value.trim();
  const longitude = document.getElementById("longitude").value.trim();
  const altitude  = document.getElementById("altitude").value.trim();

  if (!latitude || !longitude || !altitude) {
    alert("Semua field wajib diisi");
    return;
  }

  const cmd = `goto,${altitude},${latitude},${longitude}`;

  console.log("Send command:", cmd);
  command(cmd);
  gpsForm.reset();
});


window.addEventListener("DOMContentLoaded", () => {
  setInterval(fetchData, 3000);
  setInterval(cobain,3000);
  //cobain();
});
