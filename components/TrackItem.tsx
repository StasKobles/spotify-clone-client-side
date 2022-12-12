import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { Card, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { useActions } from "../hooks/useAction";
import styles from "../styles/TrackItem.module.sass";
import { ITrack } from "../types/track";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}
const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const play = (e: any) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };
  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Image
        width={70}
        height={70}
        src={"http://193.201.115.48:4200/" + track.picture}
        alt={"Track logo"}
      />
      <Grid className={styles.descriptionGrid} container direction="column">
        <div>{track.name}</div>
        <div className={styles.artistName}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton
        onClick={(e) => e.stopPropagation()}
        className={styles.deleteButton}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
