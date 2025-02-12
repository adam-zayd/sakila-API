
export interface Language {
    id: number;
    name: string;
}

export interface Actor {
    actorId: number;
    fullName: string;
}

export interface Category {
    categoryId: number;
    name: string;
}

export interface Stream {
    serviceId: number;
    name: string;
}

export interface Movie {
    id: number; 
    title: string;
    description: string;
    releaseYear: string;
    length: number;
    rating: string;
    language: Language;
    actors: Actor[];
    categories: Category[];
    streams: Stream[];
}
