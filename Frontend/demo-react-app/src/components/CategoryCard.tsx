
export interface Movie{
    id: number;
    title: string;
}

export interface Category{
    id: number; 
    name: string;
    films: Movie[];
}
