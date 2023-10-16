import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { app, auth } from '../Components/FirebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const userSignup = () => {
    if (password !== confirm) {
      setError("Passwords Do not Match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigate("/Home");
        console.log(user);
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode + errorMessage);
        console.log(error);
        // ..
      });
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#184272] to-[#001834] ">
      <div className="bg-white  p-8 rounded shadow-lg w-full sm:w-96">
        <h2 className='flex justify-center items-center bg-red' style={{color: 'red'}}>{error}</h2>
        <h3 className="text-3xl font-semibold mb-4 text-center">Signup</h3>
        
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
              onChange={(event) => { setEmail(event.target.value); console.log(event.target.value) }}
            />
          </div>
          <div className='flex gap-5'>
            {/* <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              name="firstName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              name="lastName"
            />
          </div> */}

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
              onChange={(event) => { setPassword(event.target.value); console.log(event.target.value) }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Confirm Password
            </label>
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
              type="Confirmpassword"
              id="Confirmpassword"
              placeholder="Enter Confirm password"
              name="Confirmpassword"
              onChange={(event) => { setConfirm(event.target.value); console.log(event.target.value) }}
            />
          </div>
          <div className="mt-6">
            
              <button onClick={userSignup} className="w-full bg-[#C70039] text-white p-2 rounded  transition duration-300">
                Signup
              </button>
            
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        
      </div>
    </div>
  );
};

export default Signup;
