import { useState, useEffect } from "react";
import { Streaming } from "../entityCards/PartialStreamingCard";
import { Link } from "react-router";
import "../AllDisplay.scss";
import "../Search.css";
import { baseUrl } from "../../../config";

export default function SearchStreams() {
    const [streams, setStreams] = useState<Streaming[]>([]);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (query.length < 2) { 
            setStreams([]);
            return;
        }

        fetch(`${baseUrl}/streams?name=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setStreams(data);
            })
            .catch(() => {
                setStreams([]);
            });
    }, [query]);

    return (
        <div className="container">
            <h1 className="pageTitle">SEARCH STREAMS</h1>

            <input
                type="text"
                className="searchInput"
                placeholder="Search streams by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

        
                <ul className="searchResults">
                    {streams.length > 0 ? (
                        streams.map(streaming => (
                            <li className="individuals" key={streaming.id}>
                                <h3>
                                    <Link className="name" to={`/streams/${streaming.id}`}>
                                        {streaming.name}
                                    </Link>
                                </h3>
                            </li>
                        ))
                    ) : (
                        query.length > 1 && <p className="noResults">No streams found.</p>
                    )}
                </ul>
        </div>
    );
}
