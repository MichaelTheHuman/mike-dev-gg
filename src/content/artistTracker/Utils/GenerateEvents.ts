import { IEvent, IEventPriceRange } from "./../EventView/types";
import getEventsByArtist from './../API/ticketmasterAPI'

export async function generateEvents(selectedArtists: string[]) {
  const eventsByArtist = {};
  const newEvents:IEvent[] = [];
  for await (const artistKeyword of selectedArtists) {
    const events = await getEventsByArtist(artistKeyword);

    if (!events._embedded || !events._embedded.events) {
      eventsByArtist[artistKeyword] = [];
      console.log("No events found for: " + artistKeyword + ".");
      continue;
    }

    events._embedded.events.map((item:any) => {
      let image = {
        url: item.images[0].url,
        ratio: item.images[0].ratio,
        height: item.images[0].height,
        width: item.images[0].width
      };

      item.images.map(imageItem => {
        if (imageItem.width < image.width) {
          return;
        }
        image = {
          url: imageItem.url,
          ratio: imageItem.ratio,
          height: imageItem.height,
          width: imageItem.width
        };
      })
      let price:IEventPriceRange|null = null;
      if (item.priceRanges !== undefined) {
        const priceRange = item.priceRanges.filter(item => item.type === "standard")[0];
        price = {
          currency: priceRange.currency,
          min: priceRange.min,
          max: priceRange.max
        };
      }
      const newEvent:IEvent = {
        name: item.name,
        priceRange: price,
        url: item.url,
        images: [image],
        dateTime: (item.dates.start.noSpecificTime ? item.dates.start.localDate : item.dates.start.dateTime) ,
        status: item.dates.status.code
      };
      newEvents.push(newEvent);
    });
    eventsByArtist[artistKeyword] = events._embedded;
  }
  newEvents.sort((a, b) => {
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  })
  console.log(eventsByArtist);
  return newEvents;
}