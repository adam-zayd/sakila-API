

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
    categories: Category[];
    streams: Stream[];
}
