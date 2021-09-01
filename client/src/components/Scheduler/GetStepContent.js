import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import React, { useState, useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
export default function GetStepContent({
  step,
  EndTime,
  startTime,
  duration,
  handleDurationChange,
  handleStartTimeChange,
  handleEndTimeChange,
  handleDays,
  days
}) {
  switch (step) {
    case 0:
      return (
        <div>
          <ToggleButtonGroup
            value={days}
            onChange={handleDays}
            aria-label='text formatting'
          >
            <ToggleButton value='Sunday' aria-label='bold'>
              {'Sunday'}
            </ToggleButton>
            <ToggleButton value='Monday' aria-label='italic'>
              {'Monday'}
            </ToggleButton>
            <ToggleButton value='Tuesday' aria-label='underlined'>
              {'Tuesday'}
            </ToggleButton>

            <ToggleButton value='Wednesday' aria-label='underlined'>
              {'Wednesday'}
            </ToggleButton>
            <ToggleButton value='Thursday' aria-label='underlined'>
              {'Thursday'}
            </ToggleButton>
            <ToggleButton value='Friday' aria-label='underlined'>
              {'Friday'}
            </ToggleButton>
            <ToggleButton value='Saturday' aria-label='underlined'>
              {'Saturday'}
            </ToggleButton>
          </ToggleButtonGroup>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent='space-around'>
              <KeyboardTimePicker
                margin='normal'
                id='time-picker'
                label='Time picker'
                value={startTime}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />

              <KeyboardTimePicker
                margin='normal'
                id='time-picker'
                label='Time picker'
                value={EndTime}
                onChange={handleEndTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Duration</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={duration}
              onChange={handleDurationChange}
            >
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={45}>45</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </FormControl>
        </div>
      );

    default:
      return 'Unknown step';
  }
}
