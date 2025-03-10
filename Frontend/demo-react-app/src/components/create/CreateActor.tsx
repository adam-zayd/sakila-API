import { useState } from "react";
import { baseUrl } from "../../../config";
import { useNavigate } from "react-router";
import "../Buttons.css";
import "../Input.css";

export default function CreateActor() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [filmIds, setFilmIds] = useState<string[]>([]);
    const navigate = useNavigate();

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
            const response = await fetch(`${baseUrl}/actors`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    films: parsedFilms
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create actor. Film ID/s may be invalid.");
            }

            alert("Actor created successfully!");
            navigate("/actors");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this create? You will lose all changes.")) return;
        navigate("/actors");
    };

    return (
        <div className="container">
            <h1 className="pageTitle">CREATE ACTOR</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        className= "firstNameInput"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                    className= "lastNameInput"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
