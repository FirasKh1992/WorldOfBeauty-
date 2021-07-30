import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function spinner() {
  return (
    <Fragment>
      <div className='loading'>
        <FontAwesomeIcon icon={faSpinner} size='8x' spin />
      </div>
    </Fragment>
  );
}
