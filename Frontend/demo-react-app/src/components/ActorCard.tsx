
export interface Movie{
    id: number;
    title: string;
}

export interface Actor{
    id: number; 
    fullName: string;
    films: Movie[];
}
