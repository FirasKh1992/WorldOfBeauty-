import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Cosmetician Connector</h1>
          <p className='lead'>
            Create a cosmetician profile and timetable, share your feedback and
            get help from other cosmetician
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
