import axios from 'axios';
import { setAlert } from './alert';

import {
  DELETE_ACCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
} from './types';
//GET CURRENT USERS PROFILE
export const getCurrentUserProfile = () => async dispatch => {
    try {
      const res = await axios.get('/api/profile/me');
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


  //get all profiles
export const getProfiles = () => async dispatch => {
    try {
      dispatch({ type: CLEAR_PROFILE });
      const res = await axios.get('/api/profile');
  
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    } catch (err) {
      console.dir(err.response)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
  //get profile by user id
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  //create/edit profile
export const createProfile =
(formData, history, edit = false) =>
async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    //check for validation errors
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg), 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      // for such an action deleting an account,its recommended to add a confirmation window
      try {
        await axios.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: DELETE_ACCOUNT });
        dispatch(
          setAlert('Your account had been permanently deleted ', 'danger')
        );
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    }
  };
  