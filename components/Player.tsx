import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";

import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import styles from "../styles/Player.module.sass";
import { ITrack } from "../types/track";
import TrackProgress from "./TrackProgress";

let audio: HTMLAudioElement;

const Player = () => {
  const { active, currentTime, duration, pause, volume } = useTypedSelector(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setActiveTrack,
    setDuration,
  } = useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);
  const setAudio = () => {
    if (active) {
      audio.src = "http://193.201.115.48:4200/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => setDuration(Math.ceil(audio.duration));
      audio.ontimeupdate = () => setCurrentTime(Math.ceil(audio.currentTime));
    }
  };
  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };
  if (!active) {
    return null;
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid className={styles.descriptionGrid} container direction="column">
        <div>{active?.name}</div>
        <div className={styles.artistName}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
