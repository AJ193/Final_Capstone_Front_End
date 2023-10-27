/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../layouts/Alert';

function Login() {
  const [alert, setAlert] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let accessToken;
  let refreshToken = localStorage.getItem('refresh_token');
  let resourceOwner;

  // const history = useNavigate();
  async function handleAuthResponse(response) {
    const data = await response.json();
    localStorage.setItem('resource_owner', JSON.stringify(data.resource_owner));
    localStorage.setItem('refresh_token', data.refresh_token);
    accessToken = data.token;
    refreshToken = data.refresh_token;
    resourceOwner = data.resource_owner;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // Check if email or password is empty
    if (!formData.email || !formData.password) {
      setAlert('Please fill in both email and password fields.');
      setTimeout(() => {
        setAlert('');
      }, 3000);
      return;
    }

    // Make an API request to the login endpoint
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: formData.email,
          password: formData.password,
        },
      }),
    });

    // Handle the response from the API
    if (response.ok) {
      // Login was successful
      setAlert('Login successful!');
      // Store the token in local storage
      await handleAuthResponse(response);
      // Redirect the user to the home page
      window.location.href = '/';
    } else {
      // Login failed
      setAlert('Login failed. Please try again.');
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        {alert && <Alert msg={alert} />}
        <form onSubmit={handleSubmit}>
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

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block rounded bg-newGreen px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white"
            >
              Login
            </button>

            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Dont have an account?
              <span> </span>
              <Link
                to="/signup"
                className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
