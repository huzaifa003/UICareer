import React from 'react';
import Navbar from '../Components/Navbar';

const Result = () => {
  const careerRecommendations = [
    {
      career: localStorage.getItem('test1') ? JSON.parse(localStorage.getItem('test1'))[0] : "No data found",
      priority: 'High',
    },
    {
      career: localStorage.getItem('test2') ? JSON.parse(localStorage.getItem('test2'))[0] : "No data found",
      priority: 'Medium',
    },
    {
      career: localStorage.getItem('test3') ? JSON.parse(localStorage.getItem('test3'))[0] : "No data found",
      priority: 'Low',
    },
    // Add more career recommendations here...
  ];

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Career Recommendations</h1>
        <p className="text-lg mb-4">
          Based on your test results, we recommend the following careers:
        </p>

        <ul className="list-inside list-disc pl-4">
          {careerRecommendations.map((recommendation, index) => (
            <li
              key={index}
              className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {recommendation.career}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    recommendation.priority === 'High'
                      ? 'bg-red-500 text-white'
                      : recommendation.priority === 'Medium'
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {recommendation.priority}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Result;
