
import { motion } from 'framer-motion';
import img1 from '../../assets/images/phone1.png';
import {
  RiGitRepositoryPrivateLine,
  RiWirelessChargingLine,
  RiNotification2Line,
  RiBookOpenLine,
  RiScales3Fill,
  RiShieldCheckFill,
  RiServiceLine,
} from '@remixicon/react';



const ValueProposition = () => {
  const value = [
    {
      logo: <RiGitRepositoryPrivateLine size="100%" />,
      title: 'Secure Escrow',
      body: 'Funds are held securely until both parties meet the agreed transaction terms.',
    },
    {
      logo: <RiWirelessChargingLine size="100%" />,
      title: 'Instant Release',
      body: 'Payments are released immediately once buyer approval is received.',
    },
    {
      logo: <RiNotification2Line size="100%" />,
      title: 'Real-Time Alerts',
      body: 'Get notified of every important transaction update as it happens.',
    },
    {
      logo: <RiScales3Fill size="100%" />,
      title: 'Dispute Resolution',
      body: 'A fair process designed to resolve conflicts and protect both parties.',
    },
    {
      logo: <RiBookOpenLine size="100%" />,
      title: ' Transaction Tracking',
      body: 'Monitor every step of your transaction from start to completion.',
    },
    {
      logo: <RiShieldCheckFill size="100%" />,
      title: 'Payment Assurance',
      body: "Sellers can confidently proceed knowing that the buyer's payment has already been secured.",
    },
    {
      logo: <RiServiceLine size="100%" />,
      title: 'Buyer & Seller Protection',
      body: 'Built-in safeguards help reduce fraud and increase trust for all users.',
    },
  ];
  return (
    <section className="p-3 flex flex-col items-center justify-center w-full">
      <h1 className="mt-[5%] text-[1.2rem] xl:text-[1.7rem] font-medium mb-3 text-center">
        Powerful Features Of PayBridge
      </h1>
      <div className="flex flex-col md:flex-row w-full p-3 py-[5%] gap-8">
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
          className="w-[80%] md:w-[50%] flex justify-center mb-6 md:mb-0"
        >
          <img
            src={img1}
            alt="secured phone"
            className="w-[100%] max-w-[280px] md:max-w-full xl:w-[80%]"
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
            <div key={index} className="mb-2">
              <div className="bg-amber-300 p-1 md:p-2 rounded-full w-[1.2rem] md:w-[1.9rem] xl:w-[1.7rem] text-black flex items-center justify-center">
                {item.logo}
              </div>
              <div className="mt-2">
                <p className="text-[1.0rem] xl:text-[1.2rem] font-medium leading-tight">
                  {item.title}
                </p>
                <p className="text-[0.8rem] xl:text-[1.0rem] text-gray-500">{item.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
