import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Login</h3>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Enter username"
            name="username" // Add the name attribute for the username field
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Enter password"
            name="password" // Add the name attribute for the password field
          />
        </div>
        <a className="text-blue-500 text-sm hover:underline" href="#">
          Forgot password
        </a>
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          <Link to='/Home'> Login</Link>
           
          </button>
          <div className='py-5 text-blue-800'>
          <Link to='/SignUp'>Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
