import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'; 
const ProfileAbout = ({
  profile: {
    bio,
    therapies,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}

      <h2 className='text-primary'>Treatment Set</h2>
      <div className='skills'>
        {therapies.map((therapy, index) => (
          <div key={index} className='p-1'>
            <FontAwesomeIcon icon={faCheck} />
            {therapy}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.func.isRequired,
};

export default connect(null)(ProfileAbout);;
