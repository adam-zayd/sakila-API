import { useState, useEffect } from "react";
import { Streaming } from "../entityCards/PartialStreamingCard";
import { Link } from "react-router";
import "../AllDisplay.scss";
import { baseUrl } from "../../../config";
import designerImage from "/NewDesigner.jpg";


export default function AllStreams() {
    const [streams, setStreams] = useState<Streaming[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedStreams, setSelectedStreams] = useState<Set<number>>(new Set());


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

    const toggleSelection = (streamId: number) => {
        setSelectedStreams(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(streamId)) {
                newSelected.delete(streamId); 
            } else {
                newSelected.add(streamId);
            }
            return newSelected;
        });
    };

    const deleteSelectedStreams = () => {
        if (window.confirm("Are you sure you want to delete the selected streams?")) {
            const deleteRequests = Array.from(selectedStreams).map(streamId => 
                fetch(`${baseUrl}/streams?id=${streamId}`, {
                    method: "DELETE"
                })
            );
    
            Promise.all(deleteRequests)
                .then(responses => {
                    if (responses.some(response => !response.ok)) {
                        throw new Error("Failed to delete some streams");
                    }
                    return responses;
                })
                .then(() => {
                    setStreams(prevStreams => prevStreams.filter(streaming => !selectedStreams.has(streaming.id)));
                    setSelectedStreams(new Set());
                    alert("Selected streams have been deleted.");
                })
                .catch(error => {
                    console.error("Error deleting streams:", error);
                    alert("An error occurred while deleting streams.");
                });
        }
    };

    const resetSelectedStreams = () => {
        if (window.confirm("Are you sure you want to deselect all streams?")) {
        setSelectedStreams(new Set());
        }
    };

    return (
        <div className="allContainer">
            <h1 className="pageTitle">All Streams</h1>
            <div className="fullPageContainer">
                <button className="createButton">
                    <Link className="createLink" to="/streams/create">CREATE STREAM</Link>
                </button>
                <button className="createButton">
                    <Link className="createLink" to="/streams/search">SEARCH STREAMING PLATFORMS</Link>
                </button>
            </div>

            {selectedStreams.size > 0 && (
                <>
                <div className="fixedButtonsContainer">
                        <button className="deleteButton" onClick={deleteSelectedStreams}>
                            Delete All Selected
                        </button>
                        <button className="resetButton" onClick={resetSelectedStreams}>
                            Reset Selected
                        </button>
                    </div>
                </>
            )}

            {loading ? ( 
                <div className="loading">
                    <img 
                        className="spinner"
                        src={designerImage} 
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
                <article className="allStreams">
                    {streams.map(streaming => (
                        <li className="individuals" key={streaming.id}>
                            <input
                                type="checkbox"
                                checked={selectedStreams.has(streaming.id)}
                                onChange={() => toggleSelection(streaming.id)}
                            />
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
