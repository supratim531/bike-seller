import React from 'react';
import Lottie from 'react-lottie';
import animation from '../../assets/summer-trip.json'

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Lottie options={defaultOptions}
        height={450}
        width={400}
        style={{ marginTop: "70px" }}
      />
      {/* <div className="flex space-x-2 justify-center items-center h-[70vh] bg-white">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce"></div>
      </div> */}
    </>
  )
}

export default Loader;
