export async function getLocation(cityName, markerCoords) {
  const openStreetMapUrl = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`;

  try {
    const response = await fetch(openStreetMapUrl);
    const data = await response.json();
    //Hämtar ut första resultatet i data-arrayen ifall flera resultat hittas
    // const markerCoords = { lat: data[0].lat, long: data[0].lon };

    printMap(data[0].boundingbox, markerCoords, data[0].name);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

function printMap(boundingBox, markerCoords, locationName) {
  const iFrameEl = document.getElementById("iFrame");

  iFrameEl.src = `https://www.openstreetmap.org/export/embed.html?bbox=${boundingBox[2]}%2C${boundingBox[0]}%2C${boundingBox[3]}%2C${boundingBox[1]}&amp;layer=mapnik&marker=${markerCoords.latitude},${markerCoords.longitude}`;

  const bigMapEl = document.getElementById("big-map");

  bigMapEl.href = `https://www.openstreetmap.org/search?query=${locationName}/${markerCoords.latitude}/${markerCoords.longitude}`;
}
