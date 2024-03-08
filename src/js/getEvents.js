const url =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=IipxTlBL6unLSwOTxDEwtCUpqQ4kyOsq&countryCode=SE";

export async function getEvents() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}
