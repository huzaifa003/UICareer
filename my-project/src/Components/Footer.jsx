import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container px-10 py-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
        {/* Left Column (Company Info) */}
        <div className="md:col-span-1">
          <p className="text-xl font-semibold">ILM O IRFAN TECHNOLOGIES</p>
          <p className="mt-2">
            {/* 123 Main Street, City */}
            <br />
            Lahore, Pakistan
          </p>
        </div>

        {/* Right Column (Social Media and Quick Links) */}
        <div className="md:col-span-1 text-right">
          <p className="mt-2">Connect with Us:</p>
          <div className="flex justify-center md:justify-end mt-4 ">
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 mx-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 mx-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 mx-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p className="mt-4 text-center">&copy; 2023 Your Company. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
