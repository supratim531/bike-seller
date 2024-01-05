import { Carousel } from 'flowbite-react';
import { domain } from '../../axios/axios';

function BikeCarousel({ bikeImages }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {
          bikeImages.map(e =>
            <div style={{ backgroundImage: `url(${domain}${e?.image_path.replaceAll(' ', '%20')})` }} key={e?.bikeimage_id} className="w-full h-full bg-contain bg-center bg-no-repeat bg-black"></div>
          )
        }
      </Carousel>
    </div>
  )
}

export default BikeCarousel;
