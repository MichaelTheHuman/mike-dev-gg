import { Button, Card, CardContent, CardHeader, Container, Divider, Grid, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import React from "react";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageTitle from "../../components/PageTitle";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mike Kosiorowski | Home</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Testing"
          subHeading="Blah blah blah."
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
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Images" />
              <Divider />
              <CardContent>
                Something here
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Letters" />
              <Divider />
              <CardContent>
                BLahblah
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Sizes" />
              <Divider />
              <CardContent>
                Lalalala
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Icons" />
              <Divider />
              <CardContent>
                Blablabla
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

    </>
  )
}