import { useState, useEffect } from "react";
import { baseUrl } from "../../config";
import { useNavigate, useParams } from "react-router";

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
                console.log(data.films);
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

        const parsedFilms = filmIds.map(id => Number(id.trim()));

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
                throw new Error(errorData.message || "Failed to update actor. Film ID/s may be invalid.");
            }

            alert("Actor updated successfully!");
            navigate(`/actors/${id}`);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const resetFilms = () => {
        setFilmIds([]);
    };

    return (
        <div>
            <h1>UPDATE ACTOR</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                <button type="submit">Update Actor</button>
                <button type="button" onClick={resetFilms}>Reset Films</button>
            </form>
        </div>
    );
}
