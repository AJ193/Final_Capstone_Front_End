/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar } from '../redux/cars/carsSlice';
import Alert from '../layouts/Alert';

function Cars() {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState('');

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
    setAlert('Car deleted successfully');
  };

  setTimeout(() => {
    setAlert('');
  }, 3000);

  return (
    <>
      <section className="h-full px-5">
        <div className="">
          {alert && <Alert msg={alert} />}

          {cars.map((car) => (
            <section key={car.id} className="text-gray-600 pt-4">
              <div className="flex bg-gray-200 bg-opacity-50 p-2 rounded-lg shadow-lg items-center justify-evenly text-center">
                <img src={car.picture} alt={car.model} className="w-16 h-16 rounded-full mb-2" />
                <p className="sm:text-xl text-sm font-semibold mb-2 mx-3">{car.model}</p>
                <div className="flex items-center sm:space-x-4">
                  <label htmlFor={car.id} className="btn bg-red-500 text-white">Delete</label>
                  <input type="checkbox" id={car.id} className="modal-toggle" />
                  <div className="modal">
                    <div className="modal-box">
                      <p className="py-4">Are you sure you want to delete </p>
                      <p>{car.model}</p>
                      <div className="modal-action">
                        <button
                          type="button"
                          onClick={() => handleDelete(car.id)}
                          className="btn bg-red-500 text-white"
                        >
                          Delete
                        </button>
                        <label htmlFor={car.id} className="btn">Close!</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

export default Cars;
