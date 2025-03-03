import { useState } from "react";
import { baseUrl } from "../../config";
import { useNavigate } from "react-router";
import "./Buttons.css";

export default function CreateMovie() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [length, setLength] = useState("");
    const [rating, setRating] = useState("");
    const [language, setLanguage] = useState("");
    const [cast, setCast] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [streams, setStreams] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (title.trim().length === 0) {
            alert("Title cannot be empty.");
            return;
        }
        if (title.length > 128) {
            alert("Title must be between 1 and 128 characters.");
            return;
        }

        if (releaseYear.trim().length > 0) {
            if (!/^\d{4}$/.test(releaseYear.trim())) {
                alert("Release Year must be a four-digit number.");
                return;
            }
        }

        const parsedActors = cast.map(id => Number(id.trim()));
        if (parsedActors.some(isNaN)){
            alert("One or more Actor-IDs are not valid numbers.");
            return;
        }

        const parsedCategories = categories.map(id => Number(id.trim()));
        if (parsedCategories.some(isNaN)){
            alert("One or more Category-IDs are not valid numbers.");
            return;
        }

        const parsedStreams = streams.map(id => Number(id.trim()));
        if (parsedStreams.some(isNaN)){
            alert("One or more Stream-IDs are not valid numbers.");
            return;
        }

        try {
            const requestBody: any = { title, language: { id: language }, cast: parsedActors, categories: parsedCategories, streams: parsedStreams};

            if (description.trim() !== "") requestBody.description = description;
            if (releaseYear.trim() !== "") requestBody.releaseYear = releaseYear;
            if (length.trim() !== "") requestBody.length = length;
            if (rating.trim() !== "") requestBody.rating = rating;
            
            const response = await fetch(`${baseUrl}/films`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create Film. Language/Actor/Category/Stream ID/s may be invalid.");
            }

            alert("Movie created successfully!");
            navigate("/films");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this create? You will lose all changes.")) return;
        navigate("/films");
    };

    return (
        <div>
            <h1>CREATE MOVIE</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        className= "titleInput"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    className= "descriptionInput"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label>Release Year:</label>
                    <input
                    className= "releaseYearInput"
                        type="text"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label>Length:</label>
                    <input
                    className= "lengthInput"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        min= "1"
                        max="65535"
                    />
                </div>

                <div>
                    <label>Rating:</label>
                    <select
                        className="ratingInput"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="">Select a rating</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                        <option value="">None</option>
                    </select>
                </div>

                <div>
                    <label>Language:</label>
                    <input
                    className= "languageInput"
                        type="number"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label>Cast (Actor-IDs, comma-separated):</label>
                    <input
                    className= "castInput"
                        type="text"
                        value={cast}
                        onChange={(e) => setCast(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>
                <div>
                    <label>Categories (Category-IDs, comma-separated):</label>
                    <input
                    className= "categoriesInput"
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>
                <div>
                    <label>Streams (Stream-IDs, comma-separated):</label>
                    <input
                    className= "streamsInput"
                        type="text"
                        value={streams}
                        onChange={(e) => setStreams(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>

                <button type="submit" className= "saveButton">SAVE</button>
                <button type="button" className="cancelButton" onClick={cancel}>CANCEL</button>
            </form>
        </div>
    );
}
