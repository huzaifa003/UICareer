import React, { useEffect, useState } from 'react';

const ResultLoading = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = count > 0 && setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  const progressBarWidth = (10 - count) * (100 / 10);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-indigo-500">
      <h2 className="text-4xl font-bold text-white mb-8 animate-bounce">Congratulations! Your Test is Completed</h2>
      <h1 className="text-2xl font-bold text-white mb-8 animate-pulse">We are Identifying your Career....</h1>
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold animate-ping">
          {count}
        </div>
      </div>
      <div className="w-64 h-4 bg-gray-200 mt-4 rounded-full">
        <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progressBarWidth}%` }}></div>
      </div>
      <div className="text-white mt-4 text-sm">
        {count === 0 ? "Hold tight! Your career insights are almost ready." : "Analyzing your results..."}
      </div>
    </div>
  );
};

export default ResultLoading;
