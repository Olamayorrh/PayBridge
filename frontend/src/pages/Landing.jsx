import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import Hero from '../components/LandingPage/Hero'
import AboutPayBridge from '../components/LandingPage/AboutPayBridge'
import ValueProposition from '../components/LandingPage/ValueProposition'
import Billing from '../components/LandingPage/Billing'
import Footer from '../components/LandingPage/Footer'

const Landing = () => {
  return (
    <div>
      <div className="bg-[#151827] text-white">
        <Navbar />
        <Hero />
      </div>
      <div>
        <AboutPayBridge />
        <ValueProposition />
        <Billing />
        <Footer />
      </div>
    </div>
  );
}

export default Landing;