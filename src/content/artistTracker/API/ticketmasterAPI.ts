import axios from 'axios'

const config = {
  ticketmasterApiKey: null,
  musicSegmentId: "KZFzniwnSyZfZ7v7nJ",
  countryCode: "GB"
};

/**
 * @IMPROVEMENT for this API request, rather than getting it directly from
 * the vendor, it should route to a custom server, which will enable the
 * possibility of rate limiting, to prevent spamming the API
 */
export default async function getEventsByArtist(artist: string):Promise<any> {
  if (!config.ticketmasterApiKey) {
    alert("TicketMasterAPIKey missing - cannot get events data.");
    return;
  }
  const options = {
    method: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json",
    params: {
      "apikey": config.ticketmasterApiKey,
      "size": 10,
      "countryCode": config.countryCode,
      "segmentId": config.musicSegmentId,
      "keyword": artist
      // "performers.slug": artist,
      // "lat": "51.509865", // UK lat/lon
      // "lon": "-0.118092",
      // "range": "1000mi"
    }
  }
  try {
    const response = await axios.request(options);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }

}