import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import image1 from '../../assets/images/escrow1.png';
import image2 from '../../assets/images/escrow2.jpg';
import image3 from '../../assets/images/escrow3.png';

import image5 from '../../assets/images/security1.jpg';
import image6 from '../../assets/images/security2.jpg';


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      id: 1,
      img: image1,
    },
    {
      id: 2,
      img: image2,
    },
    {
      id: 3,
      img: image3,
    },

    {
      id: 5,
      img: image5,
    },
    {
      id: 6,
      img: image6,
    },
  ];

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(autoplay);
  }, [images.length]);

  return (
    <section className="mt-[2%] md:mt-[8%] mx-auto w-full min-h-100vh bg-[#151827] relative pb-3">
      <div className="flex flex-col md:flex-row">
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
          className="w-full md:w-[50%] p-3 md:mx-auto"
        >
          <div>
            <h1 className="text-[1.2rem] md:text-2xl lg:text-2xl font-medium leading-normal p-2 max-w-[95%]">
              Secure Every <span className="text-amber-300">Deal</span> <br />
              With PayBridge
            </h1>
          </div>
          <div className="px-2 max-w-full my-2 text-[0.8rem] xl:text-[1.0rem]">
            <p>
              The ultimate escrow platform for social commerce. We hold the money until the product
              is delivered, ensuring both buyers and sellers are 100% protected.
            </p>
          </div>
          <div className=" p-2 flex gap-2 text-[0.8rem] xl:text-[1.0rem]">
            <button className="border p-1 rounded">Google play</button>
            <button className="border p-1 rounded">App store</button>
          </div>

          <div className="mt-4 md:mt-8 my-8 flex flex-wrap items-center justify-around sm:justify-start gap-4 sm:gap-[2.0rem] p-2 text-[0.8rem]">
            <div className="flex flex-col items-center">
              <p className="font-medium md:text-3xl xl:text-[1.5rem]">$20M</p>
              <p className="xl:text-[0.7rem]">Payment Secured</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-medium md:text-3xl xl:text-[1.5rem]">1M+</p>
              <p className="xl:text-[0.7rem]">Active Users</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-medium md:text-3xl xl:text-[1.5rem]">0</p>
              <p className="xl:text-[0.7rem]">Fixed Cases</p>
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
          className="relative w-full h-[350px] sm:h-[450px] md:h-auto md:w-[50%] xl:h-auto xl:w-[40%] flex"
        >
          {images.map((val, index) => (
            <img
              key={index}
              src={val.img}
              alt={`slide-${val.id}`}
              className={`absolute w-full border-amber-300 h-full md:w-[92%] md:h-[90%] rounded-2xl object-cover transition-opacity duration-1000 ease-in-out transform ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'w-12 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="custom-shape-divider-bottom-1781020211">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
