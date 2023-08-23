import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  ImageList,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material"
import { formatPriceRange, getDaysDiff } from "../Utils/EventFormatter";

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

export default function EventCard(props: IEvent) {
  let price = "";
  if (props.priceRange !== null) {
    price = formatPriceRange(props.priceRange);
  }

  let date = null;
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
        <CardHeader title={props.name} sx={{ minHeight: "72px" }} />
        <Divider />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>{date || <Typography variant="caption">N/A</Typography>}</TableCell>
              </TableRow>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell>{price || <Typography variant="caption">N/A</Typography>}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
          
          <br />
          <Box display="flex">
            <img
              src={props.images[0].url}
              style={{ borderRadius: "4px", maxHeight: "100px", margin: "auto" }}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button href={props.url} target="_blank" disabled={!props.url}>Tickets</Button>
        </CardActions>
      </Card>
    </>
  )
}