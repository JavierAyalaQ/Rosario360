export class Data {
    id: number;
    name: string;
    placeData?: PlaceData;

    constructor(id: number, name: string, placeData?: PlaceData) {
        this.id = id;
        this.name = name;
        this.placeData = placeData;
    }
}

    export interface PlaceData {
        location: string;
        description: string;
        image: string;
    }

const losOchoa = new Data(
    1,
    "Asadero Los Ochoa",
    {
        location: "Calle 7 #10-11 barrio Centro, Villa del Rosario",
        description: "A great place to eat",
        image: "https://images.unsplash.com/photo-1601737317921-1c5fe2e34431?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
)

console.log(Data)






const PLACES = [
    {
        id: 1,
        name: "Asadero Los Ochoa",
        placeData: {
            location: "Calle 7 #10-11 barrio Centro, Villa del Rosario",
            description: "A great place to eat",
            image: "https://images.unsplash.com/photo-1601737317921-1c5fe2e34431?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    },
    {
        id: 2,
        name: "Pastelería de la Rosa",
        placeData: {
            location: "Calle 13 #9-21 barrio Gramalote, Villa del Rosario",
            description: "A great place to pastel",
            image: "https://images.unsplash.com/photo-1582909184886-fad4767f7bdc?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    },
]