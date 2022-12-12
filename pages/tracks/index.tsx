import { Button, Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/action-creators/track";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState<null | ReturnType<typeof setTimeout>>(
    null
  );
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchTracks(e.target.value));
      }, 500)
    );
  };
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout
      title="Track list - music platform"
      description="Main page of pet project music platform"
    >
      <Grid container justifyContent={"center"}>
        <Card className={"tracksCard"}>
          <Box p={3}>
            <Grid container justifyContent={"space-between"}>
              <h1>Track List</h1>
              <Button onClick={() => router.push("tracks/create")}>
                Upload
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());
  }
);
