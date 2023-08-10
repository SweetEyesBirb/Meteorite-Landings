# Meteorite Landings Map

## Goal
This is a small project from a first year CS student aiming at improving web deveopment skills while practicing fetching JSON data from a dataset and its consequent manipulation.

## The Process and its Challenges
The idea of creating an interactive map with the locations of all the meteorites stored in a dataset was simple.\
Nevertheless, building the website has proven to be challenging. To start of, the dataset had to be found. This took a couple of days since I did not know where to look. Then, I had to practice working with mock JSON data as the endpoint requires a good understanding on how to extrapolate the values from the API. Once I was confident, I began building the HTML with a simple and minimalistic design while keeping an eye on accessibility and SEO. This is where the real challenges started.\
Firstly, I had to find out how to embed a map on my website. Google Maps was my first choice. While in the process, I realised that they require you to subscribe to Google Cloud, which is free for the first 3 months, before setting up the project on Google Dev Console. As a student, I have to minimise my cost of living, therefore, I had to look for another solution.\
I was lucky because Leaflet JS was exactly what I was looking for. This is when the real challenges emerged. Firstly, I had to read the vast documentation available in the Leaflet website. The knowledge is not easy to grasp for someone with less than a year experience in programming. After a couple of tries I had my map displayed. It was time to add the data.\
At first, I logged into the console the data coming from the API endpoint like I had been thought in learnjavascript.online. Something was wrong. Only 1000 objects were displayed instead of 45000+, but my proirity was to add the marks on the map. That was going to be easy enough with the documentation provided, if it wasn't for the missing geolocation key in many entries and the fact that the map accepts coordinates only in specific ways. To tackle this issue I resorted to using optional chaining and ternary operators with default values. The map was now showing the marks.\
I took a break from Javascript to add more HTML and cleaned the layout.\
Back to JS to figure out about the restricted number of objects retrieved by the fetch API. Things got really difficult at this stage. Although I suspected that the endpoint was the cause, I could not find out what and why. As mentioned above, my knowledge in programming is not wide.\
After an unsuccessful research I resorted to ChatGPT for some answers. The LLM quickly gave me the outcome and a code snippet. It was due to "pagination" which was something I did not hear or read before in any article, news or YouTube video. The code provided by the AI worked well and logged all the objects in the console.\
Great. At this point I cleaned my code a bit and proofed the HTML for accessibility. Then, I decided to add some filters in case the user wants to display only certain meteorites. The implementation of this fature was also difficult and I encountered many problems due to the asynchronous nature of the functions. It was often hard to debug the code just by reading the console output. The web does not have all the answers for all the possible scenarios. Intuition and trial and error, however, gave birth to some solutions which eventually fixed the poorly written code.

After this point, only small HTML and CSS additions have been added and pushed into the repository to make the site more appealing.

## Info
The website displays all the meteorite landings from the NASA dataset at https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh.

- **Due to the large number of objects (around 45000), the markers on the page may take a while to spawn, usually between 10 to 40 seconds depending on the processing power of the device and connection speed.**
- A very large cluster at {lat: 0, lng: 0} (South West of Nigeria), a collection of all the objects with no coordinates (6000+) has been removed as opening this cluster may cause the page to stop responding.

## Attributions and resources
- The map was rendered via Leaflet library in JS https://leafletjs.com/.
- Clustering was made possible because of this repo https://github.com/Leaflet/Leaflet.markercluster.
- © OpenStreetMap.

## Webpage Link
**Webpage at https://sweeteyesbirb.github.io/Meteorite-Landings-Map/**
