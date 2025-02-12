
import {useState, useEffect} from "react";
import {Movie} from "./PartialMovieCard";


export default function AllMovies(){
    const [movies, setMovies]= useState<Movie[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/films")
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);

    return (
        <div>
            <h2>All Movies</h2>
            <ul>
                {movies.map(movie => (<li key= {movie.id}>
                        <h3>{movie.title}</h3>
                        <p>Language: {movie.language.name}</p>
                        <p>Categories: {movie.categories.length>0? movie.categories.map(cat => <li>{cat.name}</li>): "Unknown"}</p>
                        <p>Stream on: {movie.streams.length>0? movie.streams.map(stream => <li>{stream.name}</li>) : "Unknown"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}