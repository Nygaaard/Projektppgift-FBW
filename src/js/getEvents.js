const url =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=IipxTlBL6unLSwOTxDEwtCUpqQ4kyOsq&countryCode=SE&size=39";

export async function getEvents() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
