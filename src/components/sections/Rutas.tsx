import React, { useState, useEffect } from "react";

export interface FramePlayerProps {
  frames: string[]; // Array inicial de rutas de frames
  routes: { label: string; src: string[], href: string, video?: string }[]; // Opciones de rutas con labels y arrays de frames (src)
  frameRate?: number; // Frames por segundo (default: 30)
  frameDelay?: number; // Tiempo mínimo entre cambios de frames en milisegundos (default: 500ms)
}

const FramePlayer: React.FC<FramePlayerProps> = ({ frames, routes, frameRate = 30, frameDelay = 500 }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [lastFrameUpdate, setLastFrameUpdate] = useState<number>(0); // Marca temporal del último cambio
  const [touchStartY, setTouchStartY] = useState<number | null>(null); // Coordenada Y inicial del touch
  const [showModal, setShowModal] = useState(false); // Controla si la ventana modal se muestra
  const [currentFrames, setCurrentFrames] = useState<string[]>(frames); // Frames actuales

  const totalFrames = currentFrames.length;

  const updateFrame = (direction: number) => {
    const now = Date.now();

    if (now - lastFrameUpdate < frameDelay) {
      // Restringe el cambio si no ha pasado el tiempo mínimo
      return;
    }

    const newIndex = Math.max(0, Math.min(currentFrameIndex + direction, totalFrames - 1));
    setCurrentFrameIndex(newIndex);
    setLastFrameUpdate(now);

    // Mostrar modal si es el último frame
    if (newIndex === totalFrames - 1) {
      setShowModal(true);
    }
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
        src={currentFrames[currentFrameIndex]}
        alt={`Frame ${currentFrameIndex}`}
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />
      <p className="mt-4 text-white text-lg">
        Frame Actual: {currentFrameIndex + 1}/{totalFrames}
      </p>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Ruta Finalizada</h2>
            <p className="text-gray-700 mb-4 text-center">Selecciona una nueva ruta para reproducir:</p>
            <ul className="space-y-2">
              {routes.map((option, index) => (
                <li key={index}>
                  <a href={option.href}
                    className="w-full text-sm flex px-2 py-1 center text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    {option.label}
                  </a>
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

export default FramePlayer;
