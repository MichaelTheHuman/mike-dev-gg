import axios from 'axios'

const config = {
  rapidAPIKey: null,
  rapidAPIHost: null,
};

export default async function getUpcomingEventsByArtist(artist: string) {
  const options = {
    method: "GET",
    url: "https://" + config.rapidAPIHost + "/artist",
    params: {
      name: artist,
      page: "1"
    },
    headers: {
      'X-RapidAPI-Key': config.rapidAPIKey,
      'X-RapidAPI-Host': config.rapidAPIHost
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