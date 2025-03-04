
export interface Movie{
    filmId: any;
    id: number;
    title: string;
}

export interface Category{
    id: number; 
    name: string;
    films: Movie[];
}
