import React from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Link } from 'react-router-dom';

function Home() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <div className="relative overflow-hidden bg-cover bg-no-repeat home_banner p-10">
        <div
          className=" absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed"
        >
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-2 text-3xl font-bold md:text-4xl xl:text-6xl">
                Welcome to Car Rental
              </h1>
              <p className="mt-2 mb-16 text-2xl">Find the perfect for your next adventure</p>
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
