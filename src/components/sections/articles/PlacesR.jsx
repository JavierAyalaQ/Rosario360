import { useState } from "react";
import placesData from "../../../data/placesData.json";
import PlaceCardR from "../../cards/PlaceCardR.jsx";

const PlacesR = () => {
    const initialItems = 6;
    const [visibleItems, setVisibleItems] = useState(initialItems);
    const [isExpanded, setIsExpanded] = useState(false);

    const loadMoreItems = () => {
        if (isExpanded) {
            setVisibleItems(initialItems);
            setIsExpanded(false);
        } else {
            setVisibleItems(placesData.length);
            setIsExpanded(true);
        }
    };

    const itemsToRender = placesData.slice(0, visibleItems);

    return (
        <>
            <div className="mb-10 flex flex-col gap-8">
                <p className="text-xl">
                    Conoce los{" "}
                    <a href="#" className="text-red-800 dark:text-red-500 font-semibold hover:underline">
                        Bienes de Interés Cultural
                    </a>{" "}
                    de la nación ubicados en Villa del Rosario, declarados así mediante el Plan Estratégico de Mantenimiento del Patrimonio decreto 1500 de 2012.
                </p>
                <button
                    onClick={loadMoreItems}
                    className="flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg transition-colors duration-200 hover:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 w-max"
                >
                    {isExpanded ? "Ver Menos" : "Ver Todos"}
                    &nbsp;
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-start mx-auto mt-12">
                {itemsToRender.map(({ key, name, description, image, href }) => (
                    <PlaceCardR
                        key={key}
                        name={name}
                        description={description}
                        image={image}
                        href={key}
                    />
                ))}
            </div>
            {isExpanded && (
                <div className="w-full mx-auto mt-12 flex justify-center items-center">
                    <button onClick={loadMoreItems}
                        className="flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg transition-colors duration-200 hover:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 w-max"
                        >
                        Ver Menos&nbsp;
                        <i className="fa-solid fa-chevron-up"></i>
                    </button>
                </div>
            )}
        </>
    );
};

export default PlacesR;
