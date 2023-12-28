import { Carousel } from 'flowbite-react';

function BikeCarousel() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <div className="w-full h-full bg-[url(https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-contain bg-center bg-no-repeat bg-black"></div>
        <div className="w-full h-full bg-[url(https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-contain bg-center bg-no-repeat bg-black"></div>
        <div className="w-full h-full bg-[url(https://images.unsplash.com/photo-1525160354320-d8e92641c563?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-contain bg-center bg-no-repeat bg-black"></div>
        {/* <img src="https://images.unsplash.com/photo-1655179552613-4532b003cd50?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." />
        <img src="https://images.unsplash.com/photo-1700295617594-2151de5db8e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="..." /> */}
      </Carousel>
    </div>
  );
}

export default BikeCarousel;
