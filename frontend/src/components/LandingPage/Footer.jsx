import { motion } from 'framer-motion';
import phone from '../../assets/images/phoneup2.png';
import { RiLinkedinBoxFill, RiGithubFill } from '@remixicon/react';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-6 p-6 mt-[5%] border-b border-amber-500 w-full bg-[#151827] text-white items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: 'spring', stiffness: 60 },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full md:w-[50%] flex flex-col items-center justify-center"
        >
          <div className="flex flex-col justify-center w-full md:w-[80%] p-2">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 2xl:text-[3rem]">
              Secure Your Transactions Now!
            </h1>
            <p className="text-xs md:text-sm text-gray-300 2xl:text-[1.5rem] 2xl:mb-4">
              PayBridge safeguards payments from agreement to completion, giving buyers and sellers
              confidence every step of the way.
            </p>
            <div className="my-4 flex justify-start text-xs md:text-sm gap-2 2xl:text-[2rem]">
              <button className="border px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
                Google Play
              </button>
              <button className="border px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
                App Store
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: 'spring', stiffness: 60 },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full md:w-[40%] flex md:justify-center p-2"
        >
          <img src={phone} alt="phone image" className="max-w-[200px] md:max-w-full 2xl:w-[40%]" />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 py-8 px-6 md:px-[3.0rem]">
        <div>
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-[#151827] 2xl:text-[3rem]">
            PayBridge
          </h1>
        </div>
        <ul className="text-xs md:text-sm flex flex-wrap justify-center gap-4 md:gap-6 2xl:text-[2rem]">
          <li>
            <a href="#" className="hover:text-amber-300 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-300 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-300 transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-300 transition-colors">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex gap-3">
          <RiLinkedinBoxFill className="hover:text-amber-300 cursor-pointer transition-colors 2xl:size-[4rem]" />
          <RiGithubFill className="hover:text-amber-300 cursor-pointer transition-colors 2xl:size-[4rem]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
