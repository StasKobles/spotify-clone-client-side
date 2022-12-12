import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";



import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";


const TrackPage = ({ serverTrack }: any) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://193.201.115.48:4200/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={"Music platform - " + track.name + " - " + track.artist}
      keywords={`S{track.name}, ${track.artist}, Music, Song`}
      description={`${track.name} track by ${track.artist}`}
    >
      <Button
        variant="outlined"
        size="large"
        onClick={() => router.push("/tracks")}
      >
        Track List
      </Button>
      <Grid container marginTop={3}>
        <Image
          src={"http://193.201.115.48:4200/" + track.picture}
          width={200}
          height={200}
          alt={"track logo"}
        />
        <div style={{ marginLeft: "20px" }}>
          <h1>Track name - {track.name}</h1>
          <h1> Artist - {track.artist}</h1>
          <h1>Listened {track.listens} times</h1>
        </div>
      </Grid>
      <h1>Song text</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField {...username} label="Your name" fullWidth />
        <TextField {...text} label="Comment" fullWidth multiline rows={4} />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div key={comment._id}>
            <div> Author - {comment.username}</div>
            <div>Comment - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(
    "http://193.201.115.48:4200/tracks/" + params?.id
  );
  return {
    props: {
      serverTrack: response.data,
    },
  };
};