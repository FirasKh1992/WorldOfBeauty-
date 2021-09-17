import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAppointment } from '../../actions/profile'

const BookedAppointment = ({ bookedAppointments,deleteAppointment }) => {
 
  const Booked = bookedAppointments.map(bookedAppointment => (
    <tr key={bookedAppointment._id}>
      <td>{bookedAppointment.saloonName}</td>
      <td className='hide-sm'>{bookedAppointment.day}</td>
      <td>
       {bookedAppointment.from} -{' '}
        {bookedAppointment.to === null ? (
          'Now'
        ) : (
         bookedAppointment.to
        )}
      </td>
      <td>{bookedAppointment.therapist}</td>
      <td>
        <button onClick={()=>deleteAppointment(bookedAppointment._id)} className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  return (
    <div className='profile-exp bg-white p-1'  >
    <h2 className='text-primary'>Booked Appointment</h2>
    {bookedAppointments.length>0 ?(
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Saloon</th>
            <th>day</th>
            <th >Time</th>
            <th>therapist</th>
            
          </tr>
        </thead>
        <tbody>{Booked}</tbody>
      </table>
    </div>
    ):(<Fragment>there is no Booked Appointments Yet</Fragment>)
    }
    </div>
)
};

BookedAppointment.propTypes = {
  bookedAppointments: PropTypes.array.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
};

export default connect(null,{deleteAppointment})(BookedAppointment);
