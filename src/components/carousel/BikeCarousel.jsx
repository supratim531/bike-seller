import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Carousel } from 'flowbite-react';
import { domain } from '../../axios/axios';
import noImage from "../../assets/no-image.jpg";
import FullScreenCarousel from './FullScreenCarousel';

function BikeCarousel({ bikeImages }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      {
        isFullScreen && <FullScreenCarousel bikeImages={bikeImages} setIsFullScreen={setIsFullScreen} />
      }
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        {
          bikeImages?.length === 0 ?
            <Carousel>
              <div style={{ backgroundImage: "url(" + noImage + ")" }} className={twMerge(
                "w-full h-full bg-contain bg-center bg-no-repeat bg-black",
                "bg-[url(" + noImage + ")]"
              )}></div>
            </Carousel> :
            <Carousel slide={false}>
              {
                bikeImages.map((e, index) =>
                  <div key={index} className="h-full w-full bg-black">
                    <img onClick={() => setIsFullScreen(true)} src={`${domain + e?.image_path}`} alt="" className="h-full w-full object-contain object-center" />
                  </div>
                )
              }
            </Carousel>
        }
      </div>
    </>
  )
}

export default BikeCarousel;
