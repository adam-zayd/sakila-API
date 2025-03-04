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
                newSelected.delete(actorId); 
            } else {
                newSelected.add(actorId); 
            }
            return newSelected;
        });
    };

    const deleteSelectedActors = () => {
        if (window.confirm("Are you sure you want to delete the selected actors?")) {
            const deleteRequests = Array.from(selectedActors).map(actorId => 
                fetch(`${baseUrl}/actors?id=${actorId}`, {
                    method: "DELETE"
                })
            );
    
            Promise.all(deleteRequests)
                .then(responses => {
                    if (responses.some(response => !response.ok)) {
                        throw new Error("Failed to delete some actors");
                    }
                    return responses;
                })
                .then(() => {
                    setActors(prevActors => prevActors.filter(actor => !selectedActors.has(actor.id)));
                    setSelectedActors(new Set());
                    alert("Selected actors have been deleted.");
                })
                .catch(error => {
                    console.error("Error deleting actors:", error);
                    alert("An error occurred while deleting actors.");
                });
        }
    };

    const resetSelectedActors = () => {
        if (window.confirm("Are you sure you want to deselect all actors?")) {
        setSelectedActors(new Set());
        }
    };

    return (
        <div className="allContainer">
            <h1 className="pageTitle">ALL ACTORS</h1>

            <div className="fullPageContainer">
    <button className="createButton">
        <Link className="createLink" to="/actors/create">CREATE ACTOR</Link>
    </button>
</div>

            {selectedActors.size > 0 && (
                <>
                <div className="fixedButtonsContainer">
                        <button className="deleteButton" onClick={deleteSelectedActors}>
                            Delete All Selected
                        </button>
                        <button className="resetButton" onClick={resetSelectedActors}>
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
                <article className="allActors">
                    {actors.map(actor => (
                        <li className="individuals" key={actor.id}>
                            <input
                                type="checkbox"
                                checked={selectedActors.has(actor.id)}
                                onChange={() => toggleSelection(actor.id)}
                            />
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
