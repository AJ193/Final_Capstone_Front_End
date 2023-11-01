/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
// import axios from 'axios';
import { fetchCars } from '../redux/cars/carsSlice';
// import { createReservation } from '../redux/reservations/reservationSlice';

function AddReservations() {
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const { cars } = useSelector((store) => store.cars);
  const token = authHeader();
  const uid = auth().id;

  // State variables for form fields and validation errors
  const [formData, setFormData] = useState({
    carBrand: '',
    rentalDate: '',
    returnDate: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // Validation functions
  const validateForm = () => {
    const errors = {};

    if (!formData.carBrand) {
      errors.carBrand = 'Car brand is required';
    }

    if (!formData.rentalDate) {
      errors.rentalDate = 'Rental date is required';
    }

    if (!formData.returnDate) {
      errors.returnDate = 'Return date is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const reservationData = {
    car_id: formData.carBrand, // You may need to map this to the actual car ID
    user_id: uid, // Replace with the actual user ID
    start_date: formData.rentalDate,
    end_date: formData.returnDate,
  };

  const baseUrl = 'http://localhost:5000/reservations';

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(baseUrl, reservationData, {
          headers: {
            Authorization: token,
          },
        });

        console.log(response);

        if (response.status === 201) {
          // Successfully created a reservation (status code 201)
          // You can handle the response accordingly
          console.log('Reservation created successfully');
          // You may also want to reset the form or navigate to a success page here
        } else {
          // Handle other success status codes or errors as needed
          console.error('Failed to create a reservation');
          // You can throw a custom error here or set an error state to display an error message
        }
      } catch (error) {
        // Handle Axios request errors
        console.error('Failed to create a reservation:', error);
        // You can throw a custom error here or set an error state to display an error message
      }
    }
  };

  return (
    <>
      <section className="bg-newGreen relative inset-0 h-full text-white flex justify-center items-center">
        <div className="p-5 max-w-5xl">
          <h2 className="text-center text-3xl font-bold">RESERVE A CAR TEST-RIDE</h2>
          <p className="my-2 text- md:text-center">
            There are 34 different versions of the Vespa. Today five series are in
            production: the classic manual transmission PX and the modern CVT
            transmission S: LX. GT, and GTS: We have showrooms all over the globe
            which some include test-riding facilities. if you wish to find out if
            a test-ride is available in your area, please use the selector below.
            London Book Now
          </p>
          <h1>{uid}</h1>
          <h1>{token}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-gray-700">
              <div className="sm:col-span-3">
                <label htmlFor="carBrand" className="block text-sm font-medium leading-6">
                  Car brand
                </label>
                <div className="mt-2">
                  <select
                    name="carBrand"
                    value={formData.carBrand}
                    onChange={handleFieldChange}
                    className={`select bg-transparent border border-gray-700 w-full ${
                      formErrors.carBrand ? 'border-red-500 text-red-500' : ''
                    }`}
                  >
                    <option value="" disabled>
                      --Pick a Car brand --
                    </option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.model}
                      </option>
                    ))}
                  </select>
                  {formErrors.carBrand && <p className="text-red-500">{formErrors.carBrand}</p>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="rentalDate" className="block text-sm font-medium leading-6">
                  Rental date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="rentalDate"
                    value={formData.rentalDate}
                    onChange={handleFieldChange}
                    placeholder="Rental date"
                    className={`input placeholder:text-gray-700 bg-transparent border border-gray-700 w-full ${
                      formErrors.rentalDate ? 'border-red-500 text-red-500' : ''
                    }`}
                  />
                  {formErrors.rentalDate && <p className="text-red-500">{formErrors.rentalDate}</p>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="returnDate" className="block text-sm font-medium leading-6">
                  Return date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleFieldChange}
                    placeholder="Return date"
                    className={`input placeholder:text-gray-700 bg-transparent border border-gray-700 w-full ${
                      formErrors.returnDate ? 'border-red-500 text-red-500' : ''
                    }`}
                  />
                  {formErrors.returnDate && <p className="text-red-500">{formErrors.returnDate}</p>}
                </div>
              </div>
              <div className="sm:col-span-3 md:my-8">
                <button
                  type="submit"
                  className="btn w-full bg-white text-newGreen shadow-sm hover:bg-lime-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddReservations;
