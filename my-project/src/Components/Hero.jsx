import React from 'react'
import { Link } from 'react-router-dom';
import headerImg from '../assets/header.jpg';
const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Column (Text) */}
        <div className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-left">
              Welcome to the <span className="text-[#C70039] font-bold">MapTalent4Career</span> 
            </h1>
            <p className="mt-4 text-lg md:text-xl text-left opacity-80">
              Unlock Your Potential, Shape Your Future!
              Discover Your Passion, Find Your Path.
            </p>
           
            <button className="bg-[#C70039] hover:bg-red-900 text-white font-semibold px-6 py-3 mt-8 rounded-md transition duration-300">
              <Link to="/Test">Start Your Journey</Link>
            </button>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="hidden md:block">
          <img src={headerImg} alt="Header" className="w-full h-full object-cover" />
        </div>
      </div>
  )
}

export default Hero