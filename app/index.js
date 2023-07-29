
function main() {
    let map;
  
    async function fetchDataFromAPI() {
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
  
      return allData;
    }
  
    async function initMap() {
      const positionStart = { lat: -25.344, lng: 131.031 };
  
      map = L.map("map").setView(positionStart, 3);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution: '© OpenStreetMap'
    }).addTo(map);
  
      const markers = L.markerClusterGroup();
  
      try {
        // Gets the returned data from the fetch API
        const allData = await fetchDataFromAPI();
  
        allData.forEach(landing => {
          const lat = parseFloat(landing.geolocation?.latitude);
          const lng = parseFloat(landing.geolocation?.longitude);
  
          if (!isNaN(lat) && !isNaN(lng)) {
            const coords = { lat, lng };
            const marker = L.marker(coords);
  
            marker.bindPopup(`<h2>Name: ${landing.name}</h2>
              <h3>Mass: ${landing.mass ? parseInt(landing.mass) / 1000 : "No Data"} Kg</h3>
              <h3>${landing.fall} in year: ${landing.year ? landing.year : "Unknown"}</h3>
              <h3>Coordinates: Lat: ${coords.lat} Lng: ${coords.lng}</h3>
              <h3>Rec-Class: ${landing.recclass}</h3>`);
  
            markers.addLayer(marker);
          } /* else {
            console.warn('Invalid geolocation data:', landing);
          } */
        });
  
        map.addLayer(markers);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
  
    initMap();
    window.initMap = initMap;
  }
  
  main();

