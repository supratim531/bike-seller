import { Carousel } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';
import { domain } from '../../axios/axios';
import noImage from "../../assets/no-image.jpg";
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

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
          <Carousel slide={false}>
            {
              bikeImages.map(e =>
                <div className="h-full w-full">
                  <TransformWrapper defaultScale={1}>
                    <TransformComponent contentStyle={{ height: "100%", width: "100%" }} wrapperStyle={{ height: "100%", width: "100%", backgroundColor: "rgb(224, 224, 224)" }}>
                      <img src={`${domain + e?.image_path}`} alt="" className="h-full w-full object-contain object-center" />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              )
            }
          </Carousel>
      }
    </div>
  )
}

export default BikeCarousel;
