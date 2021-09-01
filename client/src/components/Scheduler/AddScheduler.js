import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import 'date-fns';
import GetStepContent from './GetStepContent';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiStepIcon-root, .MuiStepIcon-active': {
      color: '#3C0000',
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  MuiStepIcoActive: {
    color: '#F5D0C5',
  },
  MuiStepIconrRoot: {
    color: '#F5D0C5',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function getSteps() {
  return ['Choose Working hours'];
}

export default function AddScheduler() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [days, setDays] = useState(() => [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Tuesday',
  ]);
  const [duration, setDuration] = useState(15);
  const [startTime, setStartTime] = useState(new Date('2014-08-18T08:00:00'));
  const [EndTime, setEndTime] = useState(new Date('2014-08-18T21:00:00'));
  const [appointments, setAppointments] = useState([]);

  let appointmentList = [];
  const handleStartTimeChange = time => {
    setStartTime(time);
  };
  const handleEndTimeChange = time => {
    setEndTime(time);
  };

  const handleDays = (event, newDays) => {
    setDays(newDays);
  };
  const handleDurationChange = (event, duration) => {
    setDuration(duration.props.value);
  };

  const steps = getSteps();
  const schedule = new Set();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleFinish = () => {
    createAppointmentsList();
    let newAppointment;
    let initialValue = appointmentList[0];
    
      days.forEach(day => {
        for(let i=0;i<appointmentList.length-1;i++){
          addAppointment({startTime:appointmentList[i],endTime:appointmentList[i+1],day:day})
        }
      });
      console.log(appointments);
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const addAppointment = appointment =>
    setAppointments(state => [...state, appointment]);
  const createAppointmentsList = () => {
    let start = new Date(startTime);
    let end = new Date(EndTime);
    let startingTime = start.getHours() + start.getMinutes() / 60;
    const newDuration = duration / 60;
    let endingTime = end.getHours() + end.getMinutes() / 60;
    let appointmentNum = (endingTime - startingTime) / newDuration;
    let hours = start.getHours();
    let minutes = start.getMinutes();
    let hoursString;
    let minutesString;

    for (let i = 0; i < appointmentNum; i++) {
      if (minutes >= 60) {
        hours += 1;
        minutes = minutes % 60;
        hoursString = hours < 10 ? `0${hours}` : hours;
        minutesString = minutes === 0 ? '00' : minutes;
        // console.log(`${hoursString}:${minutesString}`)
        appointmentList.push(`${hoursString}:${minutesString}`);
      } else {
        hoursString = hours < 10 ? `0${hours}` : hours;
        minutesString = minutes === 0 ? '00' : minutes;
        // console.log(`${hoursString}:${minutesString}`)
        appointmentList.push(`${hoursString}:${minutesString}`);
      }
      startingTime = startingTime + duration / 60;
      minutes = minutes + duration;
    }
    console.log(`the appointments array ${appointmentList}`);
  };

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation='vertical'
        style={{ color: '#774936' }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>
                <GetStepContent
                  step={index}
                  handleDurationChange={handleDurationChange}
                  handleDays={handleDays}
                  handleEndTimeChange={handleEndTimeChange}
                  handleStartTimeChange={handleStartTimeChange}
                  duration={duration}
                  startTime={startTime}
                  EndTime={EndTime}
                  days={days}
                />
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#3C0000', color: '#F5D0C5' }}
                      onClick={handleFinish}
                      className={classes.button}
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      style={{ backgroundColor: '#3C0000', color: '#F5D0C5' }}
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          style={{
            backgroundColor: '#F5D0C5',
            color: '#774936',
            borderRadius: '12px',
          }}
          square
          elevation={0}
          className={classes.resetContainer}
        >
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
