import { useState, useEffect } from "react";
import { Movie } from "../entityCards/PartialMovieCard";
import { Link } from "react-router";
import "../AllDisplay.scss";
import "../Search.css";
import { baseUrl } from "../../../config";

export default function SearchMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (query.length < 2) { 
            setMovies([]);
            return;
        }

        fetch(`${baseUrl}/films?title=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data);
            })
            .catch(() => {
                setMovies([]);
            });
    }, [query]);

    return (
        <div className="container">
            <h1 className="pageTitle">SEARCH MOVIES</h1>

            <input
                type="text"
                className="searchInput"
                placeholder="Search movies by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

        
                <ul className="searchResults">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <li className="individuals" key={movie.filmId}>
                                <h3>
                                    <Link className="name" to={`/films/${movie.id}`}>
                                        {movie.title}
                                    </Link>
                                </h3>
                            </li>
                        ))
                    ) : (
                        query.length > 1 && <p className="noResults">No movies found.</p>
                    )}
                </ul>
           
        </div>
    );
}
