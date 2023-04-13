import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const router = useRouter();
  const next = async () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      await axios.post("http://164.92.165.132:4200/" + "tracks", formData);
      await router.push("/tracks");
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" padding={"20px"}>
            <TextField
              {...name}
              className="textNameTrack"
              label={"Track name"}
            ></TextField>
            <TextField
              {...artist}
              className="textNameTrack"
              label={"Artist name"}
            ></TextField>
            <TextField
              {...text}
              className="textNameTrack"
              label={"Track text"}
              multiline
              rows={3}
            ></TextField>
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept={"image/*"}>
            <Button>Upload image</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept={"audio/*"}>
            <Button>Upload audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Back
        </Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
