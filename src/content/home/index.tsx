import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid, Link,
  Stack, Table, TableBody, TableCell, TableRow,
  Typography
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import React from "react";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageTitle from "../../components/PageTitle";

export default function Home() {
  const catalogue = [
    // {
    //   title: "Taboo",
    //   content: <>
    //     <Typography>A word guessing party game.</Typography>
    //     <Typography>
    //       The objective of the game is for a player to have their partners guess the word
    //       on the player's card without using the 5 words listed on the card.
    //     </Typography>
    //     <Divider sx={{ my: 1 }} />
    //     <Typography>
    //       This is my implementation of the game!
    //     </Typography>
    //     <Table sx={{ my: 2 }}>
    //       <TableRow>
    //         <TableCell sx={{ width: "150px" }}>Language</TableCell>
    //         <TableCell>TypeScript</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>Framework</TableCell>
    //         <TableCell>React</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>UI Library</TableCell>
    //         <TableCell>Material UI</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>Theme</TableCell>
    //         <TableCell>
    //           <Link href="https://github.com/bloomui/tokyo-free-white-react-admin-dashboard" target="_blank">Tokyo White React Admin Dashboard</Link>
    //         </TableCell>
    //       </TableRow>
    //     </Table>
    //     <Typography>Cards were generated using ChatGPT. Available in English and Polish.</Typography>
    //   </>,
    //   actions: <>
    //     <Button size="small" href="/">Project description and source code</Button>
    //     <Button size="small" href="/">Click here to play!</Button>
    //   </>,
    // },
    {
      title: "Artist Tracker",
      content: <>
        <Table sx={{ mb: 2 }}>
          <TableBody>
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
                <Link href="https://github.com/bloomui/tokyo-free-white-react-admin-dashboard" target="_blank">
                  Tokyo Admin Dashboard
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>API</TableCell>
              <TableCell>
                <Link 
                  href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2" 
                  target="_blank"
                >
                  Ticketmaster
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography>App tracking when are your favourite artists playing next!</Typography>
      </>,
      actions: <>
        {/* <Button size="small" href="/">Project description and source code</Button> */}
        <Button size="small" href="/app/artist">Live version</Button>
        <Button size="small" target="_blank" href="https://github.com/MichaelTheHuman/mike-dev-gg/">GitHub repo</Button>
      </>,
    },
    // {
    //   title: "Checkers",
    //   content: <>
    //     <Typography>Simple implementation of Checkers in the browser.</Typography>
    //     <Table sx={{ my: 2 }}>
    //       <TableRow>
    //         <TableCell sx={{ width: "150px" }}>Languages</TableCell>
    //         <TableCell>JavaScript (front-end), NodeJS (server for multiplayer)</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>Framework</TableCell>
    //         <TableCell>React</TableCell>
    //       </TableRow>
    //     </Table>
    //   </>,
    //   actions: <>
    //     <Button size="small" href="/">Project description and source code</Button>
    //     <Button size="small" href="/">Click here to play!</Button>
    //   </>,
    // },
  ]
  return (
    <>
      <Helmet>
        <title>Mike Kosiorowski | Home</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Catalogue"
          subHeading="Here are some things I worked on in free time. It's not much but it's honest work!"
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
            <Grid item xs={12} sm={6} md={4} key={key}>
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