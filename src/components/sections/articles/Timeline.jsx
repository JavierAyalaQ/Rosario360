import { useState } from "react"

const FESTIVITIES = [
    {
        id: 1,
        name: "Fiesta de la virgen",
        date: "24 de Septiembre de 2024",
        desc: "Fiesta de la Virgen de la Merced, con comida y bebidas"
    },
    {
        id: 2,
        name: "Feria de la Uva",
        date: "19 de Octubre de 2024",
        desc: "La feria mas popular de la ciudad de Villa del Rosario"
    },
]




export const Timeline = () => {
    
    const [isFollowing, setIsFollowing] = useState(false)
    const text = isFollowing ? "Eliminar" : "Añadir";
    const classes = isFollowing ? "bg-red-600 hover:bg-red-800 active:ring-red-200" : "bg-blue-600 hover:bg-blue-800 active:ring-blue-200";
    const handleClick = () => {
        setIsFollowing(!isFollowing);
    };
    
    return (
        <div>
            <div className="max-w-lg mx-auto px-4 mt-24 grid place-content-center ">
                <button onClick={handleClick} className={`flex items-center justify-center w-max py-2 px-4 rounded-lg hover:bg:red-600 text-white transition-colors active:ring ${classes}`}>
                    {text}&nbsp;
                    <i className={`fa-solid ${isFollowing ? "fa-close" : "fa-plus"}`}></i>
                </button>
            </div>
        <ol className="flex flex-col gap-8 list-none my-32">
            {FESTIVITIES.map(({id, name, date, desc}) => (
                <li 
                    key={id}
                    className="flex flex-row gap-8 w-full"
                    >
                    <div className="flex flex-col justify-center items-center">
                        <button
                            className="bg-blue-600 w-max h-max rounded-full border border-blue-800 flex justify-center items-center p-2 aspect-square hover:bg-blue-800 box-border">
                            <i className={`fa-solid fa-check text-white text-md`}></i>
                        </button>
                        <div className="w-[2px] h-full bg-black/10"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 ml-8 rounded-lg shadow-md border-gray-200 pt-6 relative grow-1 w-full max-w-[600px]">
                        <span className="absolute top-[-1rem] left-[-1rem] text-white text-sm bg-green-600 w-[26ch] flex justify-start items-center px-4 py-2 rounded-sm">
                            <i className="fa-solid fa-calendar-days"></i>
                            &nbsp;{date}
                        </span>
                        <h3 className="text-xl font-bold">
                            {name}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            {desc}
                        </p>
                    </div>
                </li>
                ))
            }
        </ol>
        </div>
    )
}