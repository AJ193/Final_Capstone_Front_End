/* eslint-disable jsx-a11y/label-has-associated-control */
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
    const apiUrl = 'https://car-rental-iwkn.onrender.com/reservations';
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
    const apiUrl = `https://car-rental-iwkn.onrender.com/reservations/${reservationId}`;

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

  return (
    <>
      {reservationData ? (
        <section className="h-full flex justify-center items-center">
          <div className="p-5 mx-auto my-10">
            <h2 className="text-center text-3xl font-bold">Reservations</h2>
            {alert && <Alert msg={alert} />}
            <div className="">
              <table className="table my-5 overflow-x-auto">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-2xl">Car Model</th>
                    <th className="text-2xl">City</th>
                    <th className="text-2xl">Image</th>
                    <th className="text-2xl">Start Date</th>
                    <th className="text-2xl">End date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {reservationData.data.map((reservation) => (
                    <tr key={reservation.id}>
                      <th>{cars.find((car) => car.id === reservation.car_id)?.model}</th>
                      <th>{reservation.city}</th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-20 h-12">
                              <img
                                className="w-full object-contain"
                                src={cars.find((car) => car.id === reservation.car_id)?.picture}
                                alt={cars.find((car) => car.id === reservation.car_id)?.model}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatTimestamp(reservation.start_date)}</td>
                      <td>{formatTimestamp(reservation.end_date)}</td>
                      <th>
                        <Link
                          className="btn btn-ghost btn-xs"
                          to={`/car_details/${reservation.car_id}`}
                        >
                          Details
                        </Link>
                        <label htmlFor={reservation.car_id} className="btn btn-ghost btn-xs">Delete</label>
                        <input type="checkbox" id={reservation.car_id} className="modal-toggle" />
                        <div className="modal">
                          <div className="modal-box">
                            <p className="py-4">Are you sure you want to delete </p>
                            <p>{reservation.city}</p>
                            <div className="modal-action">
                              <button
                                type="button"
                                className="btn bg-red-500 text-white"
                                onClick={() => handleDelete(reservation.id)}
                              >
                                Delete
                              </button>
                              <label htmlFor={reservation.car_id} className="btn">Close!</label>
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center">
          <span className="h-screen loading loading-bars loading-lg" />
        </div>
      )}
    </>
  );
}

export default Reservations;
