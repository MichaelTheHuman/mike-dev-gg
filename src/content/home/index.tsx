import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid, Link,
  Stack, Table, TableCell, TableRow,
  Typography
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import React from "react";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageTitle from "../../components/PageTitle";

export default function Home() {
  const catalogue = [
    {
      title: "Taboo",
      content: <>
        <Typography>A word guessing party game.</Typography>
        <Typography>
          The objective of the game is for a player to have their partners guess the word
          on the player's card without using the 5 words listed on the card.
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography>
          This is my implementation of the game!
        </Typography>
        <Table sx={{ my: 2 }}>
          <TableRow>
            <TableCell sx={{ width: "150px" }}>Language</TableCell>
            <TableCell>TypeScript</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Framework</TableCell>
            <TableCell>React</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>UI Library</TableCell>
            <TableCell>Material UI</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Theme</TableCell>
            <TableCell>
              <Link href="https://github.com/bloomui/tokyo-free-white-react-admin-dashboard" target="_blank">Tokyo White React Admin Dashboard</Link>
            </TableCell>
          </TableRow>
        </Table>
        <Typography>Cards were generated using ChatGPT. Available in English and Polish.</Typography>
      </>,
      actions: <>
        <Button size="small" href="/">Project description and source code</Button>
        <Button size="small" href="/">Click here to play!</Button>
      </>,
    },
    {
      title: "Artist Tracker",
      content: <>
        <Typography>App tracking when are your favourite artists playing next!</Typography>
        <Table sx={{ my: 2 }}>
          <TableRow>
            <TableCell sx={{ width: "150px" }}>Language</TableCell>
            <TableCell>TypeScript</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>API</TableCell>
            <TableCell>Ticketmaster</TableCell>
          </TableRow>
        </Table>
      </>,
      actions: <>
        {/* <Button size="small" href="/">Project description and source code</Button> */}
        <Button size="small" href="/app/artist">Click here to check it out!</Button>
      </>,
    },
    {
      title: "Checkers",
      content: <>
        <Typography>Simple implementation of Checkers in the browser.</Typography>
        <Table sx={{ my: 2 }}>
          <TableRow>
            <TableCell sx={{ width: "150px" }}>Languages</TableCell>
            <TableCell>JavaScript (front-end), NodeJS (server for multiplayer)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Framework</TableCell>
            <TableCell>React</TableCell>
          </TableRow>
        </Table>
      </>,
      actions: <>
        <Button size="small" href="/">Project description and source code</Button>
        <Button size="small" href="/">Click here to play!</Button>
      </>,
    },
  ]
  return (
    <>
      <Helmet>
        <title>Mike Kosiorowski | Home</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Catalogue"
          subHeading="Here are some things I worked on in free time."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {catalogue.map((item, key) => (
            <Grid item xs={6} key={key}>
              <Card>
                <CardHeader title={item.title} />
                <Divider />
                <CardContent>
                  {item.content}
                </CardContent>
                {item.actions && (
                  <>
                    <Divider />
                    <CardActions>
                      {item.actions}
                    </CardActions>
                  </>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </>
  )
}