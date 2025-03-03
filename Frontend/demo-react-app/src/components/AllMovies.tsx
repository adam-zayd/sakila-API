import { useState, useEffect } from "react";
import { Movie } from "./PartialMovieCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";


export default function AllMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetch(`${baseUrl}/films`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                setMovies([]);
                setLoading(false); 
            });
    }, []);

    const toggleSelection = (filmId: number) => {
        setSelectedMovies(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(filmId)) {
                newSelected.delete(filmId); 
            } else {
                newSelected.add(filmId);
            }
            return newSelected;
        });
    };

    const deleteSelectedMovies = () => {
        if (window.confirm("Are you sure you want to delete the selected movies?")) {
            const deleteRequests = Array.from(selectedMovies).map(filmId => 
                fetch(`${baseUrl}/films?id=${filmId}`, {
                    method: "DELETE"
                })
            );
    
            Promise.all(deleteRequests)
                .then(responses => {
                    if (responses.some(response => !response.ok)) {
                        throw new Error("Failed to delete some movies");
                    }
                    return responses;
                })
                .then(() => {
                    setMovies(prevMovies => prevMovies.filter(movie => !selectedMovies.has(movie.id)));
                    setSelectedMovies(new Set());
                    alert("Selected movies have been deleted.");
                })
                .catch(error => {
                    console.error("Error deleting movies:", error);
                    alert("An error occurred while deleting movies.");
                });
        }
    };

    const resetSelectedMovies = () => {
        if (window.confirm("Are you sure you want to deselect all movies?")) {
        setSelectedMovies(new Set());
        }
    };

    return (
        <div>
            <h1 className="pageTitle">ALL MOVIES</h1>

            <div className="fullPageContainer">
                <button className="createButton">
                    <Link className="createLink" to="/films/create">CREATE MOVIE</Link>
                </button>
            </div>

            {selectedMovies.size > 0 && (
                <>
                <div className="fixedButtonsContainer">
                        <button className="deleteButton" onClick={deleteSelectedMovies}>
                            Delete All Selected
                        </button>
                        <button className="resetButton" onClick={resetSelectedMovies}>
                            Reset Selected
                        </button>
                    </div>
                </>
            )}

            {loading ? ( 
                <div className="loading">
                    <img 
                        className="spinner"
                        src="src\assets\Designer.jpeg" 
                        alt="Loading Icon" 
                        style={{ width: '200px', height: '200px', marginTop: '60px', marginLeft: '665px' }} 
                    />
                <div className="loading-text">
                    <span className="loading-text-words">L</span>
                    <span className="loading-text-words">O</span>
                    <span className="loading-text-words">A</span>
                    <span className="loading-text-words">D</span>
                    <span className="loading-text-words">I</span>
                    <span className="loading-text-words">N</span>
                    <span className="loading-text-words">G</span>
                </div>
            </div>
            ) : (
                <article className="allMovies">
                    {movies.map(movie => (
                        <li className="individuals" key={movie.id}>
                            <input
                                type="checkbox"
                                checked={selectedMovies.has(movie.id)}
                                onChange={() => toggleSelection(movie.id)}
                            />
                            <h3>
                                <Link className="name" to={`/films/${movie.id}`}>
                                    {movie.title}
                                </Link>
                            </h3>
                            <p>
                                Categories:{" "}
                                {movie.categories.length > 0
                                    ? movie.categories.map(cat => (
                                          <li className="attributeItem" key={cat.categoryId}>
                                              <Link className="attributeText" to={`/categories/${cat.categoryId}`}>
                                                  {cat.name}
                                              </Link>
                                          </li>
                                      ))
                                    : "Unknown"}
                            </p>
                            <p>
                                Stream on:{" "}
                                {movie.streams.length > 0
                                    ? movie.streams.map(stream => (
                                          <li className="attributeItem" key={stream.serviceId}>
                                              <Link className="attributeText" to={`/streams/${stream.serviceId}`}>
                                                  {stream.name}
                                              </Link>
                                          </li>
                                      ))
                                    : "Unknown"}
                            </p>
                        
                        </li>
                    ))}
                </article>
            )}
        </div>
    );
}
