import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { app, auth } from '../Components/FirebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },[])
  return (
    <>
<nav className="bg-gradient-to-b from-[#184272] to-[#001834] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-semibold text-xl">MapTalent4Career</div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                 <Link to='/Home'> Home</Link> 
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                <Link to='/Test'> Take Test</Link> 
              
              </a>
            </li> */}
            <li>
              <a
              onClick={()=> {auth.signOut()}}
                href="#"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                <Link to='/'> Logout</Link> 
              
              </a>
            </li>
           
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar