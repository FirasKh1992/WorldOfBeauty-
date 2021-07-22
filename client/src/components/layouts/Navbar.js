import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='index.html'>
        <FontAwesomeIcon icon={faHeartbeat} />{' '}
         World Of Beauty
        </a>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'>Saloons</a>
        </li>
        <li>
          <a href='register.html'>Register</a>
        </li>
        <li>
          <a href='login.html'>Login</a>
        </li>
      </ul>
    </nav>
  );
}
