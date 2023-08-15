import { Button, Card, CardActions, CardContent, CardHeader, Divider, ImageList, Table, TableBody, TableCell, TableRow } from "@mui/material"

interface IEventPriceRange {
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

export interface IEventCard {
  name: string;
  priceRange: IEventPriceRange|null;
  url: string;
  images: IEventImage[];
  dateTime: string;
  status: "onsale"|"?";
}

export default function EventCard(props: IEventCard) {
  let price = "";
  if (props.priceRange !== null) {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: props.priceRange.currency,
    });
    price = formatter.format(props.priceRange.min);
    if (props.priceRange.max !== props.priceRange.min) {
      price += " - ";
      price += formatter.format(props.priceRange.max);
    }
  }

  let date = "N/A";
  if (props.dateTime !== null) {
    date = new Date(props.dateTime).toLocaleString();
    let date1 = new Date();
    let date2 = new Date(props.dateTime);
    let diff = Math.abs(date1.getTime() - date2.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    date += " (" + diffDays + "d)";
  }


  return (
    <>
      <Card>
        <CardHeader title={props.name} />
        <Divider />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>{date}</TableCell>
              </TableRow>
              {price && (
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell>{price}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <br />
          <img
            src={props.images[0].url}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button href={props.url} target="_blank" disabled={!props.url}>Tickets</Button>
        </CardActions>
      </Card>
    </>
  )
}