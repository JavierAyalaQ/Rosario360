import React from "react";

const PlaceCard = ({ name, description, image, href }) => {
    return (
        <article
            className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <a href={href}>
                <img
                    className="rounded-t-lg object-cover max-w-full aspect-video"
                    src={image}
                    alt={`Fotografía de ${name}, ubicado en Villa del Rosario`}
                />
            </a>
            <div className="p-5">
                <a href={href}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-neutral-100">
                        {name}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4 text-ellipsis">
                    {description}
                </p>
                <a
                    href={href}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg transition-colors duration-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Ver más
                    <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                </a>
            </div>
        </article>
    );
};

export default PlaceCard;
