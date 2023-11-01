/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      {reservationData ? (
        <section className="bg-newGreen relative inset-0 h-full text-white flex justify-center items-center">
          <div className="p-5 max-w-5xl">
            <h2 className="text-center text-3xl font-bold">Reservations</h2>
            {alert && <Alert msg={alert} />}
            <div className="overflow-x-auto">
              <table className="table my-10 md:my-20">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-white text-2xl">
                      Car Model
                    </th>
                    <th className="text-white text-2xl">Image</th>
                    <th className="text-white text-2xl">Start Date</th>
                    <th className="text-white text-2xl">End date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {reservationData.data.map((reservation) => (
                    <tr key={reservation.id}>
                      <th>
                        {cars.find((car) => car.id === reservation.car_id)?.model}
                      </th>
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
                        <button type="button" className="btn btn-ghost btn-xs">Delete</button>
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
