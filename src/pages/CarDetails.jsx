/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useIsAuthenticated } from 'react-auth-kit';
import { fetchSingleCar, deleteCar } from '../redux/cars/carsSlice';
import formatTimestamp from '../components/Item';

function CarDetails() {
  const carId = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();
  const { selectedCar, isLoading, error } = useSelector((state) => state.cars);

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
    navigate('/cars', { state: { message: 'Car deleted successfully.' } });
  };

  useEffect(() => {
    dispatch(fetchSingleCar(carId.id));
  }, [dispatch, carId.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="h-screen loading loading-bars loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <>
      <section className="flex justify-center items-center h-full p-5">
        {selectedCar && (
          <div className="grid grid-cols-1 space-y-10 space-x-0 w-full md:grid-cols-2 mdspace-y-0 md:space-x-5">
            <div className="grid flex-grow card place-items-center">
              <img src={selectedCar.picture} alt={selectedCar.model} className="w-full" />
            </div>
            <div className="grid flex-grow card place-items-center space-y-5">
              <h1 className="text-4xl text-center font-bold">
                <span>Model:</span>
                <br />
                {selectedCar.model}
              </h1>
              <p className="text-xl font-semibold">
                <span>City: </span>
                {selectedCar.city}
              </p>
              <p className="text-xl font-semibold">
                <span>Price-Per-Day: $</span>
                {selectedCar.price_per_day}
              </p>
              <p className="text-xl font-semibold">
                <span>Year: </span>
                {selectedCar.year}
              </p>
              <p className="text-xl font-semibold">
                <span>Date Added: </span>
                {formatTimestamp(selectedCar.created_at)}
              </p>
              {isAuthenticated() && (
              <>
                <Link
                  to={`/add_reservation?paramId=${selectedCar.id}&paramModel=${selectedCar.model}`}
                >
                  Add Reservation
                </Link>
                <label htmlFor={selectedCar.id} className="btn bg-red-500 text-white">Delete</label>
                <input type="checkbox" id={selectedCar.id} className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box">
                    <p className="py-4">Are you sure you want to delete </p>
                    <p>{selectedCar.model}</p>
                    <div className="modal-action">
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedCar.id)}
                        className="btn bg-red-500 text-white"
                      >
                        Delete
                      </button>
                      <label htmlFor={selectedCar.id} className="btn">Close!</label>
                    </div>
                  </div>
                </div>

              </>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default CarDetails;
