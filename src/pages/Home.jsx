import React from 'react';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { Link } from 'react-router-dom';

function Home() {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  return (
    <>
      <div className="home_banner h-full w-full flex justify-center items-center">
        <div className="text-center space-y-10 text-white bg-black opacity-50 w-full h-full flex flex-col justify-center items-center">
          <h1 className="mt-2 text-3xl font-bold md:text-4xl xl:text-6xl space-y-5">
            <p>
              {isAuthenticated() && (
                auth().name
              )}
            </p>
            <p>Welcome to Car Rental</p>
          </h1>
          <p className="mt-2 mb-16 text-2xl">Find the perfect car for your next adventure</p>
          <div className="space-x-5 opacity-100">
            {!isAuthenticated() && (
              <>
                <Link
                  to="/signup"
                  className="hover:bg-newGreen rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="hover:bg-newGreen rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
