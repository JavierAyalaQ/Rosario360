import React, { useState, useEffect } from "react";

export interface FramePlayerProps {
  frames: string[]; // Array inicial de rutas de frames
  routes: { label: string; src: string[]; href: string }[]; // Opciones de rutas con labels y arrays de frames (src)
  frameRate?: number; // Frames por segundo (default: 30)
  frameDelay?: number; // Tiempo mínimo entre cambios de frames en milisegundos (default: 500ms)
  swipeStep?: number; // Distancia en píxeles por frame en un swipe (default: 50px)
}

const FramePlayer: React.FC<FramePlayerProps> = ({
  frames,
  routes,
  frameRate = 30,
  frameDelay = 500,
  swipeStep = 50,
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null); // Coordenada Y inicial del touch
  const [touchDistance, setTouchDistance] = useState<number>(0); // Distancia acumulada en el swipe
  const [showModal, setShowModal] = useState(false); // Controla si la ventana modal se muestra
  const [currentFrames, setCurrentFrames] = useState<string[]>(frames); // Frames actuales

  const totalFrames = currentFrames.length;

  const updateFrame = (framesToMove: number) => {
    const newIndex = Math.max(0, Math.min(currentFrameIndex + framesToMove, totalFrames - 1));
    setCurrentFrameIndex(newIndex);

    // Mostrar modal si es el último frame
    if (newIndex === totalFrames - 1) {
      setShowModal(true);
    }
  };

  // Manejo de eventos táctiles
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartY(event.touches[0].clientY); // Captura la coordenada Y inicial
    setTouchDistance(0); // Reinicia la distancia acumulada
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY === null) return;

    const touchEndY = event.touches[0].clientY; // Coordenada Y actual
    const deltaY = touchStartY - touchEndY; // Diferencia desde el punto de inicio

    // Avanza o retrocede frames según la distancia acumulada
    if (Math.abs(deltaY) >= swipeStep) {
      const framesToMove = Math.floor(deltaY / swipeStep); // Calcula cuántos frames avanzar o retroceder
      updateFrame(framesToMove);

      setTouchStartY(touchEndY); // Reinicia el punto de inicio para continuar el swipe
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null); // Resetea el punto de inicio al terminar el toque
    setTouchDistance(0); // Resetea la distancia acumulada
  };

  // Añadir evento de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        updateFrame(-1);
      } else if (event.key === "ArrowDown") {
        updateFrame(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFrameIndex]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black"
    >
      <img
        src={currentFrames[currentFrameIndex]}
        alt={`Frame ${currentFrameIndex}`}
        className="w-full object-cover rounded-lg shadow-lg"
      />
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Ruta Finalizada</h2>
            <p className="text-gray-700 mb-4 text-center">Selecciona una nueva ruta para reproducir:</p>
            <ul className="space-y-2">
              {routes.map((option, index) => (
                <li key={index}>
                  <a
                    href={option.href}
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
      )} */}
    </div>
  );
};

export default FramePlayer;
