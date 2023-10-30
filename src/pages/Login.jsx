/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import Alert from '../layouts/Alert';

function Login() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const location = useLocation();
  const message = location.state?.message || null;
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    if (isAuthenticated()) {
      // Perform the navigation
      navigate('/about');
    }
  }, []);

  // Clear registration message
  useEffect(() => {
    if (message) {
      setAlert(decodeURIComponent(message));
      setTimeout(() => {
        setAlert('');
      }, 5000);
    }
  }, [message]);

  // Login form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!formData.email || !formData.password) {
      // Handle the case when a field is empty, e.g., display an alert or error message
      setAlert('Please fill in both email and password fields.');
      // Clear the alert after 3 seconds
      setTimeout(() => {
        setAlert('');
      }, 3000);
    } else {
      // Continue with form submission or other actions
      try {
        const response = await axios.post('http://localhost:5000/login', {
          user: {
            email: formData.email,
            password: formData.password,
          },
        });

        const uid = response.data.status.data.user.id;
        const uname = response.data.status.data.user.name;
        const tokenn = response.data.status.data.jwt;

        if (signIn({
          token: tokenn,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { email: formData.email, name: uname, id: uid },
        })) {
          // Redirect or do something upon successful sign-in
          navigate('/cars', { state: { message: 'Login successful.' } });
        } else {
          setAlert('Wrong login details');
        }
      } catch (error) {
        setAlert('User not avaliable');
      }
    }
  };
  setTimeout(() => {
    setAlert('');
  }, 3000);

  return (
    <section className="mx-auto h-full px-5">
      <div className="my-10 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 mx-auto md:my-20">
        {alert && <Alert msg={alert} />}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6 space-y-3">
            <label htmlFor="email" className="">
              Email
            </label>
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
            <label htmlFor="password" className="">
              Password
            </label>
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
