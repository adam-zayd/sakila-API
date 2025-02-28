import { useState, useEffect } from "react";
import { Actor } from "./PartialActorCard";
import { Link } from "react-router";
import "./AllDisplay.scss";
import { baseUrl } from "../../config";

export default function AllActors() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedActors, setSelectedActors] = useState<Set<number>>(new Set());

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

    const toggleSelection = (actorId: number) => {
        setSelectedActors(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(actorId)) {
                newSelected.delete(actorId); // Deselect the actor
            } else {
                newSelected.add(actorId); // Select the actor
            }
            return newSelected;
        });
    };

    const deleteSelectedActors = () => {
        const newActors = actors.filter(actor => !selectedActors.has(actor.id));
        setActors(newActors);
        setSelectedActors(new Set()); // Reset selection after deletion
    };

    return (
        <div>
            <h1 className="pageTitle">All Actors</h1>

            <button className="createButton">
                <Link className="createActorLink" to="/actors/create">CREATE ACTOR</Link>
            </button>

            {selectedActors.size > 0 && (
                <button className="deleteButton" onClick={deleteSelectedActors}>
                    Delete All Selected
                </button>
            )}


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
                            <input
                                type="checkbox"
                                checked={selectedActors.has(actor.id)}
                                onChange={() => toggleSelection(actor.id)}
                            />
                        </li>
                    ))}
                </article>
            )}
        </div>
    );
}
