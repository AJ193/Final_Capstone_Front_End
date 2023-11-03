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
      {selectedCar && (
        <div className="flex flex-col-reverse gap-8 w-full md:flex-row justify-center h-full p-5">
          <div className="grid flex-grow place-items-center w-2/3 self-center">
            <img src={selectedCar.picture} alt={selectedCar.model} className="w-full" />
          </div>
          <div className="hidden md:block md:border-r-2 md:border-r-gray-500" />
          <div className="grid h-72 flex-grow card place-items-center w-1/3 text-center self-center space-y-10">
            <h1 className="text-4xl font-bold">
              <span>Model: </span>
              {selectedCar.model}
            </h1>
            <p className="text-xl font-semibold">
              <span>City: </span>
              {selectedCar.city}
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
    </>
  );
}

export default CarDetails;
