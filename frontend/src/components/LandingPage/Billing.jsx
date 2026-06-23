import img from '../../assets/images/escrow_img.png';

const Billing = () => {
  return (
    <div className="pt-[5%] p-4 w-full flex flex-col items-center">
      <div className="flex flex-col items-center text-center ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#151827] 2xl:text-[4rem]">
          Billing
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 2xl:text-[2rem]">
          One straightforward fee per transaction, designed to scale with your needs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-[3%] my-[2.0rem] p-3 justify-center  w-full ">
        {/* Card 1 */}
        <div className="w-full md:w-[33%] 2xl:w-[30%] shadow-2xl flex flex-col rounded-2xl bg-white border-2 2xl:p-[4rem] border-transparent transition-all duration-300 ease-in-out hover:border-amber-400 hover:shadow-xl">
          <div className="w-full p-4 flex-1">
            <div className="m-2">
              <div className="my-2">
                <h1 className="text-base md:text-lg lg:text-xl font-bold text-[#151827] 2xl:text-[2rem]">
                  Secure Escrow Protection
                </h1>
                <p className="text-xs md:text-sm text-gray-500 mt-1 2xl:text-[1.5rem] 2xl:mb-[3.0rem]">
                  Every transaction is protected from start to finish
                </p>
              </div>

              <ul className="list-disc list-inside mt-4 text-xs md:text-sm text-gray-600 space-y-2 2xl:text-[2rem]">
                <li className="mb-2">Funds held securely</li>
                <li className="mb-2">Buyer & seller protection</li>
                <li className="mb-2">Transparent transaction tracking</li>
              </ul>
            </div>
          </div>
          <div className="px-6 pb-6 mt-auto text-sm md:text-base 2xl:text-[2rem] font-bold">
            <button className="w-full shadow-md border rounded-full p-2.5 hover:bg-amber-400 hover:text-black transition-colors duration-200 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-[33%] 2xl:w-[30%] rounded-2xl p-2 bg-amber-400 flex flex-col border-2 border-transparent transition-all duration-300 ease-in-out hover:border-amber-500 hover:shadow-xl">
          <p className="text-center py-2 font-bold text-[#151827] text-sm md:text-base lg:text-lg 2xl:text-[2rem]">
            Fee Per Transaction
          </p>
          <div className="flex flex-col flex-1 w-full shadow-2xl rounded-xl bg-white p-4 2xl:p-[4rem]">
            <div className="w-full flex-1">
              <div className="m-2">
                <img
                  src={img}
                  alt="Escrow Image"
                  className="mx-auto max-h-[140px] object-contain"
                />
                <div className="mt-4">
                  <h1 className="text-sm md:text-base font-bold text-[#151827] 2xl:text-[1.5rem]">
                    Pay Only When You Transact
                  </h1>
                  <p className="my-2 text-2xl md:text-3xl font-extrabold text-amber-500">Pay 5%</p>
                  <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1 2xl:text-[2rem]">
                    <li>Per successful transaction</li>
                    <li>No setup fees</li>
                    <li>No monthly subscriptions</li>
                    <li>No maintenance fees</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-2 pt-4 mt-auto text-sm md:text-base font-bold 2xl:text-[2rem]">
              <button className="shadow-md rounded-full w-full p-2.5 bg-amber-400 text-black border border-amber-500 hover:bg-amber-500 transition-colors duration-200 cursor-pointer">
                Start a Secure Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full md:w-[33%] 2xl:w-[30%] flex flex-col shadow-2xl 2xl:p-[4rem] rounded-2xl bg-white border-2 border-transparent transition-all duration-300 ease-in-out hover:border-amber-400 hover:shadow-xl">
          <div className="w-full p-4 flex-1">
            <div className="m-2">
              <div>
                <h1 className="text-base md:text-lg lg:text-xl font-bold text-[#151827] 2xl:text-[2rem]">
                  Fair Fee Cap
                </h1>
                <p className="text-xs md:text-sm text-gray-500 mt-1 2xl:text-[1.5rem]">
                  Large transactions shouldn't mean unlimited fees.
                </p>
                <ul className="list-disc list-inside mt-4 text-xs md:text-sm text-gray-600 space-y-2 2xl:text-[2rem]">
                  <li>Maximum fee cap applies</li>
                  <li>Predictable transaction costs</li>
                  <li>Ideal for high-value deals</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 mt-auto text-sm md:text-base font-bold 2xl:text-[2rem]">
            <button className="shadow-md rounded-full w-full p-2.5 border hover:bg-amber-400 hover:text-black transition-colors duration-200 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
