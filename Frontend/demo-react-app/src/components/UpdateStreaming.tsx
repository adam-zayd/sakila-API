import { useState, useEffect } from "react";
import { baseUrl } from "../../config";
import { useNavigate, useParams } from "react-router";
import "./Buttons.css";

export default function UpdateStreaming() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [cost, setCost] = useState("");
    const [filmIds, setFilmIds] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStreaming = async () => {
            try {
                const response = await fetch(`${baseUrl}/streams/${id}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch Stream data");
                }
                const data = await response.json();
                setName(data.name);
                setWebsite(data.website);
                setCost(data.cost);
                setFilmIds(data.films.map((film: any) => String(film.filmId)));
            } catch (error: any) {
                alert(`Error: ${error.message}`);
            }
        };
        fetchStreaming();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (name.trim().length === 0 || website.trim().length === 0) {
            alert("Name and Website cannot be empty.");
            return;
        }
        if (name.length > 45 || website.length > 255) {
            alert("Name must be between 1 and 45 characters. Website must be between 1 and 255 characters.");
            return;
        }

        if (cost && !/^\d{1,3}(\.\d{1,2})?$/.test(cost.trim())) {
            alert("Cost can only have up to 3 digits before and up to 2 digits after the decimal.");
            return;
        }

        const parsedFilms = filmIds.length === 0 || (filmIds.length === 1 && filmIds[0] === "")? []:
        filmIds.map(id => Number(id.trim()));
        if (parsedFilms.some(isNaN)) {
            alert("One or more Film IDs are not valid numbers.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/streams/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    website,
                    cost,
                    films: parsedFilms
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update Stream. Film ID/s may be invalid. Be sure not to have a comma at the end of your input.");
            }

            alert("Stream updated successfully!");
            navigate(`/streams/${id}`);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this update? You will lose all changes.")) return;
        navigate(`/streams/${id}`);
    };

    return (
        <div>
            <h1 className="pageTitle">UPDATE STREAM</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Website:</label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cost:</label>
                    <input
                        type="text"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Film IDs (comma-separated):</label>
                    <input
                        type="text"
                        value={filmIds.join(",")}
                        onChange={(e) => setFilmIds(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>
                <button type="submit" className= "saveButton" onClick={handleSubmit}>SAVE</button>
                <button type="button" className= "cancelButton" onClick={cancel}>CANCEL</button>
            </form>
        </div>
    );
}
