/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import axios from 'axios';
import Alert from '../layouts/Alert';

function AddReservations() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { cars } = useSelector((store) => store.cars);
  const token = authHeader();
  const params = new URLSearchParams(window.location.search);
  const paramId = params.get('paramId'); // 'value1'
  const paramModel = params.get('paramModel'); // 'value2'

  // State variables for form fields and validation errors
  const [formData, setFormData] = useState({
    carBrand: '',
    city: '',
    rentalDate: '',
    returnDate: '',
  });
  const [alert, setAlert] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Set the formData once when the component mounts
    if (paramId && paramModel) {
      setFormData({
        ...formData,
        carBrand: paramId,
      });
    }
  }, [paramId, paramModel]);

  // Validation functions
  const validateForm = () => {
    const errors = {};

    if (!formData.carBrand) {
      errors.carBrand = 'Car brand is required';
    }

    if (!formData.city) {
      errors.city = 'City is required';
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm() && !submitting) {
      setSubmitting(true);

      const reservation = {
        car_id: formData.carBrand,
        city: formData.city,
        start_date: formData.rentalDate,
        end_date: formData.returnDate,
      };

      try {
        const response = await axios.post('http://localhost:5000/reservations', reservation, {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 201) {
          setFormData({
            carBrand: '',
            city: '',
            rentalDate: '',
            returnDate: '',
          });
          navigate('/reservations', { state: { message: 'Reservation added successfully.' } });
        } else {
          setAlert('Failed to create a reservation');
        }
      } catch (error) {
        setAlert('Failed to create a reservation:', error);
      } finally {
        setSubmitting(false);
        setAlert('Error submitting form');
      }
    }
  };

  return (
    <>
      <section className="h-full">
        <div className="p-5 max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold">RESERVE A CAR TEST-RIDE</h2>
          <p className="my-2 text- md:text-center">
            There are 34 different versions of the Vespa. Today five series are in production: the classic manual
            transmission PX and the modern CVT transmission S: LX. GT, and GTS: We have showrooms all over the globe
            which some include test-riding facilities. If you wish to find out if a test-ride is available in your area,
            please use the selector below. London Book Now
          </p>
          {alert && <Alert msg={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-gray-500">
              <div className="sm:col-span-3">
                <label
                  htmlFor="carBrand"
                  className="block text-sm font-medium leading-6"
                >
                  Car brand
                </label>
                <div className="mt-2">
                  {paramId && paramModel ? (
                    <select
                      name="carBrand"
                      value={formData.carBrand}
                      onChange={handleFieldChange}
                      className={`select bg-transparent border border-gray-500 w-full ${
                        formErrors.carBrand ? 'border-red-500 text-red-500' : ''
                      }`}
                    >
                      <option
                        value={paramId}
                      >
                        {paramModel}
                      </option>
                    </select>
                  ) : (
                    <select
                      name="carBrand"
                      value={formData.carBrand}
                      onChange={handleFieldChange}
                      className={`select bg-transparent border border-gray-500 w-full ${
                        formErrors.carBrand ? 'border-red-500 text-red-500' : ''
                      }`}
                    >
                      <option
                        value=""
                        disabled
                      >
                        --Pick a Car brand --
                      </option>
                      {cars.map((car) => (
                        <option
                          key={car.id}
                          value={car.id}
                        >
                          {car.model}
                        </option>
                      ))}
                    </select>
                  )}
                  {formErrors.carBrand && <p className="text-red-500">{formErrors.carBrand}</p>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="rentalDate"
                  className="block text-sm font-medium leading-6"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFieldChange}
                    placeholder="City"
                    className={`input placeholder:text-gray-500 bg-transparent border border-gray-500 w-full ${
                      formErrors.city ? 'border-red-500 text-red-500' : ''
                    }`}
                  />
                  {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="rentalDate"
                  className="block text-sm font-medium leading-6"
                >
                  Rental date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="rentalDate"
                    value={formData.rentalDate}
                    onChange={handleFieldChange}
                    placeholder="Rental date"
                    className={`input placeholder:text-gray-500 bg-transparent border border-gray-500 w-full ${
                      formErrors.rentalDate ? 'border-red-500 text-red-500' : ''
                    }`}
                  />
                  {formErrors.rentalDate && <p className="text-red-500">{formErrors.rentalDate}</p>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="returnDate"
                  className="block text-sm font-medium leading-6"
                >
                  Return date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleFieldChange}
                    placeholder="Return date"
                    className={`input placeholder:text-gray-500 bg-transparent border border-gray-500 w-full ${
                      formErrors.returnDate ? 'border-red-500 text-red-500' : ''
                    }`}
                  />
                  {formErrors.returnDate && <p className="text-red-500">{formErrors.returnDate}</p>}
                </div>
              </div>
              <div className="sm:col-span-3 md:my-8">
                <button
                  type="submit"
                  className="btn w-full bg-newGreen text-white shadow-sm hover:bg-lime-800"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
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
