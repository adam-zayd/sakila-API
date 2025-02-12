
import {useState, useEffect} from "react";
import {Actor} from "./PartialActorCard";


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
                    </li>
                ))}
            </ul>
        </div>
    );
}