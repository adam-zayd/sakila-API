
import {useState, useEffect} from "react";
import { useParams } from "react-router";
import {Movie} from "./MovieCard";

export default function SpecificMovie(){
    const {id} = useParams();
    const [movie, setMovie] = useState<Movie|null> (null);
    const [error, setError] = useState<Error|null> (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/films/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(setMovie)
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error.message}</h1>
    }

    if(!movie){
        return <h1>Movie failed to load</h1>
    }

    return(
        <div>
            {movie?(
                <ul>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p><p>Release Year: {movie.releaseYear}</p><p>Rating: {movie.rating}</p><p>Language: {movie.language.name}</p><p>Length: {Math.floor(movie.length / 60)}h {movie.length % 60}m</p>
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