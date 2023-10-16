import React from 'react';
import recomendation from '../assets/careerRecom.png';
import { Link } from 'react-router-dom';

const CareerRecommendations = ({url,text}) => {
  return (
    <div className=" py-16 px-10 mb-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">Career Recommendation</h2>
            <p className="text-xl leading-7 mb-4">
              Explore our tutorial on multiple choice questions. Learn how to create engaging and effective MCQs for your assessments and quizzes. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat harum earum qui?
            </p>
            <button className="bg-[#C70039] hover:bg-red-900 text-white font-semibold px-6 py-3 mt-8 rounded-md transition duration-300">
              <Link to={url}>{text}</Link>
            </button>
          </div>
          <div className="relative">
        <img src={recomendation} alt="" />
            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-90 transition-opacity"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendations;
