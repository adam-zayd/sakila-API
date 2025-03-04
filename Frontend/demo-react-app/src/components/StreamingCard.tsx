
export interface Movie{
    filmId: any;
    id: number;
    title: string;
}

export interface Streaming{
    id: number; 
    name: string;
    website: string;
    cost: number
    films: Movie[];
}
