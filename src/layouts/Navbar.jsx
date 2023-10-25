import { useState } from "react";
import { Link } from 'react-router-dom';
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoPinterestAlt,
  BiLogoVimeo,
} from "react-icons/bi";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Cars", href: "cars" },
  { name: "About", href: "about" },
];

export default function Navbar({ dark, data }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed p-4 w-full h-14 bg-gray-50 flex items-center justify-between dark:bg-neutral md:flex-col md:w-2/12 md:h-screen md:p-0">
        {/* Mobile menu */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-gray-700"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 dark:text-white" aria-hidden="true" />
          </button>
        </div>

        {/* App Name */}
        <a href="#f" className="md:mt-5">
          <span className="font-semibold md:font-bold text-lg md:text-2xl">
            Car Rentals
          </span>
        </a>

        {/* Navigation Links */}
        {/* <nav className="flex flex-col space-y-2"> */}
        <nav className="hidden md:flex md:flex-col md:self-end md:space-y-2 md:p-0 md:m-0">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-l font-bold leading-6 py-2 pr-16 pl-5 text-black hover:bg-newGreen hover:text-white
            dark:text-white ">{item.name}</Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="space-x-4 flex flex-wrap justify-center items-center md:p-4">
          <a href="#gg" className="hidden text-black hover:text-newGreen text-l md:block">
            <BiLogoFacebook />
          </a>
          <a href="#gg" className="hidden text-black hover:text-newGreen text-l md:block">
            <BiLogoTwitter />
          </a>
          <a href="#gg" className="hidden text-black hover:text-newGreen text-l md:block">
            <BiLogoPinterestAlt />
          </a>
          <a href="#gg" className="hidden text-black hover:text-newGreen text-l md:block">
            <BiLogoVimeo />
          </a>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={dark}
              checked={data ? "dark" : ""}
            />
            {/* sun icon */}
            <SunIcon className="text-newGreen swap-on w-4" />
            {/* moon icon */}
            <MoonIcon className="swap-off  w-4" />
          </label>
        </div>
      </div>
      <Dialog
        as="div"
        className={`${data ? "dark" : ""} font-Poppins md:hidden`}
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-gray-300 bg-opacity-90  bg-red text-gray-700 dark:bg-base-100 dark:bg-opacity-90 dark:text-white" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full h-5/6 overflow-auto bg-white text-gray-700 px-6 py-6 sm:max-w-full dark:bg-base-100 dark:text-white">
          <div className="flex items-center justify-between text-gray-700 dark:text-white">
            <a
              href="#hero"
              className="font-bold text-xl text-gray-700 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}>
              TochiDev
            </a>
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-newDark hover:text-newDarkYello dark:text-white">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
