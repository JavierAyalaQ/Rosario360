import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from "swiper/modules";


import placesData from "@data/placesData.json";

const slides = placesData.map(({ image, href }) => {
    return {
        src: image,
        href: href,
    };
});


const ImageSlider: React.FC = () => {
    return (
      <div className="w-full max-w-7xl">
        <Swiper
          loop={true}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          slidesPerView={4}
          spaceBetween={20}
          className="rounded-lg overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <a href={slide.href} className="user-select-none">
                <img
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full  aspect-video object-cover rounded-lg"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default ImageSlider;
