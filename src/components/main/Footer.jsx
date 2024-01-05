import React from 'react';

function Footer() {
  return (
    // <>
    //   <footer className="flex flex-col items-center text-center">
    //     <div className="w-full p-8 text-center text-neutral-200 bg-neutral-600">
    //       <span className="mr-1">© 2023 Copyright</span>
    //       <a className="font-semibold text-neutral-200" href="https://tw-elements.com/">Bike.com</a>
    //     </div>
    //   </footer>
    // </>
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Connect with Us</h2>
        <div className="space-x-4 mb-4">
          <a href="tel:+916291776361" className="hover:text-gray-400 transition duration-300">
            <i title={"+91 62917 76361"} className="fa-solid fa-phone text-xl"></i>
          </a>
          {/* <a href="#" className="hover:text-gray-400 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20v-6a1 1 0 011-1h2a1 1 0 011 1v6m-3-9a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 11a9 9 0 0114-7l4 4m0 0l-4 4m4-4H5a9 9 0 019 9v-2a7 7 0 00-7-7H3v4z"
              />
            </svg>
          </a> */}
        </div>
        <p className="text-sm">© 2024 Bike.com | All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer;
