import React, { useState, useEffect, useRef } from "react";

// Videos
import video1 from "@vid/video-promo.mp4";
import video2 from "@vid/video-sr.mp4";
import video3 from "@vid/video-sra.mp4";

const VideoSlider: React.FC = () => {
  const videos = [video1, video2, video3];
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Helper to play only the current video and mute/pause others
  const updateVideoStates = () => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.muted = isMuted;
          if (!isPaused) video.play();
          else video.pause();
        } else {
          video.pause();
          video.currentTime = 0; // Reset time for paused videos
        }
      }
    });
  };

  useEffect(() => {
    updateVideoStates();

    // Set up timeout for automatic video transitions
    const videoDuration =
      videoRefs.current[currentIndex]?.duration * 1000 || 5000; // Fallback duration
    const videoTimeout = setTimeout(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }
    }, videoDuration);

    return () => clearTimeout(videoTimeout);
  }, [currentIndex, isPaused, isMuted]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="my-8 h-[720px] overflow-hidden rounded-xl relative w-full">
      {/* Slider Videos */}
      <div className="absolute inset-0 flex items-center justify-center  pointer-events-none">
        {videos.map((video, index) => (
          <video
            key={index}
            src={video}
            ref={(el) => (videoRefs.current[index] = el!)}
            loop
            muted={isMuted}
            className={`hero-video brightness-50 contrast-125 saturate-[2] ${
              index !== currentIndex ? "hidden" : ""
            }`}
          />
        ))}

        {/* Controls */}
        <div className="flex absolute top-0 right-1/2 transform translate-x-1/2 gap-16 mt-4 p-8 text-2xl z-20 text-gray-200">
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2 pointer-events-none">Villa del Rosario</h1>
        <p className="text-md md:text-xl mb-4 pointer-events-none">
          desde sus sabores, historia y hospitalidad
        </p>
        <div className="flex-col md:flex-row gap-12 md:gap-6">
          <a href="#" className="button">
            Empezar ahora
          </a>
          <a href="#" className="button bg-gray-700 hover:bg-gray-800">
            Conoce más
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;