
import {useState, useEffect} from "react";
import {Movie} from "./PartialMovieCard";
import { Link } from "react-router";
import "./AllDisplay.css";
import { baseUrl } from "../../config";


export default function AllMovies(){
    const [movies, setMovies]= useState<Movie[]>([]);

    useEffect(() => {
        fetch(`${baseUrl}/films`)
            .then(response => response.json())
            .then(data => {setMovies(data);})
            
    }, []); 

    return (
        <div>
            <h1 className="pageTitle">All Movies</h1>
            <article className= "allMovies">
                {movies.map(movie => (<li className = "individuals" key= {movie.id}>
                        <h3>
                            <Link className="name" to={`/films/${movie.id}`}>{movie.title}</Link>
                        </h3>
                        <p>Categories: {movie.categories.length>0? movie.categories.map(cat => <li className="attributeItem"><Link className= "attributeText" to={`/categories/${cat.categoryId}`}>{cat.name}</Link></li>): "Unknown"}</p>
                        <p>Stream on: {movie.streams.length>0? movie.streams.map(stream => <li className="attributeItem"><Link className="attributeText" to={`/streams/${stream.serviceId}`}>{stream.name}</Link></li>) : "Unknown"}</p>
                    </li>
                ))}
            </article>
        </div>
    );
}