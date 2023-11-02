import React from 'react';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { Link } from 'react-router-dom';

function Home() {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  return (
    <>
      <div className="relative home_banner p-10">
        <div
          className="absolute inset-0 h-full w-full"
        >
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-2 text-3xl font-bold md:text-4xl xl:text-6xl">
                <span>
                  {isAuthenticated() && (
                    auth().name
                  )}
                </span>
                <br />
                Welcome to Car Rental
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
        </div>
      </div>
    </>
  );
}

export default Home;
