import React, { useState, useEffect } from "react";



export interface FramePlayerProps {
  frames: string[]; // Array de rutas de imágenes (frames)
  frameRate?: number; // Frames por segundo (default: 30)
  frameDelay?: number; // Tiempo mínimo entre cambios de frames en milisegundos (default: 500ms)
}

const FramePlayer: React.FC<FramePlayerProps> = ({ frames, frameRate = 30, frameDelay = 500 }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [lastFrameUpdate, setLastFrameUpdate] = useState<number>(0); // Marca temporal del último cambio
  const [touchStartY, setTouchStartY] = useState<number | null>(null); // Coordenada Y inicial del touch

  const totalFrames = frames.length;

  const updateFrame = (direction: number) => {
    const now = Date.now();

    if (now - lastFrameUpdate < frameDelay) {
      // Restringe el cambio si no ha pasado el tiempo mínimo
      return;
    }

    const newIndex = Math.max(0, Math.min(currentFrameIndex + direction, totalFrames - 1));
    setCurrentFrameIndex(newIndex);
    setLastFrameUpdate(now);
  };

  // Manejo de eventos de scroll
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const direction = event.deltaY > 0 ? 1 : -1; // Scroll abajo: avanzar, Scroll arriba: retroceder
    updateFrame(direction);
  };

  // Manejo de eventos de teclado
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      updateFrame(-1);
    } else if (event.key === "ArrowDown") {
      updateFrame(1);
    }
  };

  // Manejo de eventos táctiles
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(event.touches[0].clientY); // Captura la coordenada Y inicial
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartY) return;

    const touchEndY = event.touches[0].clientY; // Coordenada Y actual
    const swipeDistance = touchStartY - touchEndY;

    if (Math.abs(swipeDistance) > 50) {
      // Umbral para detectar swipe
      if (swipeDistance > 0) {
        // Swipe up
        updateFrame(1);
      } else {
        // Swipe down
        updateFrame(-1);
      }

      setTouchStartY(null); // Resetea el punto de inicio después del gesto
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null); // Resetea el punto de inicio al terminar el toque
  };

  // Añadir evento de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFrameIndex, lastFrameUpdate]);






  return (
    <div
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black"
    >
      <img
        src={frames[currentFrameIndex]}
        alt={`Frame ${currentFrameIndex}`}
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />
      <p className="mt-4 text-white text-lg">Frame Actual: {currentFrameIndex + 1}/{totalFrames}</p>


    </div>
  );
};

export default FramePlayer;