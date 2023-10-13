import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { app, auth } from '../Components/FirebaseAuth';
import { signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';


const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        navigate("/Home");
        // ...
      } else {
        // User is signed out
        // ...
      }
    }); 
  },[])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const userLogin = () => {
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate("/Home")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorCode + errorMessage);
        
      });
  }


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#184272] to-[#001834]">
      <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-96">
        <h2 className='flex justify-center items-center bg-red' style={{ color: 'red' }}>{error}</h2>;
        <h3 className="text-3xl font-semibold mb-4 text-center">Login</h3>

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
        <div className="text-right">
          <a className="text-blue-500 text-sm hover:underline" href="#">
            Forgot password
          </a>
        </div>
        <div className="mt-6">
          {/* <Link to="/Home"> */}
          <button id="changeError" onClick={userLogin} className="w-full bg-[#C70039] text-white p-2 rounded  transition duration-300">
            Login
          </button>
          {/* </Link> */}
        </div>

        <Link>
          <button id="link" style={{ display: 'none' }}>

          </button>
        </Link>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/SignUp" className="text-blue-500 hover:underline">
              Create Account
            </Link>
          </p>
        </div>

      </div>


    </div>
  );
};

export default Login;
