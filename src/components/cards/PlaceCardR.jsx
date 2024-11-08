import React from "react";

const PlaceCard = ({ key, name, description, image, href }) => {
    return (
        <article
            key={key}
            className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <a href={href}>
                <img
                    className="rounded-t-lg object-cover max-w-full aspect-video"
                    src={image}
                    alt={`Fotografía de ${name}, uno de los Bienes de Interés Cultural ubicado en Villa del Rosario`}
                    style={{ viewTransitionName: `img-${key}` }}
                />
            </a>
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
                    className="text-sm font-medium text-gray-600 transition-all hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white
                    translate-x-6 ml-2"
                    data-astro-prefetch=""
                    target="_blank"
                >
                    Conocer mas
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </a>
            </div>
        </article>
    );
};

export default PlaceCard;
