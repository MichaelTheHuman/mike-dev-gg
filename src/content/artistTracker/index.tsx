import React, { useEffect, useState } from "react"
import { Box, Button, Container, TextField, Divider, Grid } from '@mui/material';
import getEventsByArtist from './API/ticketmasterAPI'
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageTitle from "src/components/PageTitle";
import EventCard, { IEventCard } from "./EventCard";

export default function ArtistTracker() {
  const [artist, setArtist] = useState("metallica");
  const [cards, setCards] = useState<IEventCard[]>([]);

  async function generateCards() {
    const events = await getEventsByArtist(artist);
    console.log(events);
    if (!events._embedded) return;
    if (!events._embedded.events) return;
    const cards:IEventCard[] = [];
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
      const card:IEventCard = {
        name: item.name,
        priceRange: price,
        url: item.url,
        images: [image],
        dateTime: (item.dates.start.noSpecificTime ? item.dates.start.localDate : item.dates.start.dateTime) ,
        status: item.dates.status.code
      };
      cards.push(card);
    });
    console.log(cards);
    setCards(cards);

  }

  return (
    <>
    <PageTitleWrapper>
      <PageTitle
        heading="Artist Tracker"
        subHeading="Work in progress..."
      />
    </PageTitleWrapper>
    <Container maxWidth="lg">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField label="Artist keyword" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <TextField label="Country" value="GB" disabled />
        <Button onClick={() => {
          generateCards();
          console.log("QWEQWE");
        }}>Test API</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {cards.map((card, key) => (
        <Grid item xs={4} key={key}>
          <EventCard
            {...card}
          />
        </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}