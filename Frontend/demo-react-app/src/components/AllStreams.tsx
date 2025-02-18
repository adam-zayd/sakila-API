import { useState, useEffect } from "react";
import { Streaming } from "./PartialStreamingCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";

export default function AllStreams() {
    const [streams, setStreams] = useState<Streaming[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${baseUrl}/streams`)
            .then(response => response.json())
            .then(data => {
                setStreams(data);
                setLoading(false);
            })
            .catch(() => {
                setStreams([]);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="pageTitle">All Streams</h1>

            <button className="createButton">
                <Link to="/streams/create">CREATE STREAM</Link>
            </button>

            {loading ? (
                <div className="loading">
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
                <article className="allStreams">
                    {streams.map(streaming => (
                        <li className="individuals" key={streaming.id}>
                            <h3>
                                <Link className="name" to={`/streams/${streaming.id}`}>
                                    {streaming.name}
                                </Link>
                            </h3>
                        </li>
                    ))}
                </article>
            )}
        </div>
    );
}
