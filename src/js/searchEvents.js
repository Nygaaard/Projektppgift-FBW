const searchButtonEl = document.getElementById("search-button");
const searchEl = document.getElementById("search");
const url =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=IipxTlBL6unLSwOTxDEwtCUpqQ4kyOsq&countryCode=SE&size=172";

export function search() {
  searchButtonEl.addEventListener("click", async function () {
    try {
      const response = await fetch(`${url}&city=${searchEl.value}`);
      const data = await response.json();

      printEvents(data);
    } catch (error) {
      console.log("Error", error);
    }
  });
}

function printEvents() {}
