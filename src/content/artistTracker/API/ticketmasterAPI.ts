import axios from 'axios'

const config = {
  ticketmasterApiKey: null,
  musicSegmentId: "KZFzniwnSyZfZ7v7nJ",
  countryCode: "GB"
};

// seatgeek: df8291497b341a6dd105f1a71f7ae2ad2bcfb6093b19002efb6d1d58fe2e96a1 

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