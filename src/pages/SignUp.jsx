/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../layouts/Alert';

function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setAlert('Please fill in all the fields.');

      // Clear the alert after 3 seconds
      setTimeout(() => {
        setAlert('');
      }, 3000);
    } else if (formData.password !== formData.confirmPassword) {
      setAlert('Passwords do not match.');
      // Clear the alert after 3 seconds
      setTimeout(() => {
        setAlert('');
      }, 3000);
    } else {
      try {
        const response = await axios.post('https://car-rental-iwkn.onrender.com/signup', {
          user: {
            email: formData.email,
            password: formData.password,
            name: formData.fullName,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          // User registration was successful
          setAlert('User registration was successful!');
          // Clear the alert after 3 seconds
          setTimeout(() => {
            setAlert('');
          }, 3000);
          // Clear the form fields
          setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          // Redirect to the login page with a message
          navigate('/login', { state: { message: 'Registration successful. You can now log in.' } });
        } else {
          // User registration failed
          setAlert('User registration failed. Please try again later.');
        }
      } catch (error) {
        // Network error or server error
        setAlert('An error occurred while registering. Please check your internet connection and try again.');
      }
    }
  };

  return (
    <section className="h-full flex justify-center items-center px-5">
      <div className="md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        {alert && <Alert msg={alert} />}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6 space-y-3">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-6 space-y-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-6 space-y-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-6 space-y-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block rounded bg-newGreen px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white"
            >
              Register
            </button>

            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Already have an account?
              <span> </span>
              <Link
                to="/login"
                className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
