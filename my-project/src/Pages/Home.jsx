import React from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
     <Navbar/>
     
     <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-semibold">
          Welcome to <span className='text-red-950 font-bold'>ILM O IRFAN</span> Career Test
        </h1>
        <p className="mt-4 text-lg"> Give Test to Analyze your Personality </p>
        <button className="bg-red-950 hover:bg-red-900 text-white font-semibold px-6 py-3 mt-8 rounded-full transition duration-300">
         <Link to='/Test'>Start Test</Link> 
        </button>
    </div>
    </div>
  );
};

export default Home;
