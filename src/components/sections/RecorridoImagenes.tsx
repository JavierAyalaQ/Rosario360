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
  const [showModal, setShowModal] = useState(false); // Controla si la ventana modal se muestra
  const [selectedRoute, setSelectedRoute] = useState<{ label: string; video?: string } | null>(null); // Ruta seleccionada

  const totalFrames = frames.length;

  const updateFrame = (direction: number) => {
    const now = Date.now();

    if (now - lastFrameUpdate < frameDelay) {
      return;
    }

    const newIndex = Math.max(0, Math.min(currentFrameIndex + direction, totalFrames - 1));
    setCurrentFrameIndex(newIndex);
    setLastFrameUpdate(now);

    if (newIndex === totalFrames - 1) {
      setShowModal(true);
      setSelectedRoute(routes[0]); // Establecer la ruta seleccionada (puedes personalizar esto)
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFrameIndex, lastFrameUpdate]);

  return (
    <div
      onWheel={handleScroll}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black"
    >
      <img
        src={frames[currentFrameIndex]}
        alt={`Frame ${currentFrameIndex}`}
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />
      <p className="mt-4 text-white text-lg">
        Frame Actual: {currentFrameIndex + 1}/{totalFrames}
      </p>
      {showModal && selectedRoute && (
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
                    onClick={() => {
                      setSelectedRoute(option); // Actualizar la ruta seleccionada
                      setShowModal(false); // Cerrar el modal
                    }}
                  >
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
            {selectedRoute.video && (
              <div className="mt-4">
                <video controls className="w-full rounded-lg">
                  <source src={selectedRoute.video} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            )}
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
