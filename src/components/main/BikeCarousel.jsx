import { Carousel } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';
import { domain } from '../../axios/axios';
import noImage from "../../assets/no-image-3.jpg";

function BikeCarousel({ bikeImages }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      {
        bikeImages?.length === 0 ?
          <Carousel>
            <div style={{ backgroundImage: "url(" + noImage + ")" }} className={twMerge(
              "w-full h-full bg-contain bg-center bg-no-repeat bg-black",
              "bg-[url(" + noImage + ")]"
            )}></div>
          </Carousel> :
          <Carousel>
            {
              bikeImages.map(e =>
                <div style={{ backgroundImage: "url(" + domain + e?.image_path + ")" }} key={e?.bikeimage_id} className={twMerge(
                  "w-full h-full bg-contain bg-center bg-no-repeat bg-black",
                  "bg-[url(" + domain + e?.image_path + ")]"
                )}></div>
              )
            }
          </Carousel>
      }
    </div>
  )
}

export default BikeCarousel;
