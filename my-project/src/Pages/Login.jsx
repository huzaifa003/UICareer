import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#184272] to-[#001834]">
      <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-96">
        <h3 className="text-3xl font-semibold mb-4 text-center">Login</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
              type="text"
              id="username"
              placeholder="Enter username"
              name="username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div className="text-right">
            <a className="text-blue-500 text-sm hover:underline" href="#">
              Forgot password
            </a>
          </div>
          <div className="mt-6">
          <Link to="/Home">
            <button className="w-full bg-[#C70039] text-white p-2 rounded  transition duration-300">
             Login
            </button>
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/SignUp" className="text-blue-500 hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
