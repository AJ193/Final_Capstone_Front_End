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
    if (window.confirm('Are you sure you want to delete this car?')) {
      dispatch(deleteCar(carId));
      setAlert('Car deleted successfully');
    }
  };

  setTimeout(() => {
    setAlert('');
  }, 3000);

  return (
    <>
      <section className="relative inset-0 h-full flex justify-center items-center">
        <div className="my-10 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 mx-auto md:my-20">
          {alert && <Alert msg={alert} />}

          {cars.map((car) => (
            <section key={car.id} className="text-gray-600 body-font pt-4">
              <div className="flex bg-gray-200 bg-opacity-50 p-2 rounded-lg shadow-lg items-center justify-evenly text-center">
                <img src={car.picture} alt={car.model} className="w-16 h-16 rounded-full mb-2" />
                <p className="sm:text-xl text-sm font-semibold mb-2 mx-3">{car.model}</p>
                <div className="flex items-center sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => handleDelete(car.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm p-1 sm:py-2 sm:px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
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
