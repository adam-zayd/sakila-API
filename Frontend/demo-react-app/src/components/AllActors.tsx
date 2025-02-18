import { useState, useEffect } from "react";
import { Actor } from "./PartialActorCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";

export default function AllActors() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${baseUrl}/actors`)
            .then(response => response.json())
            .then(data => {
                setActors(data);
                setLoading(false);
            })
            .catch(() => {
                setActors([]);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="pageTitle">All Actors</h1>

            <button className="createButton">
                <Link to="/actors/create">CREATE ACTOR</Link>
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
                <article className="allActors">
                    {actors.map(actor => (
                        <li className="individuals" key={actor.id}>
                            <h3>
                                <Link className="name" to={`/actors/${actor.id}`}>
                                    {actor.fullName}
                                </Link>
                            </h3>
                        </li>
                    ))}
                </article>
            )}
        </div>
    );
}
