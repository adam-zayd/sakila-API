import { useState, useEffect } from "react";
import { baseUrl } from "../../../config";
import { useNavigate, useParams } from "react-router";
import "../Buttons.css";
import "../SpecificDisplay.css";

export default function UpdateCategory() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [filmIds, setFilmIds] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${baseUrl}/categories/${id}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch Category data");
                }
                const data = await response.json();
                setName(data.name);
                setFilmIds(data.films.map((film: any) => String(film.filmId)));
            } catch (error: any) {
                alert(`Error: ${error.message}`);
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (name.trim().length === 0) {
            alert("Name cannot be empty.");
            return;
        }
        if (name.length > 25) {
            alert("Name must be between 1 and 25 characters.");
            return;
        }

        const parsedFilms = filmIds.length === 0 || (filmIds.length === 1 && filmIds[0] === "")? []:
        filmIds.map(id => Number(id.trim()));
        if (parsedFilms.some(isNaN)) {
            alert("One or more Film IDs are not valid numbers.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    films: parsedFilms
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update Category. Film ID/s may be invalid. Be sure not to have a comma at the end of your input.");
            }

            alert("Category updated successfully!");
            navigate(`/categories/${id}`);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this update? You will lose all changes.")) return;
        navigate(`/categories/${id}`);
    };

    return (    
        <div className="container">
            <h1 className="pageTitle">UPDATE CATEGORY</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
