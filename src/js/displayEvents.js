import { getEvents } from "./getEvents.js";
import { showInfo } from "./specificEvent.js";

const eventsEl = document.getElementById("events");
const apiKey = ".json?apikey=IipxTlBL6unLSwOTxDEwtCUpqQ4kyOsq";
const url = `https://app.ticketmaster.com/discovery/v2/events/`;

export async function displayEvents() {
  const data = await getEvents();

  if (!data) {
    console.log("No data available");
    return;
  }

  for (let i = 0; i < data._embedded.events.length; i++) {
    const id = data._embedded.events[i].id;
    const image = data._embedded.events[i].images[3].url;
    const name = data._embedded.events[i].name;
    const date = data._embedded.events[i].dates.start.localDate;
    const time = data._embedded.events[i].dates.start.localTime;
    const city = data._embedded.events[i]._embedded.venues[0].city.name;
    const venue = data._embedded.events[i]._embedded.venues[0].address.line1;

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.classList.add("event-image");

    const nameParagraph = document.createElement("h3");
    nameParagraph.textContent = name;

    const description = document.createElement("p");
    description.textContent = `${date} har du möjlighet att få uppleva detta live.\n
    Tryck på länken nedan för mer information!
    `;
    description.classList.add("description-text");

    const linkElement = document.createElement("a");
    linkElement.textContent = `Visa mer`;
    linkElement.setAttribute("id", `event-link-$d{i}`);
    linkElement.classList.add("event-link");
    linkElement.onclick = async function () {
      const response = await fetch(url + id + apiKey);
      const data = await response.json();
      showInfo(data);
    };

    const container = document.createElement("div");
    container.classList.add("event-div");
    container.setAttribute("id", `event-div-${id}`);

    container.appendChild(imageElement);
    container.appendChild(nameParagraph);
    container.appendChild(description);
    container.appendChild(linkElement);

    eventsEl.appendChild(container);
  }
}
