
export interface Language {
    id: number;
    name: string;
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
    language: Language;
    categories: Category[];
    streams: Stream[];
}
