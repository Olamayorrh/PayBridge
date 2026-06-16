import {motion} from "framer-motion"
import img1 from '../../assets/images/phone2.png';

const AboutPayBridge = () => {
  const deal = [
    {
      id: 1,
      title: 'Fund the Deal',
      body: 'Buyer deposits payment into PayBridge.',
    },
    {
      id: 2,
      title: 'Accept Terms',
      body: 'Seller reviews and accepts the transaction.',
    },
    {
      id: 3,
      title: 'Deliver',
      body: 'Seller completes the agreed work or delivery.',
    },
    {
      id: 4,
      title: 'Get Paid',
      body: 'Buyer approves, and funds are released instantly.',
    },
  ];
  return (
    <section className="flex flex-col mt-[8%] justify-center items-center p-4">
      <div className="flex flex-col items-center justify-center my-3 text-center">
        <h1 className="text-[1.0rem] md:text-2xl xl:text-[1.5rem] font-medium">
          How Every PayBridge Transaction Works
        </h1>
        <p className="text-[0.8rem] md:text-[0.9rem] xl:text-[1rem]">
          Secure payments. Trusted transactions.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-2 gap-8">
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
          <div className="w-[95%] md:max-w-full flex justify-center items-center bg-[#151827] rounded-3xl p-4">
            <img src={img1} alt="mobile screenshot" className="w-[70%] xl:w-[50%]" />
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
            <div key={val.id} className="flex items-start gap-2.5 mb-4">
              <p className="p-2 text-[0.7rem] xl:text-[1.0rem] leading-none rounded-full bg-amber-100 text-black flex items-center justify-center w-8 h-8 xl:w-[3.0rem] xl:h-[3.0rem] shrink-0">{`0${val.id}`}</p>
              <div className="flex flex-col mx-2">
                <h2 className="text-[1.0rem] xl:text-[1.2rem] font-medium leading-tight">
                  {val.title}
                </h2>
                <p className="text-[0.8rem] xl:text-[1.0rem] text-gray-400">{val.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPayBridge;
