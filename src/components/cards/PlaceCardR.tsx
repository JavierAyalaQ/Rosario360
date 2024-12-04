import React from "react";
import HoverImage from "@components/cards/HoverImage.tsx";

export interface PlaceCardProps {
    id: number;
    name: string;
    description: string;
    image: string;
    href?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ id, name, description, image, href } ) => {
    return (
        <article
            className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <HoverImage 
                icon="fa-solid fa-location"
                href={href}
                transition={`bic-${id}`}
                image={image}
                alt={`Fotografía de ${name}, uno de los Bienes de Interés Cultural ubicado en Villa del Rosario`}
                titleTag={name}
            />
            <div className="p-5">
                <a href={href}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-neutral-100 md:truncate"
                    title={name}
                    >
                        {name}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4 text-ellipsis">
                    {description}
                </p>
                <a
                    href={href}
                    className="text-sm font-medium text-gray-600 transition-all duration-300 hover:ml-6 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white
                    translate-x-6 ml-2"
                    data-astro-prefetch=""
                >
                    Conocer mas
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </a>
            </div>
        </article>
    );
};

export default PlaceCard;
