import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../data.jsx';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(autoplay);
  }, []);

  return (
    <section className="mt-[2%] md:mt-[8%] mx-auto w-full min-h-screen bg-[#151827] relative pb-3 md:px-5">
      <div className="flex flex-col md:flex-row items-center">
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
          className="w-full md:w-[50%] p-4 md:mx-auto"
        >
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[6.0rem] font-extrabold tracking-tight leading-tight p-2 max-w-[95%]">
              Secure Every <span className="text-amber-300">Deal</span> <br />
              With PayBridge
            </h1>
          </div>
          <div className="px-2 max-w-full my-2 text-sm md:text-base lg:text-lg text-gray-300 2xl:text-[2.5rem] 2xl:mb-[4.0rem]">
            <p>
              The ultimate escrow platform for social commerce. We hold the money until the product
              is delivered, ensuring both buyers and sellers are 100% protected.
            </p>
          </div>
          <div className="p-2 flex gap-3 text-sm md:text-base 2xl:text-[2.5rem] 2xl:gap-[3.5rem]">
            <button className="border px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
              Google play
            </button>
            <button className="border px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer">
              App store
            </button>
          </div>

          <div className="mt-6 md:mt-8 my-8 flex flex-wrap items-center justify-around md:justify-start gap-6 2xl:gap-[4rem] p-2">
            <div className="flex flex-col items-center md:items-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-[4.0rem]">$20M</p>
              <p className="text-xs md:text-sm text-gray-400 2xl:text-[2rem]">Payment Secured</p>
            </div>
            <div className="flex flex-col items-center md:items-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-[4.0rem]">1M+</p>
              <p className="text-xs md:text-sm text-gray-400 2xl:text-[2rem]">Active Users</p>
            </div>
            <div className="flex flex-col items-center md:items-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-[4.0rem]">0</p>
              <p className="text-xs md:text-sm text-gray-400 2xl:text-[2rem]">Fixed Cases</p>
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
          className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] md:w-[50%] flex"
        >
          {images.map((val, index) => (
            <img
              key={index}
              src={val.img}
              alt={`slide-${val.id}`}
              className={`absolute w-full border-amber-300 h-full md:w-[92%] md:h-[90%] 2xl:h-[90%] 2xl:w-[90%] rounded-2xl object-cover transition-opacity duration-1000 ease-in-out transform ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
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
