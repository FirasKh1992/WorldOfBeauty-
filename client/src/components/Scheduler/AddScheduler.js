import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
//redux
import { connect } from 'react-redux';
import {
  addAppointments,
  removeBookedAppointmentByTherapist,
} from '../../actions/profile';
import PropTypes from 'prop-types';

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
  MuiStepIconRoot: {
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

const AddScheduler = ({
  addAppointments,
  removeBookedAppointmentByTherapist,
  profile: { profile },
  history,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [days, setDays] = useState(() => [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
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

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleFinish = event => {
    event.preventDefault();
    createAppointmentsList();

    days.forEach(day => {
      for (let i = 0; i < appointmentList.length - 1; i++) {
        appointments.push({
          startTime: appointmentList[i],
          endTime: appointmentList[i + 1],
          day: day,
        });
      }
    });
    if (profile!==null) {
      const oldAppointments = profile.appointments.filter(
        appointment => appointment.status === true
      );
      for (let index = 0; index < oldAppointments.length; index++) {
        removeBookedAppointmentByTherapist(
          oldAppointments[index].appointmentId,
          oldAppointments[index].client
        );
      }
    }
  
    setAppointments(appointments);
    addAppointments(appointments, history);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const createAppointmentsList = () => {
    setAppointments([]);
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

    for (let i = 0; i < appointmentNum + 1; i++) {
      if (minutes >= 60) {
        hours += 1;
        minutes = minutes % 60;
        hoursString = hours < 10 ? `0${hours}` : hours;
        minutesString = minutes === 0 ? '00' : minutes;
        appointmentList.push(`${hoursString}:${minutesString}`);
      } else {
        hoursString = hours < 10 ? `0${hours}` : hours;
        minutesString = minutes === 0 ? '00' : minutes;
        appointmentList.push(`${hoursString}:${minutesString}`);
      }
      startingTime = startingTime + duration / 60;
      minutes = minutes + duration;
    }
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
};
AddScheduler.propTypes = {
  addAppointments: PropTypes.func.isRequired,
  removeBookedAppointmentByTherapist: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  addAppointments,
  removeBookedAppointmentByTherapist,
})(withRouter(AddScheduler));
