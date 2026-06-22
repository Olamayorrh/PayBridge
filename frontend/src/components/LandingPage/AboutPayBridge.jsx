import { motion } from 'framer-motion';
import img1 from '../../assets/images/phone2.png';
import { deal } from '../../data';

const AboutPayBridge = () => {
  return (
    <section className="flex flex-col mt-[8%] justify-center items-center p-4">
      <div className="flex flex-col items-center justify-center my-3 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-[4rem] font-bold text-[#151827]">
          How Every PayBridge Transaction Works
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 2xl:text-[2.5rem]">
          Secure payments. Trusted transactions.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-2 gap-8 mt-6">
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: 'spring', stiffness: 60 },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full md:w-[50%] flex justify-center items-center"
        >
          <div className="w-[95%] md:max-w-full flex justify-center items-center bg-[#151827] rounded-3xl p-6">
            <img src={img1} alt="mobile screenshot" className="w-[70%] md:w-[60%] lg:w-[50%]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: 'spring', stiffness: 60 },
            opacity: { duration: 1 },
            ease: 'easeIn',
            duration: 1,
          }}
          className="w-full md:w-[50%] p-2"
        >
          {deal.map((val) => (
            <div key={val.id} className="flex items-center gap-4 mb-6 2xl:gap-8">
              <p className="text-xs md:text-sm lg:text-base 2xl:text-[2rem] font-semibold leading-none rounded-full bg-amber-100 text-black flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 2xl:w-20 2xl:h-20 shrink-0">{`0${val.id}`}</p>
              <div className="flex flex-col">
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#151827] leading-tight 2xl:text-[3.0rem]">
                  {val.title}
                </h2>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1 2xl:text-[2.0rem]">
                  {val.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPayBridge;
