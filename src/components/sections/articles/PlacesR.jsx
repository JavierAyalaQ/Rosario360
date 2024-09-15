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
            <div className="flex flex-col gap-6">
                <h2 className="text-3xl xl:text-5xl font-bold text-green-900 dark:text-green-600 ml-8 mt-12 mb-2" >
                    Bienes de Interés Cultural
                </h2>
                <p className="text-xl">
                    Conoce los{" "}
                    <a href="#" className="font-semibold text-red-800 dark:text-red-500 hover:underline">
                        Bienes de Interés Cultural
                    </a>{" "}
                    de la nación ubicados en Villa del Rosario, declarados así mediante el Plan Estratégico de Mantenimiento del Patrimonio decreto 1500 de 2012.
                </p>
            </div>
            <div className="grid items-start justify-center grid-cols-1 gap-8 mx-auto mt-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
                {itemsToRender.map(({ key, name, description, image, href }) => (
                    <PlaceCardR
                        key={key}
                        name={name}
                        description={description}
                        image={image}
                        href={`/bic/${key}`}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center w-full mx-auto my-12">
                <button
                    onClick={loadMoreItems}
                    className="flex items-center px-4 py-2 text-sm font-medium text-center text-white transition-colors duration-200 bg-red-700 rounded-lg hover:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 w-max"
                >
                    {isExpanded ? "Mostrar menos" : "Mostrar más"} 
                    &nbsp;
                    <i className={isExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                </button>
            </div>
        </>
    );
};

export default PlacesR;
