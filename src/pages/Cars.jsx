import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
} from 'react-icons/bi';
import Alert from '../layouts/Alert';
import mini from '../assets/images/mini.png';
import retro from '../assets/images/retro.png';
import small from '../assets/images/small.png';

function Cars() {
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

  const imageData = [
    {
      id: 1,
      name: 'Mini Image',
      url: mini,
      description: 'This is a mini image',
    },
    {
      id: 2,
      name: 'Retro Image',
      url: retro,
      description: 'This is a retro image',
    },
    {
      id: 3,
      name: 'Small Image',
      url: small,
      description: 'This is a small image',
    },
  ];

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
      <section className="grid grid-col place-content-center items-center p-4">
        {alert && <Alert msg={alert} />}
        <h1 className="text-center text-4xl font-extrabold">LATEST MODELS</h1>
        <p className="text-center text-gray-500">Please select a car model</p>
        <Carousel
          // eslint-disable-next-line react/jsx-boolean-value
          infinite={true}
          responsive={responsive}
        >
          {imageData.map((image) => (
            <div key={image.id} className="space-y-5">
              <div className="relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72">
                <img src={image.url} className="h-full object-fill" alt={image.name} />
              </div>
              <span className="text-center">
                <h3 className="">{image.name}</h3>
              </span>
              <hr className="mx-auto h-0.5 w-52 border-dashed border-t-2 border-gray-400 opacity-100 dark:opacity-50" />
              <article className="flex justify-center space-x-4 items-center">
                <a
                  href="#fac"
                  className="inline-block rounded-full p-3 text-s font-medium border-2 border-gray-500 text-gray-500 shadow-md transition duration-150 ease-in-out hover:shadow-lg active:shadow-lg"
                >
                  <BiLogoFacebook />
                </a>
                <a
                  href="#fac"
                  className="inline-block rounded-full p-3 text-s font-medium border-2 border-gray-500 text-gray-500 shadow-md transition duration-150 ease-in-out hover:shadow-lg active:shadow-lg"
                >
                  <BiLogoInstagram />
                </a>
                <a
                  href="#fac"
                  className="inline-block rounded-full p-3 text-s font-medium border-2 border-gray-500 text-gray-500 shadow-md transition duration-150 ease-in-out hover:shadow-lg active:shadow-lg"
                >
                  <BiLogoTwitter />
                </a>
              </article>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
}

export default Cars;
