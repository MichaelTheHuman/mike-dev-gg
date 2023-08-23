
export interface IEventPriceRange {
  currency: string;
  max: number;
  min: number;
}

interface IEventImage {
  url: string;
  height: number;
  width: number;
  ratio: "16_9"|"3_2";
}

export interface IEvent {
  name: string;
  priceRange: IEventPriceRange|null;
  url: string;
  images: IEventImage[];
  dateTime: string;
  status: "onsale"|"?";
}