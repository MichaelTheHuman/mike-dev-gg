import React from 'react';
import { IEvent } from './types';
import { Table, Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { formatPriceRange, getDaysDiff } from '../Utils/EventFormatter';

export default function EventTable(props: {
  events: IEvent[]
}) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Event name</TableCell>
            <TableCell>Countdown</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Tickets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.events.map((card, key) => {

            let price = "";
            if (card.priceRange !== null) {
              price = formatPriceRange(card.priceRange);
            }

            let date:string|null = null;
            let dateDiff:string|null = null;
            if (card.dateTime !== null) {
              date = new Date(card.dateTime).toLocaleString();
              dateDiff = "(" + getDaysDiff(card.dateTime).toString() + "d)";
              // console.log(dateDiff, card.dateTime, getDaysDiff(card.dateTime));
            }

            return (
              <TableRow key={key}>
                <TableCell
                  // sx={{ height: "20px" }}
                >
                  <img
                    src={card.images[0].url}
                    alt={card.name}
                    style={{ maxHeight: "100px", borderRadius: "4px" }}
                  />
                </TableCell>
                <TableCell>{card.name}</TableCell>
                <TableCell>{dateDiff || <Typography variant="caption">N/A</Typography>}</TableCell>
                <TableCell>{date || <Typography variant="caption">N/A</Typography>}</TableCell>
                {/* @TODO Date on hover*/}
                <TableCell>{price || <Typography variant="caption">N/A</Typography>}</TableCell>
                <TableCell>
                  <Button href={card.url} variant="outlined" target="_blank" size="small" disabled={!card.url}>Tickets</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}