import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from "swiper/modules";


import recorridos from "@data/recorridos.json";

const slides = recorridos.map(({ image, name, slug }) => {
    return {
        slug: slug,
        src: image,
        name: name,
    };
});


const ImageSlider: React.FC = () => {
    return (
      <div className="w-full max-w-7xl absolute bottom-0 transition-transform duration-700 hover:opacity-100 transform translate-y-1/4 hover:-translate-y-1/4">
        <Swiper
          loop={true}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            // Mobile devices
            768: {
              slidesPerView: 2,
            },
            // Larger screens like tablets and desktops
            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
          className="rounded-lg overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <a href={`/transmedia/recorridos/${slide.slug}`} className="select-none">
                <img
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full aspect-video object-cover rounded-lg overflow-hidden"
                />
                <span className="opacity-0 absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center px-4 text-white text-center text-sm transition-opacity hover:opacity-100">{slide.name}</span> 
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default ImageSlider;
