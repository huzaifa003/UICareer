import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BuyPremium = ({url}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 ">
          <motion.div
            className="col-span-2 rounded-lg p-6 bg-blue-100 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-transform"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-center text-3xl font-semibold mb-4 text-blue-800">Unlock Premium Features</h2>
            <p className="text-gray-600 mb-4 text-center">
              Get access to exclusive premium features and content.
            </p>
            <ul style={{listStyle:'none'}} className="list-disc pl-5  text-gray-800 text-center ">
              <li className="mb-2">Feature 1: Premium content</li>
              <li className="mb-2">Feature 2: Enhanced functionality</li>
              <li className="mb-2">Feature 3: Ad-free experience</li>
            </ul>
            <div className='text-center'>

            <button className=" bg-[#C70039] hover:bg-red-900 text-white font-semibold px-6 py-3 mt-8 rounded-md transition duration-300">
              <Link to={url}>Subscribe</Link>
            </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BuyPremium;
