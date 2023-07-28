function main() {

  let map;

  async function printData() {
    const response = await fetch("https://data.nasa.gov/resource/gh4g-9sfh.json"); // ../data/meteorites.json
    const data = await response.json();

    async function initMap() {
      // The location of Uluru
      const positionStart = { lat: -25.344, lng: 131.031 };

      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      map = new Map(document.getElementById("map"), {
        center: positionStart,
        zoom: 3,
        mapId: "METEORITE_LANDINGS"
      });


      // from here

      data.forEach(landing => {

        var lat = parseFloat(landing.geolocation.latitude);
        var lng = parseFloat(landing.geolocation.longitude);
        const newGeolocation = { lat, lng };
        var geolocation = newGeolocation;

        addMarker(geolocation);

        const infoWindow = new google.maps.InfoWindow({
          content: `<h2>Name: ${landing.name}</h2>
          <h3>Mass: ${parseInt(landing.mass) / 1000} Kg</h3>
          <h3>Fell in year: ${landing.year}</h3>
          <h3>Coordinates: Lat: ${geolocation.lat} Lng: ${geolocation.lng}</h3>
          <h3>Rec-Class: ${landing.recclass}</h3>`,
          ariaLabel: landing.name,
        });

        function addMarker(coords) {
          const marker = new AdvancedMarkerElement({
            map: map,
            position: coords,
            title:
              `Name: ${landing.name},
Mass: ${parseInt(landing.mass) / 1000} Kg
Fell in year: ${landing.year}
Coordinates: Lat: ${geolocation.lat} Lng: ${geolocation.lng}
Rec-Class: ${landing.recclass}`,
          });

          marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker,
              map,
            });
          });
        }

        // till here
      })

    }
    initMap();
    window.initMap = initMap;
  }

  printData();

}

 main();



/* fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
  .then(response => response.json())
  .then(data => {
      console.log(data.lenght);
  })
  */


// How to fetch all the data

/* async function fetchDataFromAPI() {
const baseUrl = 'https://data.nasa.gov/resource/gh4g-9sfh.json';
const perPage = 1000;
let currentPage = 1;
let allData = [];
 
// Fetch data for each page until there is no more data
while (true) {
const url = `${baseUrl}?$limit=${perPage}&$offset=${(currentPage - 1) * perPage}`;
 
try {
const response = await fetch(url);
const data = await response.json();
 
if (data.length === 0) {
  // No more data, break out of the loop
  break;
}
 
// Concatenate the data from this page with the previous data
allData = allData.concat(data);
 
currentPage++;
} catch (error) {
console.error('Error fetching data:', error);
break;
}
}

 
console.log('Total fetched data length:', allData.length);

// Process the entire data here
 


 
}
 
fetchDataFromAPI();

*/
