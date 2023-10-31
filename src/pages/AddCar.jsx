/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewCar } from '../redux/cars/carsSlice';
import Alert from '../layouts/Alert';

function AddCar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [alert, setAlert] = useState('');
  const [formData, setFormData] = useState({
    model: '',
    image: '',
    year: '',
    price_per_day: '',
    city: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { target } = e;
    setFile(target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('image', file);
    payload.append('model', formData.model);
    payload.append('year', formData.year);
    payload.append('city', formData.city);
    payload.append('price_per_day', formData.price_per_day);
    // Validate form data
    const errors = {};
    if (!formData.model) {
      errors.model = 'Model is required';
    }
    if (!file) {
      errors.image = 'Image is required';
    }
    if (!formData.year) {
      errors.year = 'Year is required';
    }
    if (!formData.price_per_day) {
      errors.price_per_day = 'Price is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }

    if (Object.keys(errors).length === 0) {
      // No validation errors, proceed with the dispatch
      dispatch(addNewCar(payload))
        .then(() => {
          // Handle success, e.g., clear the form
          setFormData({
            model: '',
            image: null,
            year: '',
            price_per_day: '',
            city: '',
          });
          setFormErrors({});
          navigate('/cars', { state: { message: 'Car added successfully.' } });
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error);
        });
    } else {
      // Set validation errors
      setFormErrors(errors);
      setAlert(errors);
    }
  };
  setTimeout(() => {
    setAlert('');
  }, 3000);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {alert && <Alert msg={alert} />}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Add new car</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium leading-6"
              >
                Model
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered w-full ${formErrors.model ? 'input-error' : ''}`}
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
                {formErrors.model && <p className="text-red-500">{formErrors.model}</p>}
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  placeholder="Type here"
                  className={`file-input file-input-ghost input-bordered w-full ${
                    formErrors.image ? 'input-error' : ''
                  }`}
                  name="image"
                  onChange={handleImageChange}
                />
                {formErrors.image && <p className="text-red-500">{formErrors.image}</p>}
              </div>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6"
              >
                Year
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className={`input input-bordered w-full ${formErrors.year ? 'input-error' : ''}`}
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
                {formErrors.year && <p className="text-red-500">{formErrors.year}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="Price"
                className="block text-sm font-medium leading-6"
              >
                Price per Day
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Price per day"
                  className={`input input-bordered w-full ${formErrors.price_per_day ? 'input-error' : ''}`}
                  name="price_per_day"
                  value={formData.price_per_day}
                  onChange={handleChange}
                />
                {formErrors.price_per_day && <p className="text-red-500">{formErrors.price_per_day}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="City"
                  className={`input input-bordered w-full ${formErrors.city ? 'input-error' : ''}`}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-newGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCar;
