import React, { useRef, useEffect, useState } from "react";

interface RecorridoNuevoProps {
  videoSrc: string;
  frameRate?: number; // Cuántos frames por segundo tiene el video (default: 30)
  videoOptions: { label: string; src: string }[]; // Lista de opciones de videos para reproducir
  frameDelay?: number; // Tiempo mínimo entre avances/retrocesos en milisegundos (default: 500ms)
}

const RecorridoNuevo: React.FC<RecorridoNuevoProps> = ({ 
  videoSrc, 
  frameRate = 30, 
  videoOptions, 
  frameDelay = 250 
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [lastFrameUpdate, setLastFrameUpdate] = useState<number>(0); // Marca temporal del último cambio de frame

  const frameDuration = 1 / frameRate;

  const updateFrame = (direction: number) => {
    const now = Date.now();

    if (now - lastFrameUpdate < frameDelay) {
      // Si el tiempo transcurrido desde el último cambio es menor que el frameDelay, no avanzar
      return;
    }

    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.currentTime + direction * frameDuration, videoRef.current.duration));
      videoRef.current.currentTime = newTime;
      setCurrentFrame(Math.floor(newTime * frameRate));
      setLastFrameUpdate(now); // Actualizamos la marca temporal

      // Mostrar modal si llegamos al final
      if (newTime === videoRef.current.duration) {
        setShowModal(true);
        captureFrameAsBackground();
      }
    }
  };

  const captureFrameAsBackground = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setBackgroundImage(canvas.toDataURL("image/jpeg"));
      }
    }
  };

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const direction = event.deltaY > 0 ? 1 : -1;
    updateFrame(direction);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      updateFrame(-1);
    } else if (event.key === "ArrowDown") {
      updateFrame(1);
    }
  };

  const handleVideoChange = (src: string) => {
    if (videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.currentTime = 0;
      setCurrentFrame(0);
      setShowModal(false);
      setBackgroundImage("");
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.pause();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      onWheel={handleScroll}
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full max-w-2xl rounded-lg shadow-lg"
        playsInline
        controls={false}
      ></video>
      <p className="mt-4 text-white text-lg">Frame Actual: {currentFrame}</p>
      <button
        className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setIsPaused((prev) => !prev)}
      >
        {isPaused ? "Reanudar" : "Pausar"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Video Finalizado</h2>
            <p className="text-gray-700 mb-4 text-center">Selecciona un nuevo video para reproducir:</p>
            <ul className="space-y-2">
              {videoOptions.map((option, index) => (
                <li key={index}>
                  <button
                    className="w-full px-4 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => handleVideoChange(option.src)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecorridoNuevo;