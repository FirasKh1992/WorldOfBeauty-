import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentUserProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentUserProfile,
}) => {
  const [formData, setFormData] = useState({
    business: '',
    website: '',
    location: '',
    therapies: '',
    status: '',
    bio: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    business,
    website,
    location,
    therapies,
    status,
    bio,
    twitter,
    facebook,
    instagram,
    youtube,
  } = formData;
  useEffect(() => {
    if (!profile) getCurrentUserProfile();
    if (!loading && profile) {
      setFormData({
        business: loading || !profile.business ? '' : profile.business,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        therapies: loading || !profile.therapies ? '' : profile.therapies,
        status: loading || !profile.status ? '' : profile.status,
        bio: loading || !profile.bio ? '' : profile.bio,

        twitter: loading || !profile.social ? '' : profile.twitter,
        facebook: loading || !profile.social ? '' : profile.facebook,
        instagram: loading || !profile.social ? '' : profile.instagram,
        youtube: loading || !profile.social ? '' : profile.youtube,
      });
    }
  }, [loading, getCurrentUserProfile]); // eslint-disable-line react-hooks/exhaustive-deps
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
     <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUser} /> Let's get some information to make
        your profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' status={status} onChange={e => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='therapist'>Therapist</option>
            <option value='cosmetician'>Cosmetician</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Saloon Name'
            name='business'
            value={business}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own Saloon or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a Saloon website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* What treatments are available for add?'
            name='therapies'
            value={therapies}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Dermabrasion, Chemical
            Peel,Laser Hair Removal,Botox Injections)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs ? (
          <Fragment>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                className='social-icons'
                icon={faTwitter}
                size='2x'
                color='#00acee'
              />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                className='social-icons'
                icon={faFacebook}
                size='2x'
                color='#3b5998'
              />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                className='social-icons'
                icon={faInstagram}
                size='2x'
                color='#fb3958'
              />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                className='social-icons'
                icon={faYoutube}
                size='2x'
                color='#c4302b'
              />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
};
const mapStateToProps = state => ({
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentUserProfile,
})(withRouter(EditProfile));
