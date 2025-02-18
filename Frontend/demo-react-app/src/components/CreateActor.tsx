import { useState } from "react";
import { baseUrl } from "../../config";
import { useNavigate } from "react-router";

export default function CreateActor() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [filmIds, setFilmIds] = useState<number[]>([]);
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

        const filmIdArray = filmIds.filter(id => !isNaN(id));

        try {
            const response = await fetch(`${baseUrl}/actors`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    films: filmIdArray
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create actor");
            }

            alert("Actor created successfully!");
            navigate("/actors");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>CREATE ACTOR</h1>
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
                        value={filmIds.join(", ")} 
                        onChange={(e) => setFilmIds(e.target.value.split(",").map(id => Number(id.trim())))}  
                    />
                </div>
                <button type="submit">Create Actor</button>
            </form>
        </div>
    );
}
