import { showInfo } from "./specificEvent.js";

const searchButtonEl = document.getElementById("search-button");
const searchEl = document.getElementById("search");
const eventsEl = document.getElementById("events");
const popularEl = document.getElementById("popular");
const buttonContainerEl = document.getElementById("button-container");

const apiKey = ".json?apikey=IipxTlBL6unLSwOTxDEwtCUpqQ4kyOsq";
const searchUrl = `https://app.ticketmaster.com/discovery/v2/events/`;

let isOnEvent = false;
const url =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=IipxTlBL6unLSwOTxDEwtCUpqQ4kyOsq&countryCode=SE&size=172";

export function search() {
  searchButtonEl.addEventListener("click", async function () {
    try {
      const response = await fetch(`${url}&city=${searchEl.value}`);
      const data = await response.json();
      popularEl.innerHTML = `Evenemang i ${searchEl.value}`;
      buttonContainerEl.innerHTML = "";
      const backButton = document.createElement("button");
      backButton.textContent = "Tillbaka";
      backButton.classList.add("button");

      backButton.addEventListener("click", function () {
        location.reload();
      });

      buttonContainerEl.appendChild(backButton);
      printEvents(data);
    } catch (error) {
      console.log("Error", error);
    }
  });
}

function printEvents(data) {
  eventsEl.innerHTML = "";

  if (!data._embedded) {
    popularEl.innerHTML = "";
    eventsEl.innerHTML =
      "Finns inga evenemeng i denna stad för tillfället.<br>Försök igen!";
    return;
  }

  for (let i = 0; i < data._embedded.events.length; i++) {
    const id = data._embedded.events[i].id;
    const image = data._embedded.events[i].images[3].url;
    const name = data._embedded.events[i].name;
    const date = data._embedded.events[i].dates.start.localDate;
    if (isOnEvent) {
      time = data._embedded.events[i].dates.start.localTime;
      city = data._embedded.events[i]._embedded.venues[0].city.name;
      venue = data._embedded.events[i]._embedded.venues[0].address.line1;
    }

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.classList.add("event-image");

    const nameParagraph = document.createElement("h3");
    nameParagraph.textContent = name;

    const description = document.createElement("p");
    description.textContent = `${date} har du möjlighet att få uppleva detta live.\n
    Tryck på länken nedan för mer information.
    `;
    description.classList.add("description-text");

    const linkElement = document.createElement("a");
    linkElement.textContent = `Visa mer`;
    linkElement.setAttribute("id", `event-link-$d{i}`);
    linkElement.classList.add("event-link");
    linkElement.onclick = async function () {
      isOnEvent = true;
      const response = await fetch(searchUrl + id + apiKey);
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
