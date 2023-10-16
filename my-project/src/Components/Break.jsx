import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Break = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = count > 0 && setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);

  const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 } });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-300 to-blue-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-8" style={props}>
        Take a Short Break and Reflect
      </h2>
      <div className="flex items-center justify-center">
        <div className="animate-bounce">
          <animated.div
            className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold transition duration-500 ease-in-out transform hover:scale-110"
            style={props}
          >
            <i className="fas fa-graduation-cap"></i>
          </animated.div>
        </div>
      </div>
      {/* <div className="mt-8" style={props}>
        <div className="animate-pulse rounded-full h-20 w-20 border-4 border-blue-500"></div>
      </div> */}
      <p className="mt-6 text-gray-700 text-lg text-center px-6 w-[50%]" style={props}>
        Embrace this moment of reflection. You are on a journey of self-discovery and growth. Trust in your abilities and passions. Your path to success starts with believing in yourself.
      </p>
    </div>
  );
};

export default Break;
