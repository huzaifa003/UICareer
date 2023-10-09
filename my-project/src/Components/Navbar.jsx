import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
<nav className="bg-gradient-to-b from-[#184272] to-[#001834] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-semibold text-xl">ILM O IRFAN <span className='text-sm'>Technologies</span></div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                 <Link to='/Home'> Home</Link> 
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                <Link to='/Test'> Take Test</Link> 
              
              </a>
            </li>
           
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar