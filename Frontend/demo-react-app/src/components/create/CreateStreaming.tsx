import { useState } from "react";
import { baseUrl } from "../../../config";
import { useNavigate } from "react-router";
import "../Buttons.css";

export default function CreateStream() {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [cost, setCost] = useState("");
    const [filmIds, setFilmIds] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (website.length > 255) {
            alert("Website must be between 1 and 255 characters.");
            return;
        }

        if (name.length > 45) {
            alert("Name must be between 1 and 45 characters.");
            return;
        }

        if (cost && !/^\d{1,3}(\.\d{1,2})?$/.test(cost.trim())) {
            alert("Cost can only have up to 3 digits before and up to 2 digits after the decimal.");
            return;
        }

        const parsedFilms = filmIds.map(id => Number(id.trim()));

        if (parsedFilms.some(isNaN)) {
            alert("One or more Film IDs are not valid numbers.");
            return;
        }


        try {

            const requestBody: any = {
                name,
                website,
                films: parsedFilms
            };
    
            if (cost.trim() !== "") {
                requestBody.cost = cost.trim();
            }


            const response = await fetch(`${baseUrl}/streams`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create streaming platform. Film ID/s may be invalid.");
            }

            alert("Stream created successfully!");
            navigate("/streams");
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    const cancel = () => {
        if (!window.confirm("Are you sure you want to cancel this create? You will lose all changes.")) return;
        navigate("/streams");
    };

    return (
        <div className="container">
            <h1 className="pageTitle">CREATE STREAMING PLATFORM</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        className= "streamNameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Website:</label>
                    <input
                    className= "websiteInput"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cost:</label>
                    <input
                        className="costInput"
                        type="text"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <small>Format: up to 3 digits, up to 2 decimal places (e.g., 123.45)</small>
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
