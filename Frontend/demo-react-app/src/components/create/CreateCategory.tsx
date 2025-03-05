import { useState } from "react";
import { baseUrl } from "../../../config";
import { useNavigate } from "react-router";
import "../Buttons.css";

export default function CreateCategory() {
    const [name, setName] = useState("");
    const [filmIds, setFilmIds] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (name.trim().length === 0){
            alert("Name cannot be empty.");
            return;
        }
        if (name.length > 25) {
            alert("Name must be between 1 and 25 characters.");
            return;
        }

        const parsedFilms = filmIds.map(id => Number(id.trim()));
        if (parsedFilms.some(isNaN)) {
            alert("One or more Film IDs are not valid numbers.");
            return;
        }


        try {
            console.log(parsedFilms);
        
            const response = await fetch(`${baseUrl}/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    films: parsedFilms
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create category. Film ID/s may be invalid.");
            }

            alert("Category created successfully!");
            navigate("/categories");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this create? You will lose all changes.")) return;
        navigate("/categories");
    };

    return (
        <div className="container">
            <h1 className="pageTitle">CREATE CATEGORY</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        className= "categoryNameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Film IDs (comma-separated):</label>
                    <input
                    className= "filmsInput"
                        type="text"
                        value={filmIds}
                        onChange={(e) => setFilmIds(e.target.value.split(",").map(id => id.trim()))}
 
                    />
                </div>
                <button type="submit" className= "saveButton" onClick={handleSubmit}>SAVE</button>
                <button type="button" className="cancelButton" onClick={cancel}>CANCEL</button>
            </form>
        </div>
    );
}
