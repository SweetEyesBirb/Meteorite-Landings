
function main() {
  let map;
  const clusters = L.markerClusterGroup();

  const submitBtn = document.getElementById("submit");

  let fetchDataPromise; // Variable to store the ongoing fetch request

  async function fetchDataFromAPI() {
    // Check if the fetch request is already in progress, and return the existing promise
    if (fetchDataPromise) {
      return fetchDataPromise;
    }

    const baseUrl = 'https://data.nasa.gov/resource/gh4g-9sfh.json';
    const perPage = 1000;
    let currentPage = 1;
    let allData = [];

    while (true) {
      const url = `${baseUrl}?$limit=${perPage}&$offset=${(currentPage - 1) * perPage}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
          break;
        }

        allData = allData.concat(data);
        currentPage++;
      } catch (error) {
        console.error('Error fetching data:', error);
        break;
      }
    }

    fetchDataPromise = Promise.resolve(allData); // Store the promise so subsequent calls return the same promise

    return allData;
  }

  async function initMap() {
    const positionStart = { lat: 45, lng: 13 };

    map = L.map("map").setView(positionStart, 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution: '© OpenStreetMap'
    }).addTo(map);

  }

  function isValidCoordinate(coord, isLatitude = true) {
    if (typeof coord !== 'number' || isNaN(coord)) {
      return false;
    }

    if (isLatitude) {
      return Math.abs(coord) <= 90;
    } else {
      return Math.abs(coord) <= 180;
    }
  }

  async function renderData() {

    const allData = await fetchDataFromAPI();

    allData.forEach(landing => {
      const lat = parseFloat(landing.geolocation?.latitude);
      const lng = parseFloat(landing.geolocation?.longitude);

      if (lat && lng && isValidCoordinate(lat) && isValidCoordinate(lng, false)) {
        const coords = { lat, lng };
        const marker = L.marker(coords);

        marker.bindPopup(`<h2>Name: ${landing.name}</h2>
                    <h3>Mass (Kg): ${landing.mass ? parseInt(landing.mass) / 1000 : "No Data"}</h3>
                    <h3>${landing.fall} in year: ${landing.year ? parseInt((landing.year).substring(0, 4), 10) : "Unknown"}</h3>
                    <h3>Coordinates: Lat: ${coords.lat} Lng: ${coords.lng}</h3>
                    <h3>Class: ${landing.recclass}</h3>`);

        clusters.addLayer(marker);
      }
    });

    map.addLayer(clusters);
  }

  async function filterMap(lMass, hMass, fYear, tYear) {
    lMass = lMass ? parseFloat(lMass) : 0;
    hMass = hMass ? parseFloat(hMass) : 60000;
    fYear = fYear ? parseInt(fYear) : 0;
    tYear = tYear ? parseInt(tYear) : 2013;

    clusters.clearLayers();

    console.log("Input values:", lMass, hMass, fYear, tYear);

    const newAllData = await fetchDataFromAPI();

    console.log("Raw data:", newAllData);

    let filteredData = newAllData.filter(landing => {

      const massLow = landing.mass ? (parseInt(landing.mass) / 1000) : 0;
      const massHigh = landing.mass ? (parseInt(landing.mass) / 1000) : 60000;
      const yearLow = landing.year ? parseInt(landing.year?.substring(0, 4), 10) : 860;
      const yearHigh = landing.year ? parseInt(landing.year?.substring(0, 4), 10) : 2013;

      return massLow >= lMass && massHigh <= hMass && yearLow >= fYear && yearHigh <= tYear;
    });

    console.log("Filtered data:", filteredData);

    filteredData.forEach(newLanding => {
      const lat = parseFloat(newLanding.geolocation?.latitude);
      const lng = parseFloat(newLanding.geolocation?.longitude);

      if (lat && lng) {     // !isNaN(lat) && !isNaN(lng)
        const newCoords = { lat, lng };
        const newMarker = L.marker(newCoords);

        newMarker.bindPopup(`<h2>Name: ${newLanding.name}</h2>
                <h3>Mass (Kg): ${newLanding.mass ? parseInt(newLanding.mass) / 1000 : "No Data"}</h3>
                <h3>${newLanding.fall} in year: ${newLanding.year ? parseInt((newLanding.year).substring(0, 4), 10) : "Unknown"}</h3>
                <h3>Coordinates: Lat: ${newCoords.lat} Lng: ${newCoords.lng}</h3>
                <h3>Class: ${newLanding.recclass}</h3>`);

        clusters.addLayer(newMarker);
      }
    });
    map.addLayer(clusters);
  }

  submitBtn.addEventListener("click", event => {
    event.preventDefault();
    let lowerMassValue = document.getElementById("mass-low").value;
    let higherMassValue = document.getElementById("mass-high").value;
    let yearFrom = document.getElementById("year-from").value;
    let yearTo = document.getElementById("year-to").value;

    console.log(lowerMassValue, higherMassValue, yearFrom, yearTo)
    filterMap(lowerMassValue, higherMassValue, yearFrom, yearTo);
  });

  initMap();
  window.initMap = initMap;

  window.onload = () => {
    renderData();
  }
}

main();
