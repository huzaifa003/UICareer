import React from 'react';

const TestTypes = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-900 py-10 mb-10 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-10 md:space-y-0 md:flex-row">
          <div className="flex flex-col items-center md:w-1/3">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-blue-800 mb-4 text-lg font-semibold">
              1
            </div>
            <div className="text-xl font-semibold mb-4">BIG5 Personality Test</div>
            <p className="text-white text-center leading-relaxed">
              Discover your personality traits and characteristics with the BIG5 Personality Test.
            </p>
          </div>
          <div className="flex flex-col items-center md:w-1/3">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-blue-800 mb-4 text-lg font-semibold">
              2
            </div>
            <div className="text-xl font-semibold mb-4">MTBI Test</div>
            <p className="text-white text-center leading-relaxed">
              Explore your personality and preferences using the MTBI test.
            </p>
          </div>
          <div className="flex flex-col items-center md:w-1/3">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-blue-800 mb-4 text-lg font-semibold">
              3
            </div>
            <div className="text-xl font-semibold mb-4">DISC Assessment</div>
            <p className="text-white text-center leading-relaxed">
              Gain insights into your behavior and communication style with the DISC assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTypes;
