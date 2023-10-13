import React, { useEffect, useState } from 'react';

const Break = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = count > 0 && setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  const progressBarWidth = (15 - count) * (100 / 15);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-300 to-blue-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Take a Short Break and Reflect</h2>
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
          {count}
        </div>
      </div>
      <div className="w-64 h-4 bg-gray-300 mt-4 rounded-full">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progressBarWidth}%` }}></div>
      </div>
      <p className="mt-4 text-gray-700 text-lg">Reflect on your strengths and passions for a successful career ahead</p>
      <p className="mt-2 text-gray-700 text-lg">"The only way to do great work is to love what you do." - Steve Jobs</p>
    </div>
  );
};

export default Break;
