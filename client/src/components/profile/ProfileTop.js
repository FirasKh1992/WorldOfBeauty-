import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const ProfileTop = ({
  profile: {
    status,
    business,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {business && <span>at {business}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faGlobe} size='2x' />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon
              className='social-icons'
              icon={faTwitter}
              size='2x'
            />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon
              className='social-icons'
              icon={faFacebook}
              size='2x'
            />
          </a>
        )}
        {social && social.youtube && (
          <a href={ social.youtube} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon
              className='social-icons'
              icon={faYoutube}
              size='2x'
            />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon
              className='social-icons'
              icon={faInstagram}
              size='2x'
            />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
