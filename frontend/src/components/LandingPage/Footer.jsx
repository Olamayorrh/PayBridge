import {motion} from "framer-motion"
import phone from '../../assets/images/phoneup2.png';
import { RiLinkedinBoxFill, RiGithubFill } from '@remixicon/react';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-6 p-6 mt-[5%] border-b border-amber-500 w-full bg-[#151827] text-white">
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
            <h1 className="text-[1rem] md:text-[1.4rem] font-medium mb-2 md:text-center md:text-left">
              Secure Your Transactions Now!
            </h1>
            <p className="text-[0.7rem] md:text-[0.8rem] md:text-center md:text-left">
              PayBridge safeguards payments from agreement to completion, giving buyers and sellers
              confidence every step of the way.
            </p>
            <div className="my-3 flex justify-start text-[0.7rem]">
              <button className="border p-1 rounded">Google Play</button>
              <button className="border p-1 rounded mx-2">App Store</button>
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
          <img src={phone} alt="phone image" className="max-w-[200px] md:max-w-full" />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 py-8 px-6 md:px-[3.0rem]">
        <div>
          <h1 className="text-[1rem] md:text-[1.3rem] font-medium">PayBridge</h1>
        </div>
        <ul className="text-[0.7rem] flex flex-wrap justify-center gap-[1.0rem] md:text-[1.0rem] xl:text-[1.5rem]">
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
          <RiLinkedinBoxFill className="hover:text-amber-300 cursor-pointer transition-colors" />
          <RiGithubFill className="hover:text-amber-300 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
