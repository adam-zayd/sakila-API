import { useState, useEffect } from "react";
import { baseUrl } from "../../../config";
import { useNavigate, useParams } from "react-router";
import "../Buttons.css";
import "../SpecificDisplay.css";

export default function UpdateActor() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [filmIds, setFilmIds] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const response = await fetch(`${baseUrl}/actors/${id}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch actor data");
                }
                const data = await response.json();
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setFilmIds(data.films.map((film: any) => String(film.filmId)));
            } catch (error: any) {
                alert(`Error: ${error.message}`);
            }
        };
        fetchActor();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (firstName.trim().length === 0 || lastName.trim().length === 0) {
            alert("First and last name cannot be empty.");
            return;
        }
        if (firstName.length > 45 || lastName.length > 45) {
            alert("First and last name must be between 1 and 45 characters.");
            return;
        }

        const parsedFilms = filmIds.length === 0 || (filmIds.length === 1 && filmIds[0] === "")? []:
        filmIds.map(id => Number(id.trim()));
        if (parsedFilms.some(isNaN)) {
            alert("One or more Film IDs are not valid numbers.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/actors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    films: parsedFilms
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update actor. Film ID/s may be invalid. Be sure not to have a comma at the end of your input.");
            }

            alert("Actor updated successfully!");
            navigate(`/actors/${id}`);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this update? You will lose all changes.")) return;
        navigate(`/actors/${id}`);
    };

    return (
        <div className="container">
            <h1 className="pageTitle">UPDATE ACTOR</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        className="nameInput"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        className="lastNameInput"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Film IDs (comma-separated):</label>
                    <input
                        className="filmIdsInput"
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
