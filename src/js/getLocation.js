export async function getLocation(cityName) {
  const openStreetMapUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName},Sweden`;

  try {
    const response = await fetch(openStreetMapUrl);
    const data = await response.json();
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    console.log(latitude, longitude);
    return { latitude, longitude };
  } catch (error) {
    console.log("Error fetching coordinates:", error);
    throw error;
  }
}
