/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '../layouts/Alert';
import formatTimestamp from '../components/Item';

function Reservations() {
  const { cars } = useSelector((state) => state.cars);
  const location = useLocation();
  const authHeader = useAuthHeader();
  const message = location.state?.message || null; // State variable for reservations
  const [alert, setAlert] = useState('');
  const token = authHeader();

  // Clear registration message
  useEffect(() => {
    if (message) {
      setAlert(decodeURIComponent(message));
      setTimeout(() => {
        setAlert('');
      }, 3000);
    }
  }, [message]);

  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/reservations';
    const headers = {
      Authorization: token,
    };

    fetch(apiUrl, {
      method: 'GET',
      headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch reservation data');
      })
      .then((data) => {
        setReservationData(data);
      })
      .catch((error) => {
        setAlert('Error:', error);
      });
  }, [token]);

  const handleDelete = (reservationId) => {
    const apiUrl = `http://localhost:5000/reservations/${reservationId}`;

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update the reservation list after successful deletion
          setReservationData((prevData) => ({
            ...prevData,
            data: prevData.data.filter((reservation) => reservation.id !== reservationId),
          }));
          setAlert('Reservation deleted successfully');
        } else {
          setAlert('Failed to delete reservation');
          throw new Error('Failed to delete reservation');
        }
      })
      .catch((error) => {
        setAlert('Error:', error);
      });
  };

  // Clear the alert after 3 seconds
  setTimeout(() => {
    setAlert('');
  }, 3000);

  
}

export default Reservations;
