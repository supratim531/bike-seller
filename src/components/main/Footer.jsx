import React from 'react';

function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center text-center">
        <div className="w-full p-8 text-center text-neutral-200 bg-neutral-600">
          <span className="mr-1">© 2023 Copyright</span>
          <a className="font-semibold text-neutral-200" href="https://tw-elements.com/">Bike.com</a>
        </div>
      </footer>
    </>
  )
}

export default Footer;
