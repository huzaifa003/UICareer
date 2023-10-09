import React from "react";
import { Link } from "react-router-dom";


const Features = ({isRev , content , img ,title ,btnText}) => {
  return (
    <div className={`flex flex-col ${isRev?'md:flex-row-reverse':'md:flex-row'} md:space-x-4 items-center py-8 px-4`}>
      <div className="md:w-1/4">
        <img className="w-full md:w-auto" src={img} alt="Feature" />
      </div>
      <div className="md:w-3/4 bg-white rounded-md shadow-md p-4">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-700">
        {content}
        </p>
        <div className={` ${isRev?'text-left':'text-right'}`}>
        <Link to='/Test'> 
          <button className="bg-[#C70039] hover:bg-red-900 text-white font-semibold px-6 py-3 mt-4 rounded-md transition duration-300">
            {btnText}
          </button>
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Features;
