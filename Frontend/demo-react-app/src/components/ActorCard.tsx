
export interface Movie{
    filmId: number;
    title: string;
}

export interface Actor{
    id: number; 
    fullName: string;
    films: Movie[];
}
