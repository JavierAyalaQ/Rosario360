import React, { useState, useEffect, useRef } from "react";

// Videos
import video1 from "@vid/video-promo.mp4";
import video2 from "@vid/video-sra.mp4";
import video3 from "@vid/video-sr.mp4";

const VideoSlider: React.FC = () => {
  const videos = [video1, video2, video3];
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const updateVideoStates = () => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.muted = isMuted;
          if (!isPaused) video.play();
          else video.pause();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  useEffect(() => {
    updateVideoStates();

    const videoDuration =
      videoRefs.current[currentIndex]?.duration * 1000 || 5000;
    const videoTimeout = setTimeout(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }
    }, videoDuration);

    return () => clearTimeout(videoTimeout);
  }, [currentIndex, isPaused, isMuted]);



  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + videos.length) % videos.length;
      if (videoRefs.current[newIndex]) {
        videoRefs.current[newIndex].currentTime = 0;
      }
      return newIndex;
    });
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % videos.length;
      // Reset the currentTime of the next video
      if (videoRefs.current[newIndex]) {
        videoRefs.current[newIndex].currentTime = 0;
      }
      return newIndex;
    });
  };
  

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="mt-8 mb-20 overflow-hidden rounded-xl relative w-full min-h-[720px]">
      {/* Slider Videos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-[720px]">
        {videos.map((video, index) => (
          <video
            key={index}
            src={video}
            ref={(el) => (videoRefs.current[index] = el!)}
            loop
            muted={isMuted}
            className={`hero-video h-[720px] w-[405px] brightness-50 contrast-125 saturate-[2] ${ 
              index !== currentIndex ? "hidden" : ""
            }`}
          />
        ))}

        {/* Controls */}
        <div className="grid grid-cols-4 items-start w-[300px] h-full absolute top-4 right-1/2 transform translate-x-1/2 gap-16 mt-4 p-8 text-2xl text-gray-200 z-20">
          <button id="prevBtn" onClick={handlePrev} className="control-button pointer-events-auto">
            <i className="fa fa-chevron-left"></i>
          </button>
          <button id="pauseButton" onClick={togglePause} className="control-button pointer-events-auto">
            <i className={`fa ${isPaused ? "fa-play" : "fa-pause"}`}></i>
          </button>
          <button id="muteButton" onClick={toggleMute} className="control-button pointer-events-auto">
            <i className={`fa ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}></i>
          </button>
          <button id="nextBtn" onClick={handleNext} className="control-button pointer-events-auto">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 pointer-events-none">Villa del Rosario<br></br>
        <span className="text-lg mb-4 pointer-events-none font-normal">
          Desde sus sabores, historia y hospitalidad
        </span></h1>
        <div className="flex flex-col md:flex-row gap-12 md:gap-6">
          <a href="/transmedia" className="button font-semibold bg-green-500 hover:bg-green-600 text-green-950 px-4 py-2 rounded transition-colors">
            Empezar ahora
          </a>
          <a href="/bic/" className="button font-semibold bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded transition-colors">
            Conoce más
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;