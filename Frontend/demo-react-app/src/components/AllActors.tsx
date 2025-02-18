
import {useState, useEffect} from "react";
import {Actor} from "./PartialActorCard";
import { Link } from "react-router";
import "./AllDisplay.css";
import { baseUrl } from "../../config";
import { Movie } from "./PartialMovieCard";

export default function AllActors(){
    const [actors, setActors]= useState<Actor[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [films, setFilms] = useState<Movie[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${baseUrl}/actors`)
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    const handleCreateActor = (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        const newActor = { firstName, lastName, films };

        fetch(`${baseUrl}/actors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newActor),
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Validation failed");
            }
            return response.json();
        })
        .then(data => {
            setActors(prevActors => [...prevActors, data]);
            setFirstName("");
            setLastName("");
            setFilms([]); // Clear input fields after submission
        })
        .catch(error => {
            setError(error.message);
        });
    };


    return (
        <div>
            <h1 className="pageTitle">All Actors</h1>

            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleCreateActor} className="actorForm">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    required
                />
                <input
                    type="text"
                    value={films.join(",")}
                    onChange={(e) => setFilms(e.target.value.split(",").map(id => ({ id: parseInt(id), title: "", categories: [], streams: [] })))}
                    placeholder="Enter film IDs (comma-separated)"
                    required
                />
                <button type="submit">Add Actor</button>
            </form>

            <article className= "allActors">
                {actors.map(actor => (<li className="individuals" key= {actor.id}>
                        <h3>
                            <Link className="name" to={`/actors/${actor.id}`}>{actor.fullName}</Link>
                        </h3>
                    </li>
                ))}
            </article>
        </div>
    );
}