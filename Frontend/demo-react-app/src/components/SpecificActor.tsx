import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Actor } from "./ActorCard";
import { baseUrl } from "../../config.ts";
import { Edit } from "lucide-react"; 

export default function SpecificActor() {
    const { id } = useParams();
    const [actor, setActor] = useState<Actor | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [currentFirstName, setCurrentFirstName] = useState("");
    const [currentLastName, setCurrentLastName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/actors/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`ERROR: ${response.status}`);
            })
            .then(data => {
                setActor(data);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setCurrentFirstName(data.firstName);
                setCurrentLastName(data.lastName);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this actor?")) return;

        try {
            const response = await fetch(`${baseUrl}/actors?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete actor");
            }

            alert("Actor deleted successfully!");
            navigate("/actors");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        if (firstName.length < 1 || firstName.length > 45 || lastName.length < 1 || lastName.length > 45) {
            alert("First and last name must be between 1 and 45 characters.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/actors/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName }),
            });

            if (!response.ok) {
                throw new Error("Failed to update actor");
            }

            setEditMode(false);
            alert("Actor updated successfully!");
            setCurrentFirstName(firstName);
            setCurrentLastName(lastName);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        setEditMode(false);
        setFirstName(currentFirstName);
        setLastName(currentLastName);
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }

    if (!actor) {
        return <h1>Actor failed to load</h1>;
    }

    return (
        <div>
            {actor ? (
                <ul>
                    <h3>
                        {editMode ? (
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                                maxLength={45} 
                            />
                        ) : (
                            <>
                                {firstName.toUpperCase()}
                                <Edit 
                                    size={20} 
                                    style={{ cursor: "pointer", marginLeft: "10px" }} 
                                    onClick={handleEdit} 
                                />
                            </>
                        )}
                    </h3>
                    <h3>
                        {editMode ? (
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value.toUpperCase())}
                                maxLength={45} 
                            />
                        ) : (
                            <>
                                {lastName.toUpperCase()}
                                <Edit 
                                    size={20} 
                                    style={{ cursor: "pointer", marginLeft: "10px" }} 
                                    onClick={handleEdit} 
                                />
                            </>
                        )}
                    </h3>
                    
                    {editMode && (
                        <div>
                        <button 
                            onClick={handleSave} 
                            style={{ backgroundColor: "green", color: "white", padding: "10px", border: "none", cursor: "pointer", marginTop: "10px" }}
                        >
                            SAVE
                        </button>
                        <button 
                                onClick={cancel} 
                                style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", cursor: "pointer", marginTop: "10px", marginLeft: "10px" }}
                            >
                                CANCEL
                            </button>
                        </div>
                    )}

                    <p>Films cast in: {actor.films.length > 0 ? actor.films.map(film => <li key={film.title}>{film.title}</li>) : "Unknown"}</p>
                    
                    <Link to={`/actors/${id}/update`}>
                        <button 
                            style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                        >
                            EDIT ALL
                        </button>
                    </Link>

                    <button 
                        onClick={handleDelete} 
                        style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        DELETE ACTOR
                    </button>
                </ul>
            ) : (
                <p>ACTOR NOT FOUND</p>
            )}
        </div>
    );
}
