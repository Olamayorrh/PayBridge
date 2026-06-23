import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b border-amber-300 p-3 2xl:p-5 flex flex-col md:flex-row justify-between md:justify-around items-stretch md:items-center w-full bg-[#151827] text-white">
      <div className="flex justify-between items-center w-full md:w-auto p-2  ">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold 2xl:text-[5.0rem] py-2">payBridge</div>
        <button
          onClick={toggleNavbar}
          className="md:hidden text-2xl font-bold focus:outline-none p-1"
          aria-label="Toggle Navigation"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto p-2 mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row gap-2  lg:gap-4 items-start 2xl:gap-[4.0rem] md:items-center text-sm md:text-base w-full md:w-auto 2xl:text-[2.5rem]">
          <li className="w-full md:w-auto">
            <a
              className="rounded-md text-white hover:bg-amber-300 hover:text-white transition-colors duration-200 p-2 block w-full md:inline-block"
              href="#"
            >
              Home
            </a>
          </li>
          <li className="w-full md:w-auto">
            <a
              className="rounded-md text-white hover:bg-amber-300 hover:text-white transition-colors duration-200 p-2 block w-full md:inline-block"
              href="#"
            >
              About
            </a>
          </li>
          <li className="w-full md:w-auto">
            <a
              className="rounded-md text-white hover:bg-amber-300 hover:text-white transition-colors duration-200 p-2 block w-full md:inline-block"
              href=""
            >
              Features
            </a>
          </li>
          <li className="w-full md:w-auto">
            <a
              className="rounded-md text-white hover:bg-amber-300 hover:text-white transition-colors duration-200 p-2 block w-full md:inline-block"
              href=""
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto border-t 2xl:gap-[4.0rem] border-gray-700 md:border-t-0 pt-4 md:pt-0 text-sm md:text-base 2xl:text-[2.5rem]">
          <button className="text-left py-2 px-2 hover:text-amber-300 transition-colors duration-200 w-full md:w-auto">
            Log in
          </button>
          <button className="px-3 py-2 border border-amber-600 bg-amber-300 text-black font-medium rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:bg-amber-600 hover:text-white hover:-translate-y-1 hover:scale-105 hover:shadow-lg w-full md:w-auto text-center">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
