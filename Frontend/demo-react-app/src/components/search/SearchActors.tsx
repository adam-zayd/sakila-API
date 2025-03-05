import { useState, useEffect } from "react";
import { Actor } from "../entityCards/PartialActorCard";
import { Link } from "react-router";
import "../AllDisplay.scss";
import "../Search.css";
import { baseUrl } from "../../../config";

export default function SearchActors() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (query.length < 2) { 
            setActors([]);
            return;
        }

        fetch(`${baseUrl}/actors?name=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setActors(data);
            })
            .catch(() => {
                setActors([]);
            });
    }, [query]);

    return (
        <div className="container">
            <h1 className="pageTitle">SEARCH ACTORS</h1>

            <input
                type="text"
                className="searchInput"
                placeholder="Search actors by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

        
                <ul className="searchResults">
                    {actors.length > 0 ? (
                        actors.map(actor => (
                            <li className="individuals" key={actor.id}>
                                <h3>
                                    <Link className="name" to={`/actors/${actor.id}`}>
                                        {actor.fullName}
                                    </Link>
                                </h3>
                            </li>
                        ))
                    ) : (
                        query.length > 1 && <p className="noResults">No actors found.</p>
                    )}
                </ul>
           
        </div>
    );
}
