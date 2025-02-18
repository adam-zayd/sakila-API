
import {useState, useEffect} from "react";
import { Link, useParams } from "react-router";
import {Movie} from "./MovieCard";
import "./SpecificDisplay.css";
import {baseUrl} from "../../config.ts";

export default function SpecificMovie(){
    const {id}= useParams();
    const [movie, setMovie]= useState<Movie|null> (null);
    const [error, setError]= useState<Error|null> (null);
    const [loading, setLoading]= useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/films/${id}`)
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
        <div className="specificMovieContainer">
    {movie? (
        <>
            <h1 className="specificPageTitle">{movie.title}</h1>
            <p className="movieDescription"><strong>{movie.description}</strong></p>
            <p>Rating: {movie.rating}</p>
            <p>Language: {movie.language.name}</p>
            <p>Length: {Math.floor(movie.length/60)}h {movie.length%60}m</p>
            <p>Release Year: {movie.releaseYear}</p>
            <p className="buttonTitles">Categories:</p>
            <ul className="buttons">
                {movie.categories.length > 0 ? movie.categories.map(cat => (
                    <li className="attributeItem"><Link className= "attributeText" to={`/categories/${cat.categoryId}`}>{cat.name}</Link></li>
                )) : "Unknown"}
            </ul>
            <p className="buttonTitles">Stream on:</p>
            <ul className="buttons">
                {movie.streams.length > 0 ? movie.streams.map(stream => (
                    <li key={stream.name}>{stream.name}</li>
                )) : "Unknown"}
            </ul>
            <p className="buttonTitles">Actors:</p>
            <ul className="buttons">
                {movie.actors.length > 0 ? movie.actors.map(actor => (
                    <li key={actor.fullName}>{actor.fullName}</li>
                )) : "Unknown"}
            </ul>
        </>
    ) : (
        <p>FILM NOT FOUND</p>
    )}
    <div className="backButton">
        <a href="/films">Back to Movies</a>
    </div>
</div>

    );
}