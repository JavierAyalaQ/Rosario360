import { useState } from "react";
import placesData from "@data/placesData.json";
import PlaceCardR from "@components/cards/PlaceCardR.jsx";

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
            <div className="flex flex-col">
                <h2 className="text-3xl xl:text-5xl font-bold text-green-950 dark:text-green-600 ml-8 mt-32 mb-6" >
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
                {itemsToRender.map(({ key, slug, name, description, image, href }) => (
                    <PlaceCardR
                        key={key}
                        name={name}
                        description={description}
                        image={image}
                        href={`/bic/${slug}`}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center w-full mx-auto mt-20 mb-32">
                <button
                    onClick={loadMoreItems}
                    className="flex items-center px-6 py-3 text-xl font-semibold w-max transition-colors rounded outline-none focus:ring-4 ring-red-200 text-red-50 bg-red-600 hover:bg-red-800"
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
