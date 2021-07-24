import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';




const Login = ({login,isAuthenticated}) => {
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
     login(email,password);
  };

//redirects if logged in
if(isAuthenticated){
  return <Redirect to='/dashboard' />
}

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUser} /> Sign into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't  have an account?{' '}
        <Link to='/register'>
          {' '}
          <b>Sign Up</b>
        </Link>
      </p>
    </Fragment>
  );
};



const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})
Login.propTypes ={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}
export default connect(mapStateToProps,{login})(Login);
