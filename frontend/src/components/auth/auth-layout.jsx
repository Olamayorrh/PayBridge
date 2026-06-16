import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';

const slides = [
  '/image-slide-1.png',
  '/image-slide-2.png',
  '/image-slide-3.png',
  '/image-slide-4.png',
];
export function AuthLayout({ activeForm, title, children }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const isSignUp = activeForm === 'sign-up';

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 3500);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="flex min-h-screen h-screen overflow-hidden w-full flex-col bg-coarse-wool lg:flex-row">
      <div className="relative w-full overflow-hidden bg-white lg:min-h-screen lg:w-1/2 lg:pt-8 lg:pl-5">
        <div className="relative z-10 hidden lg:flex lg:absolute">
          <img className="w-12" src="/temporary-logo.png" alt="PayBridge logo" />
        </div>
        <div className="relative z-10 hidden flex-col gap-15 items-center justify-center lg:flex">
          <div className="text-black flex flex-col gap-3 pt-8">
            <div>
              <div className="relative flex  h-80 w-104 items-center overflow-hidden">
                {slides.map((slide) => (
                  <img
                    key={slide}
                    className="size-full object-contain px-8 transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    src={slide}
                    alt=""
                  />
                ))}
              </div>
              <h3 className="text-6xl text-center font-semibold font-birthstone">
                Welcome to PayBridge
              </h3>
            </div>
            <div className="text-lg opacity-70">
              <p>No more risky payments. No more uncertain deliveries.</p>
              <p>
                we help buyers and sellers trade with confidence by holding
                <br /> payments safely in escrow until every agreement is fulfilled.
              </p>
              <p className="text-center">Sign up now to start using PayBridge!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-start pt-15 overflow-y-scroll gap-3 bg-[#151827] px-5 py-8 lg:w-1/2 lg:pr-5">
        <img className="mb-2 w-20 lg:hidden" src="/temporary-logo.png" alt="PayBridge" />
        <h3 className="text-6xl font-bold text-white font-birthstone">{title}</h3>
        <div className="bg-white/15 p-1 my-3 rounded-xl flex gap-1">
          <Link to="/sign-up">
            <Button variant={isSignUp ? 'primary' : 'default'} size="sm" type="button">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant={isSignUp ? 'default' : 'primary'} size="sm" type="button">
              Log In
            </Button>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
