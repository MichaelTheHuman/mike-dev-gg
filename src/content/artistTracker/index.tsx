import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  Divider,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  Select,
  Alert,
  Switch,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton, Autocomplete, LinearProgress,
} from '@mui/material';
import getEventsByArtist from './API/ticketmasterAPI'
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageTitle from "src/components/PageTitle";
import EventCard, { IEvent } from "./EventCard";
import { formatPriceRange, getDaysDiff } from "./Utils/EventFormatter";
import SelectInput from "@mui/material/Select/SelectInput";
import { ListAlt, ViewModule } from "@mui/icons-material";

export default function ArtistTracker() {
  const availableArtists = [
    "Slipknot",
    "The Strokes",
    "Arctic Monkeys",
    "The Who",
    "Nothing but Thieves",
    "The Chemical Brothers"
  ];
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [viewMode, setViewMode] = useState<"list"|"cards">("list");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  async function generateEvents() {
    setIsLoading(true);
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
        let price = null;
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
    setEvents(newEvents);
    setIsLoading(false);

  }

  return (
    <>
    <PageTitleWrapper>
      <PageTitle
        heading="Artist Tracker"
        subHeading="Choose artists from the list and see the upcoming events related to them in the UK!"
      />
    </PageTitleWrapper>
    <Container maxWidth="lg">
      <Autocomplete
        multiple
        value={selectedArtists}
        onChange={(e, newValue) => {
          setSelectedArtists(newValue);
          // console.log(newValue);
        }}
        options={availableArtists}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Artists"
            // placeholder={"Select artists to track..."}
            sx={{ minWidth: "500px" }}
          />
        )}
      />
      <Box
        display="flex"
        sx={{
          mt: 2
        }}
      >
        {/*{artists.map((artist, key) => (*/}
        {/*  <Button key={key} disabled sx={{ mr: 1 }}>{artist}</Button>*/}
        {/*))}*/}
        {/*<TextField label="Artist keyword" value={artist} onChange={(e) => setArtist(e.target.value)} />*/}
        {/*<TextField label="Country" value="GB" disabled />*/}
        <Button variant="outlined" onClick={() => {
          generateEvents().then(() => {
            console.log("Done!")
          });
          console.log("QWEQWE");
        }}>Search events in UK</Button>


        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newViewMode) => {
            setViewMode(newViewMode);
          }}
          aria-label="text formatting"
          size="small"
          sx={{ ml: "auto" }}
        >
          <ToggleButton value="list" aria-label="list">
            <ListAlt />
          </ToggleButton>
          <ToggleButton value="cards" aria-label="cards">
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
        {/*<FormControlLabel*/}
        {/*  control={*/}
        {/*    <Switch checked={listView}  onChange={() => setListView(!listView)} />*/}
        {/*  }*/}
        {/*  label="List view"*/}
        {/*  sx={{ ml: "auto" }}*/}
        {/*/>*/}

      </Box>
      <Divider sx={{ my: 2 }} />
      {isLoading && (
        <LinearProgress />
      )}
      {!isLoading && events.length === 0 && (
        <Alert variant="outlined" severity="info">No events, try changing the artists list and hitting Search!</Alert>
      )}
      {!isLoading && events.length > 0 && (
        viewMode === "list" ? (
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
                {events.map((card, key) => {

                  let price = "";
                  if (card.priceRange !== null) {
                    price = formatPriceRange(card.priceRange);
                  }

                  let date = null;
                  let dateDiff = null;
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
        ) : (
          <Grid container spacing={2}>
            {events.map((card, key) => (
              <Grid item xs={4} key={key}>
                <EventCard
                  {...card}
                />
              </Grid>
            ))}
          </Grid>
        )

      )}
    </Container>
    </>
  )
}