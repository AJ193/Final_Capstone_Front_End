/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
} from 'react-icons/bi';
import { fetchCars } from '../redux/cars/carsSlice';
import Alert from '../layouts/Alert';

function Cars() {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const location = useLocation();
  const message = location.state?.message || null;
  const [alert, setAlert] = useState('');

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // Clear registration message
  useEffect(() => {
    if (message) {
      setAlert(decodeURIComponent(message));
      setTimeout(() => {
        setAlert('');
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <section className=" p-4 w-full mx-auto py-20">
        {alert && <Alert msg={alert} />}
        <h1 className="text-center text-4xl font-extrabold">LATEST MODELS</h1>
        <p className="text-center text-gray-500">Please select a car model</p>
        <Carousel
          className="w-full"
          infinite
          autoPlay
          responsive={responsive}
        >
          {cars.map((car) => (
            <div key={car.id}>
              <Link
                className="px-5 space-y-5"
                to={`/car_details/${car.id}`}
              >
                <figure className="relative bg-gray-200 rounded-full w-48 h-48 mx-auto md:h-72 md:w-72">
                  <img src={car.picture} alt={car.model} className="h-full object-fil object-contain absolute" />
                </figure>
                <div className="w-48 mx-auto md:w-72 space-y-5">
                  <h2 className="text-center">{ car.model }</h2>
                  <div className="reletive flex justify-center items-center space-x-4">
                    <div className="border border-gray-300 p-2 rounded-full"><BiLogoFacebook /></div>
                    <div className="border border-gray-300 p-2 rounded-full"><BiLogoInstagram /></div>
                    <div className="border border-gray-300 p-2 rounded-full"><BiLogoTwitter /></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
}

export default Cars;
