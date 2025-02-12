
import {useState, useEffect} from "react";
import {Actor} from "./ActorCard";


export default function AllActors(){
    const [actors, setActors]= useState<Actor[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/actors")
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    return (
        <div>
            <h3>All Actors</h3>
            <ul>
                {actors.map(actor => (<li key= {actor.id}>
                        <h2>{actor.fullName}</h2>
                        <ul>Films cast in: {actor.films.length>0? actor.films.map(film => <li>{film.title}</li>) : "Unknown"}</ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}