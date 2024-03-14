import { getLocation } from "./getLocation";

const searchContainerEl = document.getElementById("search-container");

export async function showInfo(data) {
  searchContainerEl.innerHTML = "";

  const image = data.images[7].url;
  const name = data.name;
  const date = data.dates.start.localDate;
  const time = data.dates.start.localTime;
  const venue = data._embedded.venues[0].address.line1;
  const city = data._embedded.venues[0].city.name;
  let price = "";
  const ticket = data.url;

  if (data.priceRanges && data.priceRanges.length > 0) {
    price = `Pris från ${data.priceRanges[0].min} kr.`;
  } else {
    price = "Priset är inte tillgängligt för tillfället.";
  }

  const container = document.createElement("div");
  container.classList.add("specific-event");

  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.classList.add("larger-image");

  const nameParagraph = document.createElement("h2");
  nameParagraph.textContent = name;

  const dateParagraph = document.createElement("p");
  dateParagraph.textContent = `Datum: ${date}`;

  const timeParagraph = document.createElement("p");
  timeParagraph.textContent = `Tid: ${time}`;

  const venueParagraph = document.createElement("p");
  venueParagraph.textContent = `Plats: ${venue}`;

  const cityParagraph = document.createElement("p");
  cityParagraph.textContent = `Stad: ${city}`;

  const priceParagraph = document.createElement("p");
  priceParagraph.textContent = price;

  const ticketParagraph = document.createElement("p");
  ticketParagraph.classList.add("ticket-paragraph");
  ticketParagraph.innerHTML = `Mer info om biljetter hittar du <a href="${ticket}" target="_blank">här</a>`;

  const mapContainer = document.createElement("div");
  mapContainer.classList.add("map-container");

  var iframe = document.createElement("iframe");
  iframe.width = "600";
  iframe.height = "auto";

  iframe.style.border = "1px solid black";
  iframe.classList.add("map");
  iframe.setAttribute("id", "iFrame");

  const br = document.createElement("br");

  const small = document.createElement("small");
  const link = document.createElement("a");
  link.setAttribute("id", "big-map");
  link.textContent = "Visa större karta";
  small.appendChild(link);

  const backButton = document.createElement("button");
  backButton.textContent = "Tillbaka";
  backButton.classList.add("button");

  backButton.addEventListener("click", function () {
    location.reload();
  });
  const markerCoords = data._embedded.venues[0].location;
  getLocation(data._embedded.venues[0].city.name, markerCoords);

  mapContainer.appendChild(iframe);
  mapContainer.appendChild(br);
  mapContainer.appendChild(small);

  container.appendChild(imageElement);
  container.appendChild(nameParagraph);
  container.appendChild(dateParagraph);
  container.appendChild(timeParagraph);
  container.appendChild(venueParagraph);
  container.appendChild(cityParagraph);
  container.appendChild(priceParagraph);
  container.appendChild(ticketParagraph);
  container.appendChild(mapContainer);

  searchContainerEl.appendChild(container);
  searchContainerEl.appendChild(backButton);
}
