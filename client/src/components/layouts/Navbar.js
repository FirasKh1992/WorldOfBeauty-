import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
        <FontAwesomeIcon icon={faHeartbeat} />{' '}
         World Of Beauty
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Saloons</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
}
