import { IEventPriceRange } from "../EventCard";

export function formatPriceRange(priceRange: IEventPriceRange) {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: priceRange.currency,
  });
  let price = formatter.format(priceRange.min);
  if (priceRange.max !== priceRange.min) {
    price += " - ";
    price += formatter.format(priceRange.max);
  }
  return price;
}

export function getDaysDiff(dateTime: string, fromDateTime:string = "") {
  let date1 = new Date();
  let date2 = new Date(dateTime);
  let diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}