import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';
export const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <FontAwesomeIcon className=' text-primary' icon={faUserCircle} />{' '}
        Edit Profile
      </Link>
      <Link to='/add-scheduler' className='btn btn-light'>
        <FontAwesomeIcon className=' text-primary' icon={faBlackTie} />{' '}
         Add scheduler
      </Link>
    </div>
  );
};
