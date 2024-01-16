import React from 'react';
import { domain } from '../../axios/axios';
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

function FullScreenCarousel({ bikeImages, setIsFullScreen }) {
	return (
		<div className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex justify-center items-center bg-opacity-85 bg-black">
			<button onClick={() => setIsFullScreen(false)} className="z-50 fixed cursor-pointer px-2 py-0.5 top-5 right-5 rounded-sm bg-white">
				<i className="fa-solid fa-xmark text-2xl"></i>
			</button>

			<Swiper
				modules={[Navigation, A11y]}
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log("slide change")}
				onSwiper={(swiper) => console.log(swiper)}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
			>
				{
					bikeImages?.map((e, index) => {
						return (
							<SwiperSlide key={index}>
								<div className="flex justify-center items-center h-screen">
									<TransformWrapper defaultScale={1}>
										<TransformComponent contentStyle={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }} wrapperStyle={{ height: "100%", width: "100%" }}>
											<img className="h-full sm:h-[90vh] w-full object-center object-contain" src={`${domain + e?.image_path}`} />
										</TransformComponent>
									</TransformWrapper>
								</div>
							</SwiperSlide>
						);
					})
				}
			</Swiper>
		</div>
	);
}

export default FullScreenCarousel;
