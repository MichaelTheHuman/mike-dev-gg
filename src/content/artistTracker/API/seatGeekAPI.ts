import axios from 'axios'

const config = {
  seatGeekClientID: "___",
  seatGeekSecret: "___",
};

export default async function getEventsByArtist(artist: string) {
  const options = {
    method: "GET",
    url: "https://api.seatgeek.com/2/events",
    params: {
      "client_id": config.seatGeekClientID,
      "client_secret": config.seatGeekSecret,
      // "performers.slug": artist,
      "venue.country": "UK",
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