import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import styles from "../styles/StepWrapper.module.sass";
interface StepWrapperProps {
  activeStep: number;
  children: any;
}

const steps = ["Track information", "Track image", "Upload audio"];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" className={styles.container}>
        <Card className={styles.card}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
