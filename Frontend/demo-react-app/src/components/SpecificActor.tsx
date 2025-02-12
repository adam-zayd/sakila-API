
import {useState, useEffect} from "react";
import {Actor} from "./ActorCard";


export default function SpecificActor(){
    const [actor, setActor]= useState<Actor|null>(null);

    useEffect(() => {
        const id: number = 1;
        fetch(`http://localhost:8080/actors/${id}`)
        .then(response => {
            if (response.ok){
            return response.json();
            }
            throw new Error("Actor not found");
        })
        .then(data => setActor(data))
        .catch(_error => setActor(null));
}, []);

    return(
        <div>
            {actor?(
                <ul>
                    <h3>{actor.fullName}</h3>
                    <p>Films cast in: {actor.films.length>0? actor.films.map(film => <li key={film.title}>{film.title}</li>) : "Unknown"}</p>
                </ul>
            ) : (
                <p>ACTOR NOT FOUND</p>
            )}
        </div>
    );
}