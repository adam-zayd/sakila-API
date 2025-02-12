
import {useState, useEffect} from "react";
import {Movie} from "./MovieCard";


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
                        <p>{movie.description}</p><p>Release Year: {movie.releaseYear}</p><p>Rating: {movie.rating}</p><p>Language: {movie.language.name}</p><p>Length: {movie.length} minutes</p>
                        <p>Categories: {movie.categories.length>0? movie.categories.map(cat => <li>{cat.name}</li>): "Unknown"}</p>
                        <p>Stream on: {movie.streams.length>0? movie.streams.map(stream => <li>{stream.name}</li>) : "Unknown"}</p>
                        <p>Actors: {movie.actors.length>0? movie.actors.map(actor => <li>{actor.fullName}</li>): "Unknown"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}