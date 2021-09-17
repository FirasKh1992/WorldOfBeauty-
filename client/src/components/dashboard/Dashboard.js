import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DashboardActions } from './DashboardActions';
import BookedAppointment from '../Scheduler/BookedAppointment'
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentUserProfile,
  auth:{user},
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]); 
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUser} /> Welcome {user !== null && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <BookedAppointment bookedAppointments={profile.bookedAppointments}/>
          <div className='my-2'>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <FontAwesomeIcon icon={faUser} /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentUserProfile,
  deleteAccount,
})(Dashboard);
