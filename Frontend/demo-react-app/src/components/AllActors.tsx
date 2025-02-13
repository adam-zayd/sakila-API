
import {useState, useEffect} from "react";
import {Actor} from "./PartialActorCard";
import { Link } from "react-router";
import "./AllDisplay.css";

export default function AllActors(){
    const [actors, setActors]= useState<Actor[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/actors")
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    return (
        <div>
            <h1 className="pageTitle">All Actors</h1>
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