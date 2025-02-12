
import {useState, useEffect} from "react";
import {Movie} from "./MovieCard";


export default function SpecificMovie(){
    const [movie, setMovie]= useState<Movie|null>(null);

    useEffect(() => {
        const id: number = 0;
        fetch(`http://localhost:8080/films/${id}`)
        .then(response => {if (response.ok){
            return response.json();
            }
            throw new Error("Movie not found");
        })
        .then(data => setMovie(data))
        .catch(_error => setMovie(null));
}, []);

    return(
        <div>
            {movie?(
                <ul>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p><p>Release Year: {movie.releaseYear}</p><p>Rating: {movie.rating}</p><p>Language: {movie.language.name}</p><p>Length: {movie.length} minutes</p>
                    <p>Categories: {movie.categories.length>0? movie.categories.map(cat => <li key={cat.name}>{cat.name}</li>) : "Unknown"}</p>
                    <p>Stream on: {movie.streams.length>0? movie.streams.map(stream => <li key={stream.name}>{stream.name}</li>) : "Unknown"}</p>
                    <p>Actors: {movie.actors.length>0? movie.actors.map(actor => <li key={actor.fullName}>{actor.fullName}</li>) : "Unknown"}</p>
                </ul>
            ) : (
                <p>FILM NOT FOUND</p>
            )}
        </div>
    );
}