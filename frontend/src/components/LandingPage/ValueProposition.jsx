
import { motion } from 'framer-motion';
import img1 from '../../assets/images/phone1.png';
import { value } from '../../data';



const ValueProposition = () => {
  return (
    <section className="p-3 flex flex-col items-center justify-center w-full">
      <h1 className="mt-[5%] text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-center text-[#151827] 2xl:text-[4rem]">
        Powerful Features Of PayBridge
      </h1>
      <div className="flex flex-col md:flex-row w-full p-3 py-[5%] gap-8 items-center">
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
          className="w-[80%] md:w-[50%] flex justify-center mx-auto md:mx-0 mb-6 md:mb-0"
        >
          <img
            src={img1}
            alt="secured phone"
            className="w-[100%] max-w-[280px] md:max-w-full lg:w-[80%]"
          />
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] w-full md:w-[50%]"
        >
          {value.map((item, index) => (
            <div key={index} className="mb-2 flex flex-col items-start">
              <div className="bg-amber-300 rounded-full w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 2xl:w-20 2xl:h-20 text-black flex items-center justify-center p-1.5 md:p-2 shrink-0">
                {item.logo}
              </div>
              <div className="mt-2">
                <p className="text-base md:text-lg lg:text-xl font-bold text-[#151827] leading-tight 2xl:text-[3rem]">
                  {item.title}
                </p>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1 2xl:text-[2rem]">{item.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
