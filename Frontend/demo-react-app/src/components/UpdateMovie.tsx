import { useState, useEffect } from "react";
import { baseUrl } from "../../config";
import { useNavigate, useParams } from "react-router";
import "./Buttons.css";

export default function UpdateMovie() {
    const { id } = useParams();
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

    
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`${baseUrl}/films/${id}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch movie data");
                }
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setReleaseYear(data.releaseYear);
                setLength(data.length);
                setRating(data.rating);
                setLanguage(data.language.id);
                setCast(data.actors.map((actor: any) => String(actor.actorId)));
                setCategories(data.categories.map((category: any) => String(category.categoryId))); 
                setStreams(data.streams.map((stream: any) => String(stream.serviceId))); 
            } catch (error: any) {
                alert(`Error: ${error.message}`);
            }
        };
        fetchMovie();
    }, [id]);

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

        const parsedActors = cast.length === 0 || (cast.length === 1 && cast[0] === "")? []:
            cast.map(id => Number(id.trim()));
            if (parsedActors.some(isNaN)) {
                alert("One or more Actor-IDs are not valid numbers.");
                return;
            }

        const parsedCategories = categories.length===0 || (categories.length === 1 && categories[0] === "")? []:
            categories.map(id => Number(id.trim()));
            if (parsedCategories.some(isNaN)){
                alert("One or more Category-IDs are not valid numbers.");
                return;
            }

        const parsedStreams = streams.length===0 || (streams.length === 1 && streams[0] === "")? []:
            streams.map(id => Number(id.trim()));
            if (parsedStreams.some(isNaN)){
                alert("One or more Stream-IDs are not valid numbers.");
                return;
            }

        try {
            console.log(parsedActors);
            
            console.log("cast: ", cast  );
            const requestBody: any = { title, language: { id: language }, cast: parsedActors, categories: parsedCategories, streams: parsedStreams};

            if (description.trim() !== "") requestBody.description = description;
            if (releaseYear.trim() !== "") requestBody.releaseYear = releaseYear;
            if (length) requestBody.length = length;
            if (rating.trim() !== "") requestBody.rating = rating;

            const response = await fetch(`${baseUrl}/films/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create Film. Language/Actor/Category/Stream ID/s may be invalid.");
            }

            alert("Movie updated successfully!");
            navigate(`/films/${id}`);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this update? You will lose all changes.")) return;
        navigate(`/films/${id}`);
    };

    return (
        <div>
            <h1>UPDATE MOVIE</h1>
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
                        <option value="">Select a rating (Default: G)</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
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
                    <label>Cast (Actor-Ids, comma-separated):</label>
                    <input
                        type="text"
                        value={cast.join(",")}
                        onChange={(e) => setCast(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>
                <div>
                    <label>Categories (Category-IDs, comma-separated):</label>
                    <input
                    className= "categoriesInput"
                        type="text"
                        value={categories.join(",")}
                        onChange={(e) => setCategories(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>
                <div>
                    <label>Streams (Stream-IDs, comma-separated):</label>
                    <input
                    className= "streamsInput"
                        type="text"
                        value={streams.join(",")}
                        onChange={(e) => setStreams(e.target.value.split(",").map(id => id.trim()))}
                    />
                </div>

                <button type="submit" className= "saveButton">SAVE</button>
                <button type="button" className= "cancelButton" onClick={cancel}>CANCEL</button>
            </form>
        </div>
    );
}
