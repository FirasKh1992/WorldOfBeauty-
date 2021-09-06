import React, { useEffect,useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { updateAppointment } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { Link,withRouter } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const Profile = ({ getProfileById, profile: { profile }, auth, match,updateAppointment,history }) => {
  const [day,setDay]=useState();
  const [appointments,setAppointments]=useState([]);
  const [selectedAppointment,setSelectedAppoinment]=useState([]);
  const [displayAppointments, toggleDisplayAppointments] = useState(false);
  useEffect(() => {
    getProfileById(match.params.id);
  }, [match.params.id, getProfileById]);


  const getAppointmentForDay = (day) =>{
    const appointments= profile.appointments.filter(appointment =>(
      appointment.day.toString()===day.props.value.toString() && appointment.status===false
    ))
    setAppointments(appointments);
  }
  const appointmentsSelected = (event,appointmentId)=>{
    event.preventDefault();
    setSelectedAppoinment(appointmentId.props.value)
    updateAppointment(match.params.id,appointmentId.props.value,history)
  }
  return (
    <Fragment>
      {profile === null  ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-2'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            { !displayAppointments ? (
             <div className='my-2'>
                <button
                  type='button'
                  className='btn btn-dark'
                  onClick={() => toggleDisplayAppointments(!displayAppointments)}
                >
                  Want to Book Appointment?
                </button>
             </div>
        ):(
            <div className='profile-exp bg-white p-3'  >
              <h2 className='text-primary'>Book Appointment</h2>
              {profile.appointments.length > 0 ? (
                <Fragment>
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>Pick A Day</InputLabel>
                    <Select
                       className='day-select'
                      labelId='demo-simple-select-label'
                      value={day}
                      onChange={(event,day)=> {
                        event.preventDefault();
                        setDay(day);
                        getAppointmentForDay(day);
                      }}
                    >
                      <MenuItem value={"Sunday"}>Sunday</MenuItem>
                      <MenuItem value={"Monday"}>Monday</MenuItem>
                      <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                      <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                      <MenuItem value={"Thursday"}>Thursday</MenuItem>
                      <MenuItem value={"Friday"}>Friday</MenuItem>
                      <MenuItem value={"Saturday"}>Saturday</MenuItem>
                      
                    </Select>
                    </FormControl>
                    <FormControl>
                    <InputLabel id='demo-simple-select-label'> Pick Time</InputLabel>
                    <Select
                    className='day-select'
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={selectedAppointment}
                      onChange={appointmentsSelected}
                  
                    >
                    {appointments.map( appointment =>(
                      <MenuItem value={appointment._id}>{`${appointment.startTime} - ${appointment.endTime}`}</MenuItem>
                    ))}
                    </Select>

                  </FormControl>
                </Fragment>
              ) : (
                <h4>there is no schedule yet</h4>
              )}
            </div>
        )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  updateAppointment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById,updateAppointment })(Profile);
