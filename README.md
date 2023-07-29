# Meteorite-Landings
This is a small project from a first year CS student that was aiming at practicing fetching JSON data from a dataset and its consequent manipulation.
The website displays all the meteorite landings that contain valid coordinates from the NASA dataset at https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh.
Due to the large number of objects (around 45000), the markers on the page may take a while to spawn, usually around 10 seconds.
The map was rendered via Leaflet library in JS https://leafletjs.com/.
Clustering was made possible because of this repo https://github.com/Leaflet/Leaflet.markercluster.
