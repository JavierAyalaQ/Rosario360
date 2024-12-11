¡Entendido! Si prefieres una forma más sencilla de manejar el video y pasar el src del video como una prop al componente FramePlayer, puedes hacerlo directamente desde la página de Astro que renderiza este componente.

Paso 1: Definir el videoSrc en la página de Astro
Primero, definimos una constante en la página de Astro que contendrá el src del video que deseas pasar como prop al componente React.

Por ejemplo, en la página de Astro (.astro), puedes hacerlo de la siguiente manera:

astro
Copiar código
---
import FramePlayer from '../components/FramePlayer';

const routes = [
  {
    label: "Ruta 1",
    src: ['frame1.jpg', 'frame2.jpg', 'frame3.jpg'],
    href: '/ruta-1',
    video: 'path/to/video1.mp4', // Video para esta ruta
  },
  {
    label: "Ruta 2",
    src: ['frame4.jpg', 'frame5.jpg', 'frame6.jpg'],
    href: '/ruta-2',
    video: 'path/to/video2.mp4', // Video para esta ruta
  }
];

const initialFrames = ['frame1.jpg', 'frame2.jpg', 'frame3.jpg']; // Frames iniciales para la primera ruta
---

<FramePlayer frames={initialFrames} routes={routes} />
Paso 2: Recibir la prop video en el componente FramePlayer
En el componente React (FramePlayer.tsx), lo que puedes hacer es recibir la prop video a través de la estructura routes y pasarla al modal, de modo que solo se muestre el video correspondiente cuando se llegue al último frame.

No es necesario hacer grandes cambios en la lógica del componente, solo modificar cómo se maneja la propiedad video.

Aquí tienes el código actualizado para simplificarlo:

tsx
Copiar código
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
Explicación:
Prop video en routes: Se pasa directamente desde Astro, y se incluye en cada ruta como parte de la definición del objeto routes.
Estado selectedRoute: Guarda la ruta seleccionada, incluyendo su video.
Modal: Al mostrar el modal, se pasa el video de la ruta seleccionada, si está disponible. Si no hay video, no se muestra nada.
Ventajas:
Simplicidad: Solo pasas la ruta con el video como prop desde Astro. El componente FramePlayer recibe la lista de rutas y simplemente maneja la lógica de mostrar el video.
Centralización de la lógica: Todo lo relacionado con las rutas y videos se maneja de forma centralizada en la página Astro, lo que mantiene el componente más limpio.
Este enfoque es sencillo y debería funcionar perfectamente si solo deseas pasar un video basado en la ruta seleccionada.








