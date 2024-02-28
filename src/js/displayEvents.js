import { getEvents } from "./getEvents.js";

const eventsEl = document.getElementById("events");

export async function displayEvents() {
  const data = await getEvents();

  if (!data) {
    console.log("No data available");
    return;
  }

  for (let i = 0; i <= 20; i++) {
    const image = data._embedded.events[i].images[3].url;
    const name = data._embedded.events[i].name;
    const date = data._embedded.events[i].dates.start.localDate;
    const time = data._embedded.events[i].dates.start.localTime;
    const city = data._embedded.events[i]._embedded.venues[0].city.name;
    const venue = data._embedded.events[i]._embedded.venues[0].address.line1;
    const minPrice = data._embedded.events[i].priceRanges[0].min;
    const maxPrice = data._embedded.events[i].priceRanges[0].max;

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.classList.add("event-image");

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Event: " + name;

    const dateParagraph = document.createElement("p");
    dateParagraph.textContent = "Datum: " + date;

    const timeParagraph = document.createElement("p");
    timeParagraph.textContent = "Tid: " + time;

    const cityParagraph = document.createElement("p");
    cityParagraph.textContent = `Stad: ${city}`;

    const venueParagraph = document.createElement("p");
    venueParagraph.textContent = `Plats: ${venue}`;

    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = `Biljetter finns för priser mellan ${minPrice}-${maxPrice} kr`;

    const container = document.createElement("div");
    container.classList.add("event-div");

    container.appendChild(imageElement);
    container.appendChild(nameParagraph);
    container.appendChild(dateParagraph);
    container.appendChild(timeParagraph);
    container.appendChild(cityParagraph);
    container.appendChild(venueParagraph);
    container.appendChild(priceParagraph);

    eventsEl.appendChild(container);
  }
}
