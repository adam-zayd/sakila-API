import {useState, useEffect} from "react";
import { useParams } from "react-router";
import {Actor} from "./ActorCard";

export default function SpecificActor(){
    const {id} = useParams();
    const [actor, setActor] = useState<Actor|null> (null);
    const [error, setError] = useState<Error|null> (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/actors/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(`ERROR: ${response.status}`);
        })
        .then(setActor)
        .catch(setError)
        .finally(() => setLoading(false));
}, [id]);

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error.message}</h1>
    }

    if(!actor){
        return <h1>Actor failed to load</h1>
    }
    
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