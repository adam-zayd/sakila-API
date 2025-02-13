
import {useState, useEffect} from "react";
import {Movie} from "./PartialMovieCard";
import { Link } from "react-router";
import "./AllDisplay.css";


export default function AllMovies(){
    const [movies, setMovies]= useState<Movie[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/films")
            .then(response => response.json())
            .then(data => {setMovies(data);
            console.log(data);})
            
    }, []); 

    return (
        <div>
            <h2>All Movies</h2>
            <article className= "allMovies">
                {movies.map(movie => (<li className = "outer" key= {movie.id}>
                        <h3>
                            <Link className="movieTitle" to={`/films/${movie.id}`}>{movie.title}</Link>
                        </h3>
                        <p>Categories: {movie.categories.length>0? movie.categories.map(cat => <li className="movieCat"><Link className= "movieCatText" to={`/categories/${cat.categoryId}`}>{cat.name}</Link></li>): "Unknown"}</p>
                        <p>Stream on: {movie.streams.length>0? movie.streams.map(stream => <li className="movieStream"><Link className="movieStreamText" to={`/streams/${stream.serviceId}`}>{stream.name}</Link></li>) : "Unknown"}</p>
                    </li>
                ))}
            </article>
        </div>
    );
}