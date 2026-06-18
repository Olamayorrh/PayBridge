import img from "../../assets/images/escrow_img.png"

const Billing = () => {
  return (
    <div className=" pt-[3%] p-3 w-full md:flex md:flex-col items-center ">
      <div className="flex flex-col items-center">
        <h1 className="text-[1.0rem] font-medium md:text-[1.5rem] xl:text-[2.0rem]">Billing</h1>
        <p className="text-[0.8rem] xl:text-[1.2rem]">
          One straightforward fee per transaction, designed to scale with your needs.
        </p>
      </div>

      <div className="md:flex gap-[1.0rem] pt-[2%] my-[2.0rem] p-3 justify-center ">
        <div className="w-full md:w-[30%] shadow-2xl md:flex md:flex-col rounded-2xl transition-all duration-300 ease-in-out hover:border-4 hover:border-amber-400">
          <div className="w-full md:w-[100%]  p-2">
            <div className=" m-[5%] p-3">
              <div className="my-2 ">
                <h1 className="text-[0.9rem] md:text-[1.2rem] font-bold">
                  Secure Escrow Protection
                </h1>
                <p className="text-[0.7rem]">Every transaction is protected from start to finish</p>
              </div>

              <ul className="list-disc list-inside mt-4 text-[0.7rem] md:text-[0.75rem]">
                <li className="my-3">Funds held securely</li>
                <li className="my-3">Buyer & seller protection</li>
                <li className="my-3">Transparent transaction tracking</li>
              </ul>
            </div>
          </div>
          <div className="px-[1.0rem] mb-[5%] mt-auto text-[0.7rem] md:text-[1.1rem] font-bold">
            <button className="w-full shadow-md border rounded-full p-2 mb-2 md:mb-0">
              Learn More
            </button>
          </div>
        </div>

        <div className="w-full md:w-[30%] rounded-2xl p-2 bg-amber-400 pt-[1.5%] transition-all duration-300 ease-in-out hover:border hover:border-amber-400">
          <p className="text-center mx-3 mb-2 text-white text-[1.0rem] md:text-[1.2rem]">
            Fee Per Transaction
          </p>
          <div className="  md:flex-col w-[100%] shadow-2xl rounded-2xl bg-white xl:pb-1">
            <div className="w-[100%]  p-2 ">
              <div className="w-full md:w-[100%] ">
                <div className=" m-[5%] p-3">
                  <img src={img} alt="Escrow Image" />
                  <div>
                    <h1 className="text-[0.8rem] md:text-[0.9rem] font-medium my-2">
                      Pay Only When You Transact
                    </h1>
                    <p className="my-2 text-[0.9rem] md:text-[0.9rem] font-medium">Pay 5%</p>
                    <ul className="list-disc list-inside mt-4 text-[0.7rem] md:text-[0.75rem] ">
                      <li>Per successful transaction</li>
                      <li>No setup fees</li>
                      <li>No monthly subscriptions</li>
                      <li>No maintenance fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-[5%] mt-auto md:mb-[5%] text-[0.7rem] md:text-[0.8rem] xl:text-[1.2rem] font-bold ">
              <button className="shadow-md rounded-full w-full p-2 border mb-2 md:mb-0 ">
                Start a Secure Transaction
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] flex flex-col shadow-2xl rounded-2xl transition-all duration-300 ease-in-out hover:border-2 hover:border-amber-400">
          <div className="w-[100%] p-2">
            <div className="m-[5%] p-3">
              <div>
                <h1 className="text-[0.9rem] md:text-[1.3rem] font-medium my-2">Fair Fee Cap</h1>
                <p className="text-[0.7rem]">Large transactions shouldn't mean unlimited fees.</p>
                <ul className="list-disc list-inside mt-4 text-[0.7rem]">
                  <li>Maximum fee cap applies</li>
                  <li>Predictable transaction costs</li>
                  <li>Ideal for high-value deals</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="m-[5%] mt-auto mb-[5%] text-[0.7rem] md:text-[1.1rem] font-bold">
            <button className="shadow-md rounded-full w-full p-2 border">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
