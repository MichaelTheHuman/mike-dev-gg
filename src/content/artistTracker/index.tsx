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
// import getEventsByArtist from './API/ticketmasterAPI'
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageTitle from "src/components/PageTitle";
import EventTable from "./EventView/EventTable";
import EventCard from "./EventView/EventCard";
// import EventCard, { IEvent } from "./EventCard";
import { formatPriceRange, getDaysDiff } from "./Utils/EventFormatter";
import SelectInput from "@mui/material/Select/SelectInput";
import { ListAlt, ViewModule } from "@mui/icons-material";
import { generateEvents } from "./Utils/GenerateEvents";
import { IEvent } from "./EventView/types";

export default function ArtistTracker() {
  const availableArtists = [
    "Slipknot",
    "The Strokes",
    "Arctic Monkeys",
    "The Who",
    "Nothing but Thieves",
    "The Chemical Brothers",
    "King Gizzard and the Lizard Wizard"
  ];
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [viewMode, setViewMode] = useState<"list"|"cards">("list");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getEvents() {
    setIsLoading(true);
    /** @IMPROVEMENT error handling */
    const newEvents = await generateEvents(selectedArtists);
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
          />
        )}
      />
      <Box
        display="flex"
        sx={{
          mt: 2
        }}
      >
        <Button variant="outlined" onClick={() => {
          getEvents().then(() => {
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
          aria-label="view mode"
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
          <EventTable
            events={events}
          />
        ) : (
          <Grid container spacing={2}>
            {events.map((card, key) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
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